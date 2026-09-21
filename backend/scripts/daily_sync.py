import os
import sys
from datetime import date, timedelta
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
# Kontrollera om /app/dataset finns (Docker) annars lokalt
if Path("/app/dataset").exists():
    DATASET_DIR = Path("/app/dataset")
else:
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
# 3. Hämtning och Staging (med 1h-aggregering)
# -----------------------------------------------------------------------------
def fetch_and_stage_data(start_date: str, end_date: str) -> pd.DataFrame:
    """Fetch prices and weather, aggregate to 1h, and save staging files."""

    print(f"\n--- Påbörjar hämtning: {start_date} till {end_date} ---")

    start_ts = pd.Timestamp(start_date, tz="UTC")
    end_ts = pd.Timestamp(end_date, tz="UTC") + pd.Timedelta(days=1)

    # -------------------------------------------------------------------------
    # 1. Fetch electricity prices from ENTSO-E
    # -------------------------------------------------------------------------

    print("Hämtar elpriser från ENTSO-E...")

    price_dfs = []

    for zone_name, zone_code in ZONES.items():
        s = entsoe_client.query_day_ahead_prices(
            zone_code,
            start=start_ts,
            end=end_ts,
        )

        df_z = s.reset_index()
        df_z.columns = [
            "timestamp",
            f"price_{zone_name.lower()}_eur_mwh",
        ]

        df_z["timestamp"] = pd.to_datetime(
            df_z["timestamp"]
        ).dt.tz_convert("UTC")

        # Aggregate 15-minute prices to hourly prices.
        df_z = (
            df_z
            .set_index("timestamp")
            .resample("1h")
            .mean(numeric_only=True)
            .reset_index()
        )

        price_dfs.append(df_z)

    df_prices = price_dfs[0]

    for d in price_dfs[1:]:
        df_prices = pd.merge(
            df_prices,
            d,
            on="timestamp",
            how="outer",
        )

    price_file = (
        PREV_DATASET_DIR
        / f"raw_prices_{start_date}_to_{end_date}.csv"
    )

    df_prices.to_csv(
        price_file,
        index=False,
    )

    # -------------------------------------------------------------------------
    # 2. Fetch weather from Open-Meteo
    # -------------------------------------------------------------------------

    print("Hämtar väderdata från Open-Meteo...")

    today = date.today()

    requested_start = date.fromisoformat(start_date)
    requested_end = date.fromisoformat(end_date)

    # Split the requested period into historical and forecast periods.
    #
    # Historical data:
    #   before today -> Archive API
    #
    # Current/future data:
    #   today and later -> Forecast API

    weather_periods = []

    if requested_start < today:
        historical_end = min(
            requested_end,
            today - timedelta(days=1),
        )

        weather_periods.append(
            (
                requested_start,
                historical_end,
                "https://archive-api.open-meteo.com/v1/archive",
            )
        )

    if requested_end >= today:
        forecast_start = max(
            requested_start,
            today,
        )

        weather_periods.append(
            (
                forecast_start,
                requested_end,
                "https://api.open-meteo.com/v1/forecast",
            )
        )

    weather_period_dfs = []

    for period_start, period_end, weather_api_url in weather_periods:
        print(
            f"Hämtar väder: {period_start} -> {period_end}"
        )

        zone_dfs = []

        for zone, (lat, lon) in COORDINATES.items():
            params = {
                "latitude": lat,
                "longitude": lon,
                "start_date": period_start.isoformat(),
                "end_date": period_end.isoformat(),
                "hourly": [
                    "temperature_2m",
                    "wind_speed_10m",
                    "precipitation",
                ],
            }

            res = om_client.weather_api(
                weather_api_url,
                params=params,
            )[0]

            hourly = res.Hourly()

            df_w_zone = pd.DataFrame(
                {
                    "timestamp": pd.date_range(
                        start=pd.to_datetime(
                            hourly.Time(),
                            unit="s",
                            utc=True,
                        ),
                        end=pd.to_datetime(
                            hourly.TimeEnd(),
                            unit="s",
                            utc=True,
                        ),
                        freq=pd.Timedelta(
                            seconds=hourly.Interval()
                        ),
                        inclusive="left",
                    ),
                    f"temp_{zone}_c": (
                        hourly
                        .Variables(0)
                        .ValuesAsNumpy()
                    ),
                    f"wind_{zone}_kmh": (
                        hourly
                        .Variables(1)
                        .ValuesAsNumpy()
                    ),
                    f"rain_{zone}_mm": (
                        hourly
                        .Variables(2)
                        .ValuesAsNumpy()
                    ),
                }
            )

            zone_dfs.append(df_w_zone)

        # Merge the four zones horizontally for this period.
        df_period_weather = zone_dfs[0]

        for zone_df in zone_dfs[1:]:
            df_period_weather = pd.merge(
                df_period_weather,
                zone_df,
                on="timestamp",
                how="outer",
            )

        weather_period_dfs.append(df_period_weather)

    if not weather_period_dfs:
        raise ValueError(
            "Ingen väderperiod kunde identifieras."
        )

    # Combine historical and forecast periods vertically.
    # They represent different time ranges and should not be merged
    # horizontally.
    df_weather = pd.concat(
        weather_period_dfs,
        ignore_index=True,
    )

    df_weather = (
        df_weather
        .drop_duplicates(subset=["timestamp"])
        .sort_values("timestamp")
        .reset_index(drop=True)
    )

    weather_file = (
        PREV_DATASET_DIR
        / f"raw_weather_{start_date}_to_{end_date}.csv"
    )

    df_weather.to_csv(
        weather_file,
        index=False,
    )

    # -------------------------------------------------------------------------
    # 3. Merge electricity prices and weather
    # -------------------------------------------------------------------------

    df_merged_wide = pd.merge(
        df_prices,
        df_weather,
        on="timestamp",
        how="inner",
    )

    staged_wide_file = (
        PREV_DATASET_DIR
        / f"staged_wide_{start_date}_to_{end_date}.csv"
    )

    df_merged_wide.to_csv(
        staged_wide_file,
        index=False,
    )

    print(
        f"Staging klar: {len(df_merged_wide)} timmar "
        f"sparade till {staged_wide_file.name}"
    )

    return df_merged_wide


