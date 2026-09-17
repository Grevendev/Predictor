from typing import List
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import requests

# Importerar dynamisk data för UI/Frontend (från den första filen)
from app.ml.features import get_dynamic_forecast

router = APIRouter()


class ZoneInfo(BaseModel):
    code: str
    name: str
    description: str


# Återskapad: Behövs för grafen
class HourlyPricePoint(BaseModel):
    timestamp: str
    raw_timestamp: str
    predictedPrice: float
    isHistorical: bool
    isCurrentHour: bool
    isOptimal: bool
    day: str  # "today" eller "tomorrow"


# Återskapad: Den fullständiga responsmodellen med all data för Hero-kort och grafer
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


# Från fil 2: Snabbspärr för uppenbara lands- och regionnamn
COUNTRIES_BLACKLIST = {
    "england",
    "storbritannien",
    "uk",
    "united kingdom",
    "usa",
    "united states",
    "tyskland",
    "germany",
    "danmark",
    "denmark",
    "norge",
    "norway",
    "finland",
    "frankrike",
    "france",
    "spanien",
    "spain",
    "italien",
    "italy",
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
    location: str = Query(
        ..., description="Svensk stad eller tätort, t.ex. 'Malmö' eller 'Lund'"
    ),
):
    query_clean = location.strip().lower()

    # Smartare validering från fil 2
    if query_clean in COUNTRIES_BLACKLIST:
        raise HTTPException(
            status_code=400,
            detail=f"'{location.strip()}' är ett land eller en region. Ange en svensk stad eller tätort (t.ex. Malmö, Sundsvall).",
        )

    geo_url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {
        "name": location.strip(),
        "count": 10,
        "language": "sv",
        "format": "json",
    }

    try:
        res = requests.get(geo_url, params=params, timeout=5)
        res.raise_for_status()
        data = res.json()
    except Exception as error:
        # Externa fel ska inte läcka tokens, URL:er eller intern felinformation.
        raise HTTPException(status_code=502, detail="Geocoding service unavailable.") from error

    results = data.get("results", [])
    if not results:
        raise HTTPException(
            status_code=404,
            detail=f"Kunde inte hitta någon stad eller ort med namnet '{location}'.",
        )

    # Från fil 2: Filtrera på tätorter/städer (feature_code PPL*)
    city_results = [
        r
        for r in results
        if r.get("feature_code", "").startswith("PPL") or not r.get("feature_code")
    ] or results

    top_hit = city_results[0]
    country_code = top_hit.get("country_code", "").upper()

    # Från fil 2: Tydligt felmeddelande om staden inte ligger i Sverige
    if country_code != "SE":
        country_name = top_hit.get("country") or country_code
        admin = top_hit.get("admin1")
        place_info = (
            f"{admin}, {country_name}"
            if admin and admin != country_name
            else country_name
        )
        raise HTTPException(
            status_code=400,
            detail=f"Staden '{top_hit.get('name')}' ligger i {place_info}. Tjänsten stödjer endast svenska städer.",
        )

    lat = top_hit["latitude"]
    lon = top_hit["longitude"]
    official_name = top_hit.get("name", location)
    country = top_hit.get("country", "Sverige")

    try:
        zone_data = get_zone_from_coordinates(lat, lon)
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err))

    # Från fil 1: Hämta dynamisk prognos för att bygga grafer & hero-kort
    forecast_data = get_dynamic_forecast(zone_data["code"])

    # Från fil 1: Returnera synkat svar där nycklarna mappar mot den fullständiga LocationZoneResponse
    return LocationZoneResponse(
        name=official_name,
        city=official_name,
        country=country,
        country_code="SE",
        latitude=lat,
        longitude=lon,
        energyArea=zone_data["code"],
        zone=ZoneInfo(**zone_data),
        unit=forecast_data["unit"],
        has_tomorrow_data=forecast_data["has_tomorrow_data"],
        current_price=forecast_data["current_price"],
        is_now_optimal=forecast_data["is_now_optimal"],
        lowest_price=forecast_data["lowest_future_price"],
        lowest_price_time=forecast_data["lowest_future_time"],
        predictions=forecast_data["predictions"],
    )
