import pandas as pd

from app.ml.loader import (
    load_random_forest,
    load_svm,
    load_clustering,
)


random_forest, rf_features = load_random_forest()
svm_model, svm_scaler, svm_features = load_svm()
kmeans_model, kmeans_scaler, kmeans_features = load_clustering()


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


def predict_optimal_hour(input_data: dict) -> int:
    input_data = input_data.copy()

    zone = input_data.pop("zone")

    input_data["zone_SE1"] = int(zone == "SE1")
    input_data["zone_SE2"] = int(zone == "SE2")
    input_data["zone_SE3"] = int(zone == "SE3")
    input_data["zone_SE4"] = int(zone == "SE4")

    input_df = pd.DataFrame([input_data])
    input_df = input_df[svm_features]

    input_scaled = svm_scaler.transform(input_df)

    prediction = svm_model.predict(input_scaled)

    return int(prediction[0])


def predict_cluster(input_data: dict) -> int:
    input_df = pd.DataFrame([input_data])
    input_df = input_df[kmeans_features]

    input_scaled = kmeans_scaler.transform(input_df)

    cluster = kmeans_model.predict(input_scaled)

    return int(cluster[0])