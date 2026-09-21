import json
from pathlib import Path

from fastapi import APIRouter, HTTPException, Request, Response
from app.core.config import settings
from app.core.limiter import limiter

router = APIRouter(
    prefix="/energy-areas",
    tags=["energy-areas"],
)


BASE_DIR = Path(__file__).resolve().parents[4]

GEOJSON_FILE = (
    BASE_DIR
    / "data"
    / "geography"
    / "energy_areas.geojson"
)


@router.get("")
@limiter.limit(settings.RATE_LIMIT_ENERGY_AREAS)
def get_energy_areas(request: Request, response: Response):
    if not GEOJSON_FILE.exists():
        raise HTTPException(
            status_code=404,
            detail="Energy area data not found.",
        )

    try:
        with GEOJSON_FILE.open(
            "r",
            encoding="utf-8",
        ) as file:
            return json.load(file)

    except (OSError, json.JSONDecodeError) as error:
        raise HTTPException(
            status_code=500,
            detail="Could not load energy area data.",
        ) from error
