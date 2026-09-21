# from fastapi import APIRouter
# from pydantic import BaseModel

# from app.ml.inference import (
#     predict_price,
#     predict_optimal_hour,
#     predict_cluster,
# )


# router = APIRouter()


# class PredictionRequest(BaseModel):
#     zone: str
#     temperature_c: float
#     wind_speed_kmh: float
#     rain_mm: float
#     hour: int
#     day_of_week: int
#     month: int
#     is_weekend: int
#     price_lag_24: float
#     price_lag_48: float
#     price_lag_168: float
#     spot_price_eur_mwh: float


# @router.get("/health")
# def prediction_health():
#     return {"status": "ok"}


# @router.post("/predict")
# def predict(request: PredictionRequest):
#     input_data = request.model_dump()

#     predicted_price = predict_price(input_data)
#     optimal_hour = predict_optimal_hour(input_data)
#     cluster = predict_cluster(input_data)

#     return {
#         "predicted_price_eur_mwh": predicted_price,
#         "is_optimal_hour": bool(optimal_hour),
#         "cluster": cluster,
#     }


from datetime import timedelta
from pathlib import Path
from typing import Any, Dict, Union
from zoneinfo import ZoneInfo

import pandas as pd
from fastapi import APIRouter, HTTPException, Query, Request, Response
from pydantic import BaseModel
from typing import Union, Dict, Any
from app.core.config import settings
from app.core.limiter import limiter
from app.ml.inference import (
    predict_cluster,
    predict_optimal_hour,
    predict_price,
)

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[5]
DATASET_PATH = BASE_DIR / "dataset" / "all_zones_complete.csv"
LOCAL_TIMEZONE = ZoneInfo("Europe/Stockholm")
CLUSTER_MAP = {
    0: "low",
    2: "medium",
    1: "high",
}


class PredictionRequest(BaseModel):
    zone: str
    temperature_c: float
    wind_speed_kmh: float
    rain_mm: float
    hour: int
    day_of_week: int
    month: int
    is_weekend: int
    price_lag_24: float
    price_lag_48: float
    price_lag_168: float
    spot_price_eur_mwh: float


# --- Fristående funktion som kan importeras överallt ---
def run_prediction(data: Union[PredictionRequest, Dict[str, Any]]) -> Dict[str, Any]:
    """
    Kör inferensen för pris, optimal timme och kluster.
    Tar emot antingen en Pydantic-modell eller en vanlig Python-dict.
    """
    if isinstance(data, BaseModel):
        input_data = data.model_dump()
    else:
        input_data = data

    predicted_price = predict_price(input_data)
    optimal_hour = predict_optimal_hour(input_data)
    cluster = predict_cluster(input_data)

    return {
        "predicted_price_eur_mwh": round(float(predicted_price), 2),
        "is_optimal_hour": bool(optimal_hour),
        "cluster": cluster,
    }


def _load_zone_dataset() -> pd.DataFrame:
    if not DATASET_PATH.is_file():
        raise HTTPException(
            status_code=404,
            detail="Forecast dataset not found.",
        )

    df = pd.read_csv(DATASET_PATH)
    df["timestamp"] = pd.to_datetime(df["timestamp"], utc=True)
    return df.sort_values("timestamp").reset_index(drop=True)


def _map_cluster_to_level(cluster_value: int) -> str:
    return CLUSTER_MAP.get(int(cluster_value), "medium")


def _resolve_forecast_dates(today: pd.Timestamp, days_count: int) -> list[pd.Timestamp]:
    return [today + pd.Timedelta(days=offset) for offset in range(days_count)]


def _get_daily_weather_summary(zone_code: str, target_day: pd.Timestamp, df: pd.DataFrame) -> dict[str, float]:
    zone = zone_code.lower()
    temp_col = f"temp_{zone}_c"
    wind_col = f"wind_{zone}_kmh"
    rain_col = f"rain_{zone}_mm"

    available_days = pd.DatetimeIndex(sorted(pd.unique(df["timestamp"].dt.normalize())))
    if available_days.empty:
        raise HTTPException(
            status_code=404,
            detail="No forecast data available for the selected zone.",
        )

    day_rows = df[df["timestamp"].dt.normalize() == target_day].copy()
    if day_rows.empty:
        nearest_day = min(
            available_days,
            key=lambda day: abs((day - target_day).total_seconds()),
        )
        day_rows = df[df["timestamp"].dt.normalize() == nearest_day].copy()

    return {
        "temperature_c": float(day_rows[temp_col].mean()),
        "wind_speed_kmh": float(day_rows[wind_col].mean()),
        "rain_mm": float(day_rows[rain_col].sum()),
    }


def _get_feature_row(zone_code: str, target_hour: pd.Timestamp, df: pd.DataFrame) -> dict[str, Any]:
    zone = zone_code.lower()
    price_col = f"price_{zone}_eur_mwh"
    temp_col = f"temp_{zone}_c"
    wind_col = f"wind_{zone}_kmh"
    rain_col = f"rain_{zone}_mm"

    forecast_hour = pd.Timestamp(target_hour)
    if forecast_hour.tzinfo is None:
        forecast_hour = forecast_hour.tz_localize("UTC")
    history = df[df["timestamp"] <= forecast_hour].copy()

    if history.empty:
        raise HTTPException(
            status_code=404,
            detail="Not enough historical price data for the selected zone.",
        )

    lag_24 = history[history["timestamp"] <= forecast_hour - pd.Timedelta(hours=24)]
    lag_48 = history[history["timestamp"] <= forecast_hour - pd.Timedelta(hours=48)]
    lag_168 = history[history["timestamp"] <= forecast_hour - pd.Timedelta(days=7)]

    def last_price(window: pd.DataFrame) -> float:
        if window.empty:
            return float(history.iloc[-1][price_col])
        return float(window.iloc[-1][price_col])

    last_row = history.iloc[-1]
    current_weather = {
        "temperature_c": float(last_row[temp_col]),
        "wind_speed_kmh": float(last_row[wind_col]),
        "rain_mm": float(last_row[rain_col]),
    }

    return {
        "zone": zone_code.upper(),
        "temperature_c": current_weather["temperature_c"],
        "wind_speed_kmh": current_weather["wind_speed_kmh"],
        "rain_mm": current_weather["rain_mm"],
        "hour": int(forecast_hour.hour),
        "day_of_week": int(forecast_hour.weekday()),
        "month": int(forecast_hour.month),
        "is_weekend": int(forecast_hour.weekday() >= 5),
        "price_lag_24": last_price(lag_24),
        "price_lag_48": last_price(lag_48),
        "price_lag_168": last_price(lag_168),
        "spot_price_eur_mwh": float(last_row[price_col]),
    }


def build_weekly_forecast(zone_code: str, days_count: int = 7) -> dict[str, Any]:
    zone = zone_code.strip().upper()
    if zone not in {"SE1", "SE2", "SE3", "SE4"}:
        raise HTTPException(
            status_code=400,
            detail="Invalid electricity area. Use SE1, SE2, SE3 or SE4.",
        )

    df = _load_zone_dataset()
    today = pd.Timestamp.now(tz=LOCAL_TIMEZONE).normalize()
    forecast_dates = _resolve_forecast_dates(today, days_count)
    forecast_days: list[dict[str, Any]] = []

    for target_day in forecast_dates:
        day_weather = _get_daily_weather_summary(zone, target_day, df)
        day_timestamp = target_day + pd.Timedelta(hours=12)
        feature_row = _get_feature_row(zone, day_timestamp, df)
        feature_row["temperature_c"] = day_weather["temperature_c"]
        feature_row["wind_speed_kmh"] = day_weather["wind_speed_kmh"]
        feature_row["rain_mm"] = day_weather["rain_mm"]

        predicted_price = predict_price(feature_row)
        cluster_prediction = predict_cluster(
            {
                "spot_price_eur_mwh": float(predicted_price),
                "wind_speed_kmh": float(day_weather["wind_speed_kmh"]),
                "temperature_c": float(day_weather["temperature_c"]),
            }
        )
        cluster_level = _map_cluster_to_level(cluster_prediction)
        svm_recommendation = bool(predict_optimal_hour(feature_row))

        forecast_days.append(
            {
                "date": target_day.strftime("%Y-%m-%d"),
                "day_name": target_day.strftime("%A"),
                "predicted_price": round(float(predicted_price), 2),
                "classification": cluster_level,
                "recommended": svm_recommendation,
                "weather": {
                    "temperature_c": round(float(day_weather["temperature_c"]), 1),
                    "wind_speed_kmh": round(float(day_weather["wind_speed_kmh"]), 1),
                    "rain_mm": round(float(day_weather["rain_mm"]), 1),
                },
                "energy_area": zone,
            }
        )

    best_days = sorted(
        forecast_days,
        key=lambda item: (
            0 if item["classification"] == "low" else 1,
            0 if item["recommended"] else 1,
            item["predicted_price"],
        ),
    )[:3]



    return {
        "zone": zone,
        "days": forecast_days,
        "recommendation": {
            "title": "Best upcoming days",
            "best_days": [day["day_name"] for day in best_days],
        },
    }


# --- Endpoints som nyttjar samma funktion ---
@router.get("/health")
def prediction_health():
    return {"status": "ok"}


@router.get("/forecast")
@router.get("/weekly-forecast")
@limiter.limit(settings.RATE_LIMIT_EXTRA)
def weekly_forecast(
    request: Request,
    zone: str = Query(
        default="SE3",
        description="Electricity area to forecast, e.g. SE1, SE2, SE3 or SE4.",
    )
):
    return build_weekly_forecast(zone)


@router.post("/predict")
@limiter.limit(settings.RATE_LIMIT_EXTRA)
def predict(request: Request, response: Response, payload: PredictionRequest):
    return run_prediction(payload)
