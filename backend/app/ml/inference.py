import pandas as pd

from app.ml.loader import load_random_forest


random_forest, rf_features = load_random_forest()


def predict_price(input_data: dict) -> float:
    input_data = input_data.copy()

    zone = input_data.pop("zone")

    input_data["zone_SE2"] = int(zone == "SE2")
    input_data["zone_SE3"] = int(zone == "SE3")
    input_data["zone_SE4"] = int(zone == "SE4")

    input_df = pd.DataFrame([input_data])

    input_df = input_df[rf_features]

    prediction = random_forest.predict(input_df)

    return float(prediction[0])