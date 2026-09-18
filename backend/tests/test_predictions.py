from fastapi.testclient import TestClient

from app.main import app
from app.api.v1.endpoints import predictions


client = TestClient(app)


# Testar att prediktionsservicen är igång.
def test_prediction_health():
    response = client.get("/api/v1/predictions/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


# Modellerna ersätts med enkla testvärden så testet blir snabbt och stabilt.
def test_predict_endpoint(monkeypatch):
    monkeypatch.setattr(predictions, "predict_price", lambda data: 123.456)
    monkeypatch.setattr(predictions, "predict_optimal_hour", lambda data: 1)
    monkeypatch.setattr(predictions, "predict_cluster", lambda data: 2)

    payload = {
        "zone": "SE3",
        "temperature_c": 10.0,
        "wind_speed_kmh": 15.0,
        "rain_mm": 0.0,
        "hour": 18,
        "day_of_week": 4,
        "month": 9,
        "is_weekend": 0,
        "price_lag_24": 50.0,
        "price_lag_48": 48.0,
        "price_lag_168": 52.0,
        "spot_price_eur_mwh": 40.0,
    }

    response = client.post(
        "/api/v1/predictions/predict",
        json=payload,
    )

    assert response.status_code == 200

    data = response.json()

    assert "predicted_price_eur_mwh" in data
    assert "is_optimal_hour" in data
    assert "cluster" in data
    assert data == {
        "predicted_price_eur_mwh": 123.46,
        "is_optimal_hour": True,
        "cluster": 2,
    }


def test_weekly_forecast_returns_nine_days_and_zone(monkeypatch):
    monkeypatch.setattr(predictions, "predict_price", lambda data: 41.25)
    monkeypatch.setattr(predictions, "predict_optimal_hour", lambda data: 1)
    monkeypatch.setattr(predictions, "predict_cluster", lambda data: 0)

    response = client.get("/api/v1/predictions/weekly-forecast?zone=SE3")

    assert response.status_code == 200
    data = response.json()
    assert data["zone"] == "SE3"
    assert len(data["days"]) == 9
    assert data["days"][0]["classification"] == "low"
    assert data["days"][0]["recommended"] is True
    assert "recommendation" in data


# Testar att felaktiga eller ofullständiga anrop stoppas.
def test_predict_rejects_missing_required_fields():
    response = client.post(
        "/api/v1/predictions/predict",
        json={"zone": "SE3"},
    )

    assert response.status_code == 422


def test_predict_rejects_wrong_field_types():
    response = client.post(
        "/api/v1/predictions/predict",
        json={
            "zone": "SE3",
            "temperature_c": "not-a-number",
            "wind_speed_kmh": 15.0,
            "rain_mm": 0.0,
            "hour": 18,
            "day_of_week": 4,
            "month": 9,
            "is_weekend": 0,
            "price_lag_24": 50.0,
            "price_lag_48": 48.0,
            "price_lag_168": 52.0,
            "spot_price_eur_mwh": 40.0,
        },
    )

    assert response.status_code == 422

