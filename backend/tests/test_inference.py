from app.ml.inference import (
    predict_price,
    predict_optimal_hour,
    predict_cluster,
)


TEST_INPUT = {
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


def test_predict_price_returns_float():
    result = predict_price(TEST_INPUT)

    assert isinstance(result, float)


def test_predict_optimal_hour_returns_binary():
    result = predict_optimal_hour(TEST_INPUT)

    assert result in [0, 1]


def test_predict_cluster_returns_int():
    result = predict_cluster(TEST_INPUT)

    assert isinstance(result, int)