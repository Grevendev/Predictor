from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import requests

router = APIRouter()


class LocationZoneResponse(BaseModel):
    name: str
    country: str
    latitude: float
    longitude: float
    zone: str
    zone_description: str


def get_zone_from_coordinates(lat: float, lon: float) -> tuple[str, str]:
    if lat >= 64.5:
        return "SE1", "Luleå / Norra Norrland"
    elif lat >= 61.5:
        return "SE2", "Sundsvall / Södra Norrland"
    elif lat >= 57.0:
        return "SE3", "Stockholm / Svealand"
    else:
        return "SE4", "Malmö / Södra Götaland"


@router.get("/zone", response_model=LocationZoneResponse)
def lookup_zone(
    location: str = Query(..., description="Ortsnamn, t.ex. 'Malmö' eller 'Lund'")
):
    geo_url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {
        "name": location,
        "count": 1,
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

    results = data.get("results")
    if not results:
        raise HTTPException(
            status_code=404,
            detail=f"Kunde inte hitta någon svensk ort med namnet '{location}'.",
        )

    best_match = results[0]
    lat = best_match["latitude"]
    lon = best_match["longitude"]
    official_name = best_match.get("name", location)
    country = best_match.get("country", "Sverige")

    zone, desc = get_zone_from_coordinates(lat, lon)

    return LocationZoneResponse(
        name=official_name,
        country=country,
        latitude=lat,
        longitude=lon,
        zone=zone,
        zone_description=desc,
    )
