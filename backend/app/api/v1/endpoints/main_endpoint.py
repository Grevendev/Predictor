from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import requests
from typing import Any, Dict

from app.api.v1.endpoints.predictions import run_prediction
from app.ml.features import get_features_for_zone

router = APIRouter()


class ZoneInfo(BaseModel):
    code: str
    name: str
    description: str

class PredictionResult(BaseModel):
    predicted_price_eur_mwh: float
    is_optimal_hour: bool
    cluster: Any


class LocationZoneResponse(BaseModel):
    name: str
    country: str
    country_code: str
    latitude: float
    longitude: float
    zone: ZoneInfo
    prediction: PredictionResult


# Gemensam uppslagsdata för zonerna
ZONE_METADATA: dict[str, dict[str, str]] = {
    "SE1": {
        "code": "SE1",
        "name": "Norra Sverige",
        "description": "Elområde SE1 omfattar norra Sverige.",
    },
    "SE2": {
        "code": "SE2",
        "name": "Norra Mellansverige",
        "description": "Elområde SE2 omfattar norra och centrala delar av Sverige.",
    },
    "SE3": {
        "code": "SE3",
        "name": "Södra Mellansverige",
        "description": "Elområde SE3 omfattar bland annat Stockholm och Göteborg.",
    },
    "SE4": {
        "code": "SE4",
        "name": "Södra Sverige",
        "description": "Elområde SE4 omfattar södra Sverige.",
    },
}


def get_zone_from_coordinates(lat: float, lon: float) -> dict[str, str]:
    # Kontrollera att koordinaterna befinner sig inom Sveriges territorium
    if not (55.0 <= lat <= 69.5 and 10.5 <= lon <= 24.5):
        raise ValueError("Koordinaterna ligger utanför Sveriges gränser.")

    if lat >= 64.5:
        zone_code = "SE1"
    elif lat >= 61.5:
        zone_code = "SE2"
    elif lat >= 57.0:
        zone_code = "SE3"
    else:
        zone_code = "SE4"

    return ZONE_METADATA[zone_code]


@router.get("/spot-check", response_model=LocationZoneResponse)
def lookup_zone(
    location: str = Query(..., description="Ortsnamn, t.ex. 'Malmö' eller 'Lund'")
):
    geo_url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {
        "name": location,
        "count": 5,
        "language": "sv",
        "format": "json",
        "country_code": "SE",
    }

    try:
        res = requests.get(geo_url, params=params, timeout=5)
        res.raise_for_status()
        data = res.json()
    except Exception as e:
        raise HTTPException(
            status_code=502, detail=f"Fel vid anrop till geokodningstjänst: {e}"
        )

    results = data.get("results", [])
    se_matches = [r for r in results if r.get("country_code", "").upper() == "SE"]

    if not se_matches:
        raise HTTPException(
            status_code=404,
            detail=f"Kunde inte hitta någon svensk ort med namnet '{location}'.",
        )

    best_match = se_matches[0]
    lat = best_match["latitude"]
    lon = best_match["longitude"]
    official_name = best_match.get("name", location)
    country = best_match.get("country", "Sverige")
    country_code = best_match.get("country_code", "SE").upper()

    try:
        zone_data = get_zone_from_coordinates(lat, lon)
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err))

    # Hämta riktiga features från datasetet för zonen
    features = get_features_for_zone(zone_data["code"])

    # Kör inferensen mot era tränade modeller
    prediction_result = run_prediction(features)

    # Skicka tillbaka ort, zon OCH prediktion i ett och samma svar
    return LocationZoneResponse(
        name=official_name,
        country=country,
        country_code=country_code,
        latitude=lat,
        longitude=lon,
        zone=ZoneInfo(**zone_data),
        prediction=PredictionResult(**prediction_result),
    )