# -----------------------------------------------------------------------------
# 4. Master-uppdatering med Feature Enrichment & NaN-skydd
# -----------------------------------------------------------------------------
def append_to_master_dataset(
    df_new_wide: pd.DataFrame,
    master_path: Path = MASTER_DATASET_PATH,
) -> pd.DataFrame:
    """Append new wide data to the master dataset using a fixed schema."""

    expected_measure_columns = [
        "temp_se1_c",
        "wind_se1_kmh",
        "rain_se1_mm",
        "temp_se2_c",
        "wind_se2_kmh",
        "rain_se2_mm",
        "temp_se3_c",
        "wind_se3_kmh",
        "rain_se3_mm",
        "temp_se4_c",
        "wind_se4_kmh",
        "rain_se4_mm",
        "price_se1_eur_mwh",
        "price_se2_eur_mwh",
        "price_se3_eur_mwh",
        "price_se4_eur_mwh",
    ]

    expected_columns = [
        "timestamp",
        *expected_measure_columns,
        "timestamp_local",
        "hour",
        "day_of_week",
        "month",
        "is_weekend",
    ]

    df_new_wide = df_new_wide.copy()

    # -------------------------------------------------------------------------
    # Validate incoming staging data
    # -------------------------------------------------------------------------

    missing_new_columns = [
        column
        for column in expected_measure_columns
        if column not in df_new_wide.columns
    ]

    if missing_new_columns:
        raise ValueError(
            "Stagingdata saknar följande kolumner: "
            + ", ".join(missing_new_columns)
        )

    unexpected_new_columns = [
        column
        for column in df_new_wide.columns
        if column.endswith("_x") or column.endswith("_y")
    ]

    if unexpected_new_columns:
        raise ValueError(
            "Stagingdata innehåller oväntade _x/_y-kolumner: "
            + ", ".join(unexpected_new_columns)
        )

    df_new_wide["timestamp"] = pd.to_datetime(
        df_new_wide["timestamp"],
        utc=True,
    )

    # Keep only the columns that belong to the master schema.
    df_new_wide = df_new_wide[
        [
            "timestamp",
            *expected_measure_columns,
        ]
    ].copy()

    # -------------------------------------------------------------------------
    # Load existing master dataset
    # -------------------------------------------------------------------------

    if master_path.exists():
        existing_df = pd.read_csv(master_path)

        existing_df["timestamp"] = pd.to_datetime(
            existing_df["timestamp"],
            utc=True,
        )

        missing_existing_columns = [
            column
            for column in expected_measure_columns
            if column not in existing_df.columns
        ]

        if missing_existing_columns:
            raise ValueError(
                "Masterdataset saknar följande kolumner: "
                + ", ".join(missing_existing_columns)
            )

        # Explicitly select the original measurement columns.
        #
        # This is important because older versions of the dataset contain
        # duplicated weather columns such as temp_se1_c_x and temp_se1_c_y.
        existing_df = existing_df[
            [
                "timestamp",
                *expected_measure_columns,
            ]
        ].copy()

        # Keep the old master rows and let the new staging data replace
        # timestamps that already exist.
        combined = pd.concat(
            [
                existing_df,
                df_new_wide,
            ],
            ignore_index=True,
        )

        combined = (
            combined
            .drop_duplicates(
                subset=["timestamp"],
                keep="last",
            )
            .sort_values("timestamp")
            .reset_index(drop=True)
        )

    else:
        combined = (
            df_new_wide
            .sort_values("timestamp")
            .reset_index(drop=True)
        )

    # -------------------------------------------------------------------------
    # Regenerate time features
    # -------------------------------------------------------------------------

    combined["timestamp_local"] = (
        combined["timestamp"]
        .dt.tz_convert("Europe/Stockholm")
        .dt.tz_localize(None)
    )

    combined["hour"] = combined["timestamp_local"].dt.hour
    combined["day_of_week"] = combined["timestamp_local"].dt.dayofweek
    combined["month"] = combined["timestamp_local"].dt.month
    combined["is_weekend"] = (
        combined["day_of_week"] >= 5
    ).astype(int)

    # -------------------------------------------------------------------------
    # Final schema validation
    # -------------------------------------------------------------------------

    combined = combined[expected_columns]

    if combined.columns.tolist() != expected_columns:
        raise ValueError(
            "Masterdatasetet har fel kolumnschema."
        )

    duplicate_timestamps = combined["timestamp"].duplicated().sum()

    if duplicate_timestamps > 0:
        raise ValueError(
            f"Masterdatasetet innehåller {duplicate_timestamps} "
            "duplicerade timestamps."
        )

    if combined["timestamp"].isna().any():
        raise ValueError(
            "Masterdatasetet innehåller NaN i timestamp."
        )

    # -------------------------------------------------------------------------
    # Save
    # -------------------------------------------------------------------------

    combined.to_csv(
        master_path,
        index=False,
    )

    print(
        f"Master-dataset sparat: {master_path} "
        f"({len(combined)} rader, {len(combined.columns)} kolumner)"
    )

    return combined
