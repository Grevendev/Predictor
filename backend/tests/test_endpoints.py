from pathlib import Path

from fastapi.testclient import TestClient

from app.main import app
from app.api.v1.endpoints import energy_areas, main_endpoint


client = TestClient(app)


# Checks if the root endpoint is available without authentication.
#def test_root_endpoint_is_available_without_authentication():
#    response = client.get("/")
#
#    assert response.status_code == 200
#    assert response.json()["message"]


# Checks if the health endpoint returns a healthy status.
#def test_health_endpoint_is_available_without_authentication():
#    response = client.get("/health")
#
#    assert response.status_code == 200
#    assert response.json() == {"status": "healthy"}


# Checks if the energy areas endpoint returns valid GeoJSON data.
def test_energy_areas_returns_geojson(monkeypatch, tmp_path: Path):
    geojson_file = tmp_path / "energy_areas.geojson"
    geojson_file.write_text(
        '{"type": "FeatureCollection", "features": []}',
        encoding="utf-8",
    )

    monkeypatch.setattr(
        energy_areas,
        "GEOJSON_FILE",
        geojson_file,
    )

    response = client.get("/api/v1/energy-areas")

    assert response.status_code == 200
    assert response.json() == {
        "type": "FeatureCollection",
        "features": [],
    }


# Checks if a missing energy areas file returns a 404 error.
def test_energy_areas_returns_not_found_when_file_is_missing(
    monkeypatch,
    tmp_path: Path,
):
    monkeypatch.setattr(
        energy_areas,
        "GEOJSON_FILE",
        tmp_path / "missing.geojson",
    )

    response = client.get("/api/v1/energy-areas")

    assert response.status_code == 404
    assert response.json() == {
        "detail": "Energy area data not found."
    }


# Checks if Gothenburg is registered as energy area SE3.
def test_goteborg_coordinates_return_se3():
    zone = main_endpoint.get_zone_from_coordinates(
        lat=57.7089,
        lon=11.9746,
    )

    assert zone["code"] == "SE3"


# Checks if spot-check uses SE3 and returns forecast data for Gothenburg.
def test_spot_check_returns_prediction_for_se3(monkeypatch):
    class MockResponse:
        def raise_for_status(self):
            return None

        def json(self):
            return {
                "results": [
                    {
                        "name": "Göteborg",
                        "country": "Sverige",
                        "country_code": "SE",
                        "latitude": 57.7089,
                        "longitude": 11.9746,
                    }
                ]
            }

    # Replaces the external geocoding request with test data.
    monkeypatch.setattr(
        main_endpoint.requests,
        "get",
        lambda *args, **kwargs: MockResponse(),
    )

    called_with = {}

    def mock_forecast(zone):
        called_with["zone"] = zone

        return {
            "unit": "EUR/MWh",
            "has_tomorrow_data": True,
            "current_price": 42.5,
            "is_now_optimal": True,
            "lowest_future_price": 30.0,
            "lowest_future_time": "14:00",
            "predictions": [
                {
                    "timestamp": "14:00",
                    "raw_timestamp": "2026-09-17T14:00:00",
                    "predictedPrice": 30.0,
                    "isHistorical": False,
                    "isCurrentHour": False,
                    "isOptimal": True,
                    "day": "today",
                }
            ],
        }

    # Replaces the real forecast with predictable test data.
    monkeypatch.setattr(
        main_endpoint,
        "get_dynamic_forecast",
        mock_forecast,
    )

    response = client.get(
        "/api/v1/spot-check",
        params={"location": "Göteborg"},
    )

    assert response.status_code == 200

    data = response.json()

    # Checks if Gothenburg was mapped to SE3 before requesting the forecast.
    assert called_with["zone"] == "SE3"

    # Checks if the correct energy area is returned.
    assert data["zone"]["code"] == "SE3"
    assert data["energyArea"] == "SE3"

    # Checks if the forecast data is returned correctly.
    assert data["current_price"] == 42.5
    assert data["is_now_optimal"] is True
    assert data["lowest_price"] == 30.0
    assert data["lowest_price_time"] == "14:00"

    # Checks if the hourly predictions are returned correctly.
    assert len(data["predictions"]) == 1
    assert data["predictions"][0]["predictedPrice"] == 30.0
    assert data["predictions"][0]["isOptimal"] is True


# Checks if spot-check rejects requests without a location.
def test_spot_check_rejects_missing_location():
    response = client.get("/api/v1/spot-check")

    assert response.status_code == 422


# Checks if errors from the geocoding service are hidden from the client.
def test_spot_check_hides_upstream_exception(monkeypatch):
    def fail_get(*args, **kwargs):
        raise RuntimeError("secret upstream token")

    monkeypatch.setattr(
        main_endpoint.requests,
        "get",
        fail_get,
    )

    response = client.get(
        "/api/v1/spot-check",
        params={"location": "Stockholm"},
    )

    assert response.status_code == 502
    assert response.json() == {
        "detail": "Geocoding service unavailable."
    }
    assert "secret upstream token" not in response.text