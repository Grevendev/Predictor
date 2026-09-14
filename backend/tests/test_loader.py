from app.ml.loader import (
    load_random_forest,
    load_svm,
    load_clustering,
)


def test_load_random_forest():
    model, features = load_random_forest()

    assert model is not None
    assert len(features) > 0


def test_load_svm():
    model, scaler, features = load_svm()

    assert model is not None
    assert scaler is not None
    assert len(features) > 0


def test_load_clustering():
    model, scaler, features = load_clustering()

    assert model is not None
    assert scaler is not None
    assert len(features) > 0