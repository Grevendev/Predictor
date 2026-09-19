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


from fastapi import APIRouter
from pydantic import BaseModel
from typing import Union, Dict, Any

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


# --- Endpoints som nyttjar samma funktion ---
@router.get("/health")
def prediction_health():
    return {"status": "ok"}


@router.post("/predict")
def predict(request: PredictionRequest):
    return run_prediction(request)
