from datetime import datetime, timedelta
from pathlib import Path
import pandas as pd

from app.api.v1.endpoints.predictions import run_prediction

BASE_DIR = Path(__file__).resolve().parents[3]
DATA_PATH = BASE_DIR / "dataset" / "all_zones_complete.csv"

if not DATA_PATH.is_file():
    CONTAINER_PATH = Path("/dataset/all_zones_complete.csv")
    if CONTAINER_PATH.is_file():
        DATA_PATH = CONTAINER_PATH
    else:
        raise FileNotFoundError(f"Kunde inte hitta datasetet på sökvägen: {DATA_PATH}")

_df = pd.read_csv(DATA_PATH)
_df["timestamp"] = pd.to_datetime(_df["timestamp"])
_df = _df.sort_values("timestamp").reset_index(drop=True)

EUR_TO_SEK = 11.40


def get_features_for_zone(zone_code: str, dt: datetime | None = None) -> dict:
    zone = zone_code.lower()
    now = dt or datetime.now()

    latest = _df.iloc[-1]
    current_spot = float(latest[f"price_{zone}_eur_mwh"])
    temp = float(latest[f"temp_{zone}_c"])
    wind = float(latest[f"wind_{zone}_kmh"])
    rain = float(latest[f"rain_{zone}_mm"])

    lag_24 = (
        float(_df.iloc[-25][f"price_{zone}_eur_mwh"])
        if len(_df) >= 25
        else current_spot
    )
    lag_48 = float(_df.iloc[-49][f"price_{zone}_eur_mwh"]) if len(_df) >= 49 else lag_24
    lag_168 = (
        float(_df.iloc[-169][f"price_{zone}_eur_mwh"]) if len(_df) >= 169 else lag_48
    )

    return {
        "zone": zone_code.upper(),
        "temperature_c": temp,
        "wind_speed_kmh": wind,
        "rain_mm": rain,
        "hour": now.hour,
        "day_of_week": now.weekday(),
        "month": now.month,
        "is_weekend": 1 if now.weekday() >= 5 else 0,
        "price_lag_24": lag_24,
        "price_lag_48": lag_48,
        "price_lag_168": lag_168,
        "spot_price_eur_mwh": current_spot,
    }


def get_day_forecast_24h(zone_code: str, target_dt: datetime | None = None) -> dict:
    zone = zone_code.lower()
    now = target_dt or datetime.now()
    current_hour = now.hour

    latest = _df.iloc[-1]
    base_spot = float(latest[f"price_{zone}_eur_mwh"])
    temp = float(latest[f"temp_{zone}_c"])
    wind = float(latest[f"wind_{zone}_kmh"])
    rain = float(latest[f"rain_{zone}_mm"])

    hist_day = _df.tail(24).reset_index(drop=True)
    points = []

    for h in range(24):
        slot_str = f"{h:02d}:00"

        # A. Timmarna som redan passerat idag (historik)
        if h < current_hour:
            hist_row = hist_day[
                pd.to_datetime(hist_day["timestamp_local"]).dt.hour == h
            ]
            eur_mwh = (
                float(hist_row.iloc[0][f"price_{zone}_eur_mwh"])
                if not hist_row.empty
                else base_spot
            )
            is_history = True
            is_current = False
            optimal = False

        # B. Nuvarande och kommande timmar idag (ML-prognos)
        else:
            feat = {
                "zone": zone_code.upper(),
                "temperature_c": temp,
                "wind_speed_kmh": wind,
                "rain_mm": rain,
                "hour": h,
                "day_of_week": now.weekday(),
                "month": now.month,
                "is_weekend": 1 if now.weekday() >= 5 else 0,
                "price_lag_24": base_spot,
                "price_lag_48": base_spot,
                "price_lag_168": base_spot,
                "spot_price_eur_mwh": base_spot,
            }
            pred = run_prediction(feat)
            eur_mwh = pred["predicted_price_eur_mwh"]
            # Hämtar resultatet direkt från er tränade optimal_hour-modell
            optimal = pred["is_optimal_hour"]
            is_history = False
            is_current = h == current_hour

        ore_kwh = round((eur_mwh * EUR_TO_SEK) / 10, 1)

        points.append(
            {
                "timestamp": slot_str,
                "predictedPrice": ore_kwh,
                "isHistorical": is_history,
                "isCurrentHour": is_current,
                "isOptimal": optimal,
            }
        )

    lowest_entry = min(points, key=lambda p: p["predictedPrice"])
    current_entry = next((p for p in points if p["isCurrentHour"]), points[0])

    # True om ML-klassificeraren säger optimal just nu, ELLER om nuvarande timme är dagens lägsta pris
    is_now_optimal = current_entry["isOptimal"] or (
        current_entry["timestamp"] == lowest_entry["timestamp"]
    )

    return {
        "unit": "öre/kWh",
        "current_price": current_entry["predictedPrice"],
        "is_now_optimal": is_now_optimal,
        "lowest_price": lowest_entry["predictedPrice"],
        "lowest_price_time": lowest_entry["timestamp"],
        "predictions": points,
    }
