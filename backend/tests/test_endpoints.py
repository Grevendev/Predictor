from pathlib import Path

from fastapi.testclient import TestClient

from app.main import app
from app.api.v1.endpoints import energy_areas, main_endpoint


client = TestClient(app)


# Checks if the root endpoint is available without authentication.
def test_root_endpoint_is_available_without_authentication():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"]


# Checks if the health endpoint returns a healthy status.
def test_health_endpoint_is_available_without_authentication():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


# Checks if the energy areas endpoint returns valid GeoJSON data.
def test_energy_areas_returns_geojson(monkeypatch, tmp_path: Path):
    geojson_file = tmp_path / "energy_areas.geojson"
    geojson_file.write_text(
        '{"type": "FeatureCollection", "features": []}',
        encoding="utf-8",
    )
    monkeypatch.setattr(energy_areas, "GEOJSON_FILE", geojson_file)

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


# Checks if spot-check rejects requests without a location.
def test_spot_check_rejects_missing_location():
    response = client.get("/api/v1/spot-check")

    assert response.status_code == 422


# Checks if errors from the geocoding service are hidden from the client.
def test_spot_check_hides_upstream_exception(monkeypatch):
    def fail_get(*args, **kwargs):
        raise RuntimeError("secret upstream token")

    monkeypatch.setattr(main_endpoint.requests, "get", fail_get)

    response = client.get(
        "/api/v1/spot-check",
        params={"location": "Stockholm"},
    )

    assert response.status_code == 502
    assert response.json() == {
        "detail": "Geocoding service unavailable."
    }
    assert "secret upstream token" not in response.text