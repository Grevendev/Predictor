from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import requests
from typing import List

from app.ml.features import get_dynamic_forecast

router = APIRouter()


class ZoneInfo(BaseModel):
    code: str
    name: str
    description: str


class HourlyPricePoint(BaseModel):
    timestamp: str
    raw_timestamp: str
    predictedPrice: float
    isHistorical: bool
    isCurrentHour: bool
    isOptimal: bool
    day: str  # "today" eller "tomorrow"


class LocationZoneResponse(BaseModel):
    # Geografisk data
    name: str
    city: str
    country: str
    country_code: str
    latitude: float
    longitude: float
    energyArea: str
    zone: ZoneInfo

    # Sammanfattning för Hero-kortet
    unit: str
    has_tomorrow_data: bool
    current_price: float
    is_now_optimal: bool
    lowest_price: float
    lowest_price_time: str

    # Dynamisk tidsserie för grafen
    predictions: List[HourlyPricePoint]


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

    # Hämta dynamisk prognos från features.py
    forecast_data = get_dynamic_forecast(zone_data["code"])

    # Returnera synkat svar där nycklarna mappar mot LocationZoneResponse
    return LocationZoneResponse(
        name=official_name,
        city=official_name,
        country=country,
        country_code=country_code,
        latitude=lat,
        longitude=lon,
        energyArea=zone_data["code"],
        zone=ZoneInfo(**zone_data),
        unit=forecast_data["unit"],
        has_tomorrow_data=forecast_data["has_tomorrow_data"],
        current_price=forecast_data["current_price"],
        is_now_optimal=forecast_data["is_now_optimal"],
        lowest_price=forecast_data[
            "lowest_future_price"
        ],  # Mappat mot lowest_future_price
        lowest_price_time=forecast_data[
            "lowest_future_time"
        ],  # Mappat mot lowest_future_time
        predictions=forecast_data["predictions"],
    )
