import pandas as pd


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean the raw electricity price dataset.

    - Converts timestamps to datetime
    - Converts local timestamp to Europe/Stockholm timezone
    - Sorts data chronologically
    - Removes duplicate timestamps
    """

    df = df.copy()

    df["timestamp"] = pd.to_datetime(
        df["timestamp"],
        utc=True
    )

    df["timestamp_local"] = pd.to_datetime(
        df["timestamp_local"],
        utc=True
    ).dt.tz_convert("Europe/Stockholm")

    df = df.sort_values("timestamp").reset_index(drop=True)

    df = df.drop_duplicates(
        subset=["timestamp"],
        keep="first"
    )

    return df


def add_time_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Create time-based features from the local timestamp.
    """

    df = df.copy()

    df["hour"] = df["timestamp_local"].dt.hour
    df["day_of_week"] = df["timestamp_local"].dt.dayofweek
    df["month"] = df["timestamp_local"].dt.month
    df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)

    return df


def add_lag_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Create historical electricity price features.

    Assumes hourly, chronologically sorted data.
    """

    df = df.copy()

    df["price_lag_24"] = df["spot_price_eur_mwh"].shift(24)
    df["price_lag_48"] = df["spot_price_eur_mwh"].shift(48)
    df["price_lag_168"] = df["spot_price_eur_mwh"].shift(168)

    return df


def prepare_data(
    df: pd.DataFrame,
    include_lags: bool = True
) -> pd.DataFrame:
    """
    Run the full preprocessing pipeline.
    """

    df = clean_data(df)
    df = add_time_features(df)

    if include_lags:
        df = add_lag_features(df)

    return df