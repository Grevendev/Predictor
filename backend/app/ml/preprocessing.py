import pandas as pd

def reshape_zones(df: pd.DataFrame) -> pd.DataFrame:
    """
    Convert the dataset from wide format to long format,
    with one row per timestamp and price zone.
    """

    zone_dfs = []

    for zone in ["se1", "se2", "se3", "se4"]:
        zone_df = df[
            [
                "timestamp",
                "timestamp_local",
                f"temp_{zone}_c",
                f"wind_{zone}_kmh",
                f"rain_{zone}_mm",
                f"price_{zone}_eur_mwh",
            ]
        ].copy()

        zone_df = zone_df.rename(
            columns={
                f"temp_{zone}_c": "temperature_c",
                f"wind_{zone}_kmh": "wind_speed_kmh",
                f"rain_{zone}_mm": "rain_mm",
                f"price_{zone}_eur_mwh": "spot_price_eur_mwh",
            }
        )

        zone_df["zone"] = zone.upper()

        zone_dfs.append(zone_df)

    return pd.concat(zone_dfs, ignore_index=True)

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean the electricity dataset.

    - Converts timestamps to datetime
    - Sorts data by zone and timestamp
    - Removes duplicate observations per zone
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

    df = df.sort_values(
        ["zone", "timestamp"]
    ).reset_index(drop=True)

    df = df.drop_duplicates(
        subset=["zone", "timestamp"],
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
    Create historical electricity price features per price zone.

    Assumes hourly, chronologically sorted data.
    """

    df = df.copy()

    df = df.sort_values(
        ["zone", "timestamp"]
    ).reset_index(drop=True)

    df["price_lag_24"] = (
        df.groupby("zone")["spot_price_eur_mwh"]
        .shift(24)
    )

    df["price_lag_48"] = (
        df.groupby("zone")["spot_price_eur_mwh"]
        .shift(48)
    )

    df["price_lag_168"] = (
        df.groupby("zone")["spot_price_eur_mwh"]
        .shift(168)
    )

    return df


def prepare_data(
    df: pd.DataFrame,
    include_lags: bool = True
) -> pd.DataFrame:

    df = reshape_zones(df)
    df = clean_data(df)
    df = add_time_features(df)

    if include_lags:
        df = add_lag_features(df)

    return df