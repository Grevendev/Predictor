from fastapi import APIRouter
from pydantic import BaseModel

from app.ml.inference import (
    predict_price,
    predict_optimal_hour,
    predict_cluster,
)


router = APIRouter()


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


@router.get("/health")
def prediction_health():
    return {"status": "ok"}


@router.post("/predict")
def predict(request: PredictionRequest):
    input_data = request.model_dump()

    predicted_price = predict_price(input_data)
    optimal_hour = predict_optimal_hour(input_data)
    cluster = predict_cluster(input_data)

    return {
        "predicted_price_eur_mwh": predicted_price,
        "is_optimal_hour": bool(optimal_hour),
        "cluster": cluster,
    }