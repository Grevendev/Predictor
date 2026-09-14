from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_prediction_health():
    response = client.get("/api/v1/predictions/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_endpoint():
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