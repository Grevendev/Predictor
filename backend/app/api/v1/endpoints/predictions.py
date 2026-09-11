from fastapi import APIRouter
from pydantic import BaseModel

from app.ml.inference import predict_price


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


@router.get("/health")
def prediction_health():
    return {"status": "ok"}


@router.post("/predict")
def predict(request: PredictionRequest):
    predicted_price = predict_price(request.model_dump())

    return {
        "predicted_price_eur_mwh": predicted_price
    }