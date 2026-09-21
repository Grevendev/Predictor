import json
from pathlib import Path

from fastapi import APIRouter, HTTPException


router = APIRouter(
    prefix="/energy-areas",
    tags=["energy-areas"],
)


BASE_DIR = Path(__file__).resolve().parents[3]

GEOJSON_FILE = (
    BASE_DIR
    / "data"
    / "geography"
    / "energy_areas.geojson"
)


@router.get("")
def get_energy_areas():
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