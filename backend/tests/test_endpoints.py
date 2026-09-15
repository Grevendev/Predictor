from pathlib import Path

from fastapi.testclient import TestClient

from app.main import app
from app.api.v1.endpoints import energy_areas, main_endpoint


client = TestClient(app)


# Nya tester för grundrutterna och energikartsdata.
def test_root_endpoint_is_available_without_authentication():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"]


def test_health_endpoint_is_available_without_authentication():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_energy_areas_returns_geojson(monkeypatch, tmp_path: Path):
    geojson_file = tmp_path / "energy_areas.geojson"
    geojson_file.write_text(
        '{"type": "FeatureCollection", "features": []}',
        encoding="utf-8",
    )
    monkeypatch.setattr(energy_areas, "GEOJSON_FILE", geojson_file)

    response = client.get("/api/v1/energy-areas")

    assert response.status_code == 200
    assert response.json() == {"type": "FeatureCollection", "features": []}


def test_energy_areas_returns_not_found_when_file_is_missing(monkeypatch, tmp_path: Path):
    monkeypatch.setattr(energy_areas, "GEOJSON_FILE", tmp_path / "missing.geojson")

    response = client.get("/api/v1/energy-areas")

    assert response.status_code == 404
    assert response.json() == {"detail": "Energy area data not found."}


# Geokodning och prediktion ersätts med testdata i stället för riktiga anrop.
def test_spot_check_returns_zone_and_prediction(monkeypatch):
    class MockResponse:
        def raise_for_status(self):
            return None

        def json(self):
            return {
                "results": [
                    {
                        "name": "Malmö",
                        "country": "Sverige",
                        "country_code": "SE",
                        "latitude": 55.605,
                        "longitude": 13.0038,
                    }
                ]
            }

    monkeypatch.setattr(main_endpoint.requests, "get", lambda *args, **kwargs: MockResponse())
    monkeypatch.setattr(
        main_endpoint,
        "get_features_for_zone",
        lambda zone: {"zone": zone},
    )
    monkeypatch.setattr(
        main_endpoint,
        "run_prediction",
        lambda features: {
            "predicted_price_eur_mwh": 42.5,
            "is_optimal_hour": True,
            "cluster": 1,
        },
    )

    response = client.get("/api/v1/spot-check", params={"location": "Malmö"})

    assert response.status_code == 200
    assert response.json()["zone"]["code"] == "SE4"
    assert response.json()["prediction"] == {
        "predicted_price_eur_mwh": 42.5,
        "is_optimal_hour": True,
        "cluster": 1,
    }


def test_spot_check_rejects_missing_location():
    response = client.get("/api/v1/spot-check")

    assert response.status_code == 422


# Externa fel ska ge ett enkelt svar utan intern information.
def test_spot_check_hides_upstream_exception(monkeypatch):
    def fail_get(*args, **kwargs):
        raise RuntimeError("secret upstream token")

    monkeypatch.setattr(main_endpoint.requests, "get", fail_get)

    response = client.get("/api/v1/spot-check", params={"location": "Stockholm"})

    assert response.status_code == 502
    assert response.json() == {"detail": "Geocoding service unavailable."}
    assert "secret upstream token" not in response.text


