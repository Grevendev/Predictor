from pathlib import Path
from typing import List

import pandas as pd
from fastapi import APIRouter, HTTPException, Query, Request, Response
from pydantic import BaseModel
from app.core.config import settings
from app.core.limiter import limiter

router = APIRouter(
    prefix="/weather",
    tags=["weather"],
)


CURRENT_FILE = Path(__file__).resolve()
# Säkerställ dynamisk rot: /app i container eller Predictor-roten lokalt
CONTAINER_PATH = Path("/app/dataset/all_zones_complete.csv")
LOCAL_ROOT_PATH = CURRENT_FILE.parents[5] / "dataset" / "all_zones_complete.csv"
FALLBACK_PARENT_PATH = CURRENT_FILE.parents[4] / "dataset" / "all_zones_complete.csv"

if CONTAINER_PATH.is_file():
    DATASET_PATH = CONTAINER_PATH
elif LOCAL_ROOT_PATH.is_file():
    DATASET_PATH = LOCAL_ROOT_PATH
elif FALLBACK_PARENT_PATH.is_file():
    DATASET_PATH = FALLBACK_PARENT_PATH
else:
    DATASET_PATH = Path("dataset/all_zones_complete.csv").resolve()


ZONE_COORDINATES = {
    "SE1": (65.58, 22.15),
    "SE2": (63.18, 14.64),
    "SE3": (59.33, 18.06),
    "SE4": (55.60, 13.00),
}


class WeatherHour(BaseModel):
    time: str
    temperature: float
    precipitation_mm: float
    wind_speed_kmh: float
    weather_type: str


class WeatherDay(BaseModel):
    date: str
    day_name: str
    temperature_max: float
    temperature_min: float
    precipitation_mm: float
    wind_speed_kmh: float
    weather_type: str
    hourly_forecast: List[WeatherHour]


class WeatherResponse(BaseModel):
    zone: str
    forecast: List[WeatherDay]


def get_weather_type(
    precipitation_mm: float,
    wind_speed_kmh: float,
) -> str:
    if precipitation_mm >= 8:
        return "heavyRain"

    if precipitation_mm > 0.5:
        return "rain"

    if wind_speed_kmh >= 35:
        return "cloudy"

    return "clear"


def get_day_name(date: pd.Timestamp) -> str:
    day_names = {
        0: "Mån",
        1: "Tis",
        2: "Ons",
        3: "Tor",
        4: "Fre",
        5: "Lör",
        6: "Sön",
    }

    return day_names[date.dayofweek]


@router.get("", response_model=WeatherResponse)
@limiter.limit(settings.RATE_LIMIT_WEATHER)
def get_weather(
    request: Request, 
    response: Response,
    zone: str = Query(
        ...,
        description="Swedish electricity area, e.g. SE1, SE2, SE3 or SE4",
    ),
):
    zone = zone.strip().upper()

    if zone not in ZONE_COORDINATES:
        raise HTTPException(
            status_code=400,
            detail="Invalid electricity area. Use SE1, SE2, SE3 or SE4.",
        )

    if not DATASET_PATH.is_file():
        raise HTTPException(
            status_code=404,
            detail=f"Weather dataset not found at {DATASET_PATH}.",
        )

    try:
        df = pd.read_csv(DATASET_PATH)

        df["timestamp"] = pd.to_datetime(
            df["timestamp"],
            utc=True,
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Could not load weather data.",
        ) from error

    temp_col = f"temp_{zone.lower()}_c"
    wind_col = f"wind_{zone.lower()}_kmh"
    rain_col = f"rain_{zone.lower()}_mm"

    required_columns = [
        "timestamp",
        temp_col,
        wind_col,
        rain_col,
    ]

    missing_columns = [
        column for column in required_columns if column not in df.columns
    ]

    if missing_columns:
        raise HTTPException(
            status_code=500,
            detail="Required weather data is missing from the dataset.",
        )

    weather = df[
        [
            "timestamp",
            temp_col,
            wind_col,
            rain_col,
        ]
    ].copy()

    weather = weather.dropna(
        subset=[
            temp_col,
            wind_col,
            rain_col,
        ]
    )

    if weather.empty:
        raise HTTPException(
            status_code=404,
            detail="No weather data available.",
        )

    today = pd.Timestamp.now(tz="UTC").normalize()

    weather["date"] = weather["timestamp"].dt.normalize()

    future_weather = weather[weather["date"] >= today].copy()

    # Fallback om framtida datum saknas (lokalt eller vid fördröjd synk)
    if future_weather.empty:
        max_date = weather["date"].max()
        start_date = max_date - pd.Timedelta(days=6)
        future_weather = weather[weather["date"] >= start_date].copy()

    if future_weather.empty:
        raise HTTPException(
            status_code=404,
            detail="No upcoming weather data available.",
        )

    daily = (
        future_weather.groupby("date")
        .agg(
            temperature_max=(temp_col, "max"),
            temperature_min=(temp_col, "min"),
            precipitation_mm=(rain_col, "sum"),
            wind_speed_kmh=(wind_col, "mean"),
        )
        .reset_index()
        .head(7)
    )

    forecast = []

    for _, row in daily.iterrows():
        date = row["date"]

        day_weather = future_weather[future_weather["date"] == date].sort_values(
            "timestamp"
        )

        precipitation = max(
            0.0,
            float(row["precipitation_mm"]),
        )

        wind_speed = max(
            0.0,
            float(row["wind_speed_kmh"]),
        )

        hourly_forecast = []

        for _, hour in day_weather.iterrows():
            hourly_rain = max(
                0.0,
                float(hour[rain_col]),
            )

            hourly_wind = max(
                0.0,
                float(hour[wind_col]),
            )

            hourly_forecast.append(
                WeatherHour(
                    time=hour["timestamp"].strftime("%H:%M"),
                    temperature=round(
                        float(hour[temp_col]),
                        1,
                    ),
                    precipitation_mm=round(
                        hourly_rain,
                        1,
                    ),
                    wind_speed_kmh=round(
                        hourly_wind,
                        1,
                    ),
                    weather_type=get_weather_type(
                        hourly_rain,
                        hourly_wind,
                    ),
                )
            )

        forecast.append(
            WeatherDay(
                date=date.date().isoformat(),
                day_name=get_day_name(date),
                temperature_max=round(
                    float(row["temperature_max"]),
                    1,
                ),
                temperature_min=round(
                    float(row["temperature_min"]),
                    1,
                ),
                precipitation_mm=round(
                    precipitation,
                    1,
                ),
                wind_speed_kmh=round(
                    wind_speed,
                    1,
                ),
                weather_type=get_weather_type(
                    precipitation,
                    wind_speed,
                ),
                hourly_forecast=hourly_forecast,
            )
        )

    return WeatherResponse(
        zone=zone,
        forecast=forecast,
    )
