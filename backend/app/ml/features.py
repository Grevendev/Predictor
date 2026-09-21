from datetime import datetime, timezone
import pandas as pd 
from pathlib import Path

# 1. Kolla relativt (lokalt utanför Docker)
BASE_DIR = Path(__file__).resolve().parents[3]
DATA_PATH = BASE_DIR / "dataset" / "all_zones_complete.csv"

# 2. Om inte relativ hittas, kolla i containerns sökvägar
if not DATA_PATH.is_file():
    for candidate in [
        Path("/app/dataset/all_zones_complete.csv"),
        Path("/dataset/all_zones_complete.csv"),
    ]:
        if candidate.is_file():
            DATA_PATH = candidate
            break
    else:
        raise FileNotFoundError(
            f"Kunde inte hitta datasetet. Kontrollera volymmount i docker-compose."
        )

_df = pd.read_csv(DATA_PATH)
_df["timestamp"] = pd.to_datetime(_df["timestamp"])
_df = _df.sort_values("timestamp").reset_index(drop=True)

def get_features_for_zone(zone_code: str, dt: datetime | None = None) -> dict:
    zone = zone_code.lower()
    now = dt or datetime.now(timezone.utc)

    # Tids-features
    hour = now.hour
    day_of_week = now.weekday()
    month = now.month
    is_weekend = 1 if day_of_week >= 5 else 0

    # Senaste kända raden för priser och väder i zonen
    latest = _df.iloc[-1]
    current_spot = float(latest[f"price_{zone}_eur_mwh"])
    temp = float(latest[f"temp_{zone}_c"])
    wind = float(latest[f"wind_{zone}_kmh"])
    rain = float(latest[f"rain_{zone}_mm"])

    # Historiska lags (24h, 48h, 168h bakåt)
    lag_24 = float(_df.iloc[-25][f"price_{zone}_eur_mwh"]) if len(_df) >= 25 else current_spot
    lag_48 = float(_df.iloc[-49][f"price_{zone}_eur_mwh"]) if len(_df) >= 49 else lag_24
    lag_168 = float(_df.iloc[-169][f"price_{zone}_eur_mwh"]) if len(_df) >= 169 else lag_48

    return {
        "zone": zone_code.upper(),
        "temperature_c": temp,
        "wind_speed_kmh": wind,
        "rain_mm": rain,
        "hour": hour,
        "day_of_week": day_of_week,
        "month":month,
        "is_weekend": is_weekend,
        "price_lag_24": lag_24,
        "price_lag_48": lag_48,
        "price_lag_168": lag_168,
        "spot_price_eur_mwh": current_spot
    }


def get_dynamic_forecast(zone_code: str) -> dict:
    """
    Återskapad funktion som bygger 48h data (historik + prognos)
    för att frontend-grafen och hero-kortet ska fungera.
    """
    zone = zone_code.lower()
    price_col = f"price_{zone}_eur_mwh"

    # Om kolumnen inte finns (t.ex. fel zon), gör en fallback
    if price_col not in _df.columns:
        raise ValueError(f"Prisdata för {zone_code} saknas i datasetet.")

    # Hämta de sista 48 timmarna från datasetet
    recent_data = _df.tail(48).copy()

    predictions = []
    current_price = 0.0
    lowest_price = 9999.0
    lowest_time = ""

    # Vi säger att första halvan (24h) är historik, och andra halvan (24h) är framtid/prognos
    mid_point = len(recent_data) // 2

    for i, (_, row) in enumerate(recent_data.iterrows()):
        ts = pd.to_datetime(row["timestamp"])
        price = float(row[price_col])

        is_historical = i < mid_point
        is_current = i == mid_point

        if is_current:
            current_price = price

        # Hitta lägsta framtida priset
        if not is_historical and price < lowest_price:
            lowest_price = price
            lowest_time = ts.strftime("%H:%M")

        predictions.append(
            {
                "timestamp": ts.strftime("%H:00"),
                "raw_timestamp": ts.isoformat(),
                "predictedPrice": price,
                "isHistorical": is_historical,
                "isCurrentHour": is_current,
                "isOptimal": False,  # Sätts strax
                "day": "tomorrow" if i > mid_point + 12 else "today",
            }
        )

    # Markera den absolut billigaste timmen i framtiden som "isOptimal = True"
    for p in predictions:
        if not p["isHistorical"] and p["predictedPrice"] == lowest_price:
            p["isOptimal"] = True

    is_now_optimal = current_price == lowest_price

    return {
        "unit": "EUR/MWh",
        "has_tomorrow_data": True,
        "current_price": current_price,
        "is_now_optimal": is_now_optimal,
        "lowest_future_price": (
            lowest_price if lowest_price != 9999.0 else current_price
        ),
        "lowest_future_time": lowest_time if lowest_time else "00:00",
        "predictions": predictions,
    }
