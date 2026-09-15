import warnings

# Tysta den specifika joblib/parallel-varningen från scikit-learn
warnings.filterwarnings(
    "ignore",
    message=".*`sklearn.utils.parallel.delayed` should be used.*",
    category=UserWarning,
)

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


def get_dynamic_forecast(zone_code: str, target_dt: datetime | None = None) -> dict:
    zone = zone_code.lower()
    now = target_dt or datetime.now()

    # 1. Starta från 00:00 idag för att behålla dagens historik
    start_dt = now.replace(hour=0, minute=0, second=0, microsecond=0)

    # 2. Avgör hur långt fram vi kan/bör sträcka oss:
    # Om klockan är 13:00 eller senare sträcker vi oss till 23:00 imorgon (+1 dygn)
    if now.hour >= 13:
        end_dt = (start_dt + timedelta(days=1)).replace(hour=23)
    else:
        end_dt = start_dt.replace(hour=23)

    total_hours = (
        int((end_dt - start_dt).total_seconds() // 3600) + 1
    )  # 24 eller 48 timmar

    latest = _df.iloc[-1]
    base_spot = float(latest[f"price_{zone}_eur_mwh"])
    temp = float(latest[f"temp_{zone}_c"])
    wind = float(latest[f"wind_{zone}_kmh"])
    rain = float(latest[f"rain_{zone}_mm"])

    points = []

    for offset in range(total_hours):
        slot_dt = start_dt + timedelta(hours=offset)
        slot_hour = slot_dt.hour

        # Formatera datum/tid så frontend kan skilja på dagarna (t.ex. "Idag 14:00" eller "Imorgon 03:00")
        is_tomorrow = slot_dt.date() > now.date()
        day_prefix = "Imorgon " if is_tomorrow else ""
        time_label = f"{day_prefix}{slot_hour:02d}:00"

        # Historik gäller enbart timmar som redan passerat idag
        if slot_dt < now.replace(minute=0, second=0, microsecond=0):
            eur_mwh = base_spot  # Slå upp ur historik-dataframe
            is_history = True
            is_current = False
            optimal = False
        else:
            feat = {
                "zone": zone_code.upper(),
                "temperature_c": temp,
                "wind_speed_kmh": wind,
                "rain_mm": rain,
                "hour": slot_hour,
                "day_of_week": slot_dt.weekday(),
                "month": slot_dt.month,
                "is_weekend": 1 if slot_dt.weekday() >= 5 else 0,
                "price_lag_24": base_spot,
                "price_lag_48": base_spot,
                "price_lag_168": base_spot,
                "spot_price_eur_mwh": base_spot,
            }
            pred = run_prediction(feat)
            eur_mwh = pred["predicted_price_eur_mwh"]
            optimal = pred["is_optimal_hour"]
            is_history = False
            is_current = slot_dt.date() == now.date() and slot_hour == now.hour

        points.append(
            {
                "timestamp": time_label,
                "raw_timestamp": slot_dt.isoformat(),
                "predictedPrice": round((eur_mwh * EUR_TO_SEK) / 10, 1),
                "isHistorical": is_history,
                "isCurrentHour": is_current,
                "isOptimal": optimal,
                "day": "tomorrow" if is_tomorrow else "today",
            }
        )

    # Lägsta framtida pris för rekommendationen (man vill inte rekommendera en timme som redan passerat)
    future_points = [p for p in points if not p["isHistorical"]]
    lowest_future = (
        min(future_points, key=lambda p: p["predictedPrice"])
        if future_points
        else points[0]
    )
    current_entry = next((p for p in points if p["isCurrentHour"]), points[0])

    return {
        "unit": "öre/kWh",
        "has_tomorrow_data": now.hour >= 13,
        "current_price": current_entry["predictedPrice"],
        "is_now_optimal": current_entry["isOptimal"],
        "lowest_future_price": lowest_future["predictedPrice"],
        "lowest_future_time": lowest_future["timestamp"],
        "predictions": points,
    }
