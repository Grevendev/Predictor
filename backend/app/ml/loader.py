import joblib
from pathlib import Path


MODEL_PATH = (
    Path(__file__).resolve().parents[3]
    / "models_bin"
    / "random_forest_all_zones.joblib"
)


def load_model():
    package = joblib.load(MODEL_PATH)

    model = package["model"]
    features = package["features"]

    return model, features