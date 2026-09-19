import json
import joblib
from pathlib import Path


MODEL_PATH = (
    Path(__file__).resolve().parents[3]
    / "models_bin"
    / "random_forest_all_zones.joblib"
)

SVM_PATH = (
    Path(__file__).resolve().parents[3]
    / "models_bin"
    / "svm_optimal_classifier.joblib"
)

SVM_SCALER_PATH = (
    Path(__file__).resolve().parents[3]
    / "models_bin"
    / "scaler.joblib"
)

SVM_FEATURES_PATH = (
    Path(__file__).resolve().parents[3]
    / "models_bin"
    / "feature_cols.json"
)

KMEANS_PATH = (
    Path(__file__).resolve().parents[3]
    / "models_bin"
    / "kmeans_zone_model.pkl"
)

KMEANS_SCALER_PATH = (
    Path(__file__).resolve().parents[3]
    / "models_bin"
    / "scaler_zone.pkl"
)


def load_random_forest():
    package = joblib.load(MODEL_PATH)

    model = package["model"]
    features = package["features"]

    return model, features


def load_svm():
    model = joblib.load(SVM_PATH)
    scaler = joblib.load(SVM_SCALER_PATH)

    with open(SVM_FEATURES_PATH, "r") as f:
        features = json.load(f)

    return model, scaler, features


def load_clustering():
    model = joblib.load(KMEANS_PATH)
    scaler = joblib.load(KMEANS_SCALER_PATH)

    features = list(scaler.feature_names_in_)

    return model, scaler, features