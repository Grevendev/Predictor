import os
import sys
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv
from entsoe import EntsoePandasClient
import openmeteo_requests
import pandas as pd
import requests_cache
from retry_requests import retry

# -----------------------------------------------------------------------------
# 1. Sökvägar och miljövariabler
# -----------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent  # backend/scripts
BACKEND_DIR = SCRIPT_DIR.parent  # backend
REPO_ROOT = BACKEND_DIR.parent  # Predictor

# Staging-mapp för rådata och mellanlandning
PREV_DATASET_DIR = BACKEND_DIR / "prev_dataset"
PREV_DATASET_DIR.mkdir(parents=True, exist_ok=True)

# Master-dataset (Predictor/dataset/all_zones_complete.csv)
DATASET_DIR = REPO_ROOT / "dataset"
DATASET_DIR.mkdir(parents=True, exist_ok=True)
MASTER_DATASET_PATH = DATASET_DIR / "all_zones_complete.csv"

# Dedikerad cache-katalog under scripts
CACHE_DIR = SCRIPT_DIR / ".cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(BACKEND_DIR / ".env")
API_KEY = os.getenv("ENTSOE_API_KEY", "").strip().strip('"').strip("'")

# -----------------------------------------------------------------------------
# 2. Gemensam Session för Caching och Retry
# -----------------------------------------------------------------------------
cache_session = requests_cache.CachedSession(
    str(CACHE_DIR / "api_cache"),
    backend="sqlite",
    expire_after=timedelta(days=30),
)
retry_session = retry(cache_session, retries=3, backoff_factor=0.3)

# Klienter
entsoe_client = EntsoePandasClient(api_key=API_KEY, session=retry_session)
om_client = openmeteo_requests.Client(session=retry_session)

# Konfiguration för zoner och koordinater
ZONES = {"SE1": "SE_1", "SE2": "SE_2", "SE3": "SE_3", "SE4": "SE_4"}
COORDINATES = {
    "se1": (65.58, 22.15),
    "se2": (63.18, 14.64),
    "se3": (59.33, 18.06),
    "se4": (55.60, 13.00),
}


# -----------------------------------------------------------------------------
# 3. Hämtning och Staging
# -----------------------------------------------------------------------------
def fetch_and_stage_data(start_date: str, end_date: str) -> pd.DataFrame:
    """
    Hämtar elpriser och väder för intervallet (YYYY-MM-DD),
    sparar råfilerna i backend/prev_dataset/ och returnerar en sammanslagen bred DataFrame.
    """
    print(f"\n--- Påbörjar hämtning: {start_date} till {end_date} ---")

    # Tidsstämplar för ENTSO-E (UTC)
    start_ts = pd.Timestamp(start_date, tz="UTC")
    end_ts = pd.Timestamp(end_date, tz="UTC") + pd.Timedelta(days=1)

    # 1. Hämta elpriser (ENTSO-E)
    print("Hämtar elpriser från ENTSO-E...")
    price_dfs = []
    for zone_name, zone_code in ZONES.items():
        s = entsoe_client.query_day_ahead_prices(zone_code, start=start_ts, end=end_ts)
        df_z = s.reset_index()
        df_z.columns = ["timestamp", f"price_{zone_name.lower()}_eur_mwh"]
        df_z["timestamp"] = pd.to_datetime(df_z["timestamp"]).dt.tz_convert("UTC")
        price_dfs.append(df_z)

    df_prices = price_dfs[0]
    for d in price_dfs[1:]:
        df_prices = pd.merge(df_prices, d, on="timestamp", how="outer")

    price_file = PREV_DATASET_DIR / f"raw_prices_{start_date}_to_{end_date}.csv"
    df_prices.to_csv(price_file, index=False)
    print(f"Sparade råpris-data till: {price_file.name}")

    # 2. Hämta väder (Open-Meteo)
    print("Hämtar väderdata från Open-Meteo...")
    weather_dfs = []
    for zone, (lat, lon) in COORDINATES.items():
        params = {
            "latitude": lat,
            "longitude": lon,
            "start_date": start_date,
            "end_date": end_date,
            "hourly": ["temperature_2m", "wind_speed_10m", "precipitation"],
        }
        res = om_client.weather_api(
            "https://archive-api.open-meteo.com/v1/archive", params=params
        )[0]
        hourly = res.Hourly()
        df_w_zone = pd.DataFrame(
            {
                "timestamp": pd.date_range(
                    start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
                    end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
                    freq=pd.Timedelta(seconds=hourly.Interval()),
                    inclusive="left",
                ),
                f"temp_{zone}_c": hourly.Variables(0).ValuesAsNumpy(),
                f"wind_{zone}_kmh": hourly.Variables(1).ValuesAsNumpy(),
                f"rain_{zone}_mm": hourly.Variables(2).ValuesAsNumpy(),
            }
        )
        weather_dfs.append(df_w_zone)

    df_weather = weather_dfs[0]
    for w in weather_dfs[1:]:
        df_weather = pd.merge(df_weather, w, on="timestamp", how="outer")

    weather_file = PREV_DATASET_DIR / f"raw_weather_{start_date}_to_{end_date}.csv"
    df_weather.to_csv(weather_file, index=False)
    print(f"Sparade råväder-data till: {weather_file.name}")

    # 3. Slå ihop och spara bred mellanlandningsfil
    df_merged_wide = pd.merge(df_prices, df_weather, on="timestamp", how="inner")
    staged_wide_file = PREV_DATASET_DIR / f"staged_wide_{start_date}_to_{end_date}.csv"
    df_merged_wide.to_csv(staged_wide_file, index=False)
    print(
        f"Sparade bred mellanlandning ({len(df_merged_wide)} timmar) till: {staged_wide_file.name}"
    )

    return df_merged_wide


# -----------------------------------------------------------------------------
# 4. Master-uppdatering (Merge & Deduplicate)
# -----------------------------------------------------------------------------
def append_to_master_dataset(
    df_new_wide: pd.DataFrame, master_path: Path = MASTER_DATASET_PATH
):
    """Slår ihop ny data med master-filen, tar bort dubbletter och sorterar kronologiskt."""
    df_new_wide["timestamp"] = pd.to_datetime(df_new_wide["timestamp"], utc=True)
    print(master_path, "dddddddddddddddddddddddddddddddddddddddddddddddd")
    if master_path.exists():
        existing_df = pd.read_csv(master_path)
        existing_df["timestamp"] = pd.to_datetime(existing_df["timestamp"], utc=True)

        combined = (
            pd.concat([existing_df, df_new_wide], ignore_index=True)
            .drop_duplicates(subset=["timestamp"], keep="last")
            .sort_values("timestamp")
            .reset_index(drop=True)
        )
    else:
        combined = df_new_wide.sort_values("timestamp").reset_index(drop=True)

    combined.to_csv(master_path, index=False)
    print(f"Master-dataset uppdaterat: {master_path} (Totalt {len(combined)} rader)")
    return combined
