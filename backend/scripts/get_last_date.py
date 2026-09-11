import pandas as pd
from pathlib import Path
from daily_sync import fetch_and_stage_data, append_to_master_dataset
from datetime import timedelta


BASE_DIR = Path(__file__).resolve().parent.parent.parent  # backend/
DATSET_DIR = f"{BASE_DIR}/dataset/all_zones_complete.csv"
print(DATSET_DIR)


# Peka på din nuvarande fil
csv_path = Path(DATSET_DIR)
df = pd.read_csv(csv_path, usecols=["timestamp"])
df["timestamp"] = pd.to_datetime(df["timestamp"], utc=True)

last_ts = df["timestamp"].max()
last_date = last_ts.date().isoformat()
print(f"Sista registrerade tidsstämpel i filen: {last_date}")

# Nästa datum att hämta:
next_start_date = (last_ts + timedelta(hours=1)).date().isoformat()
print(f"Datum att anropa nästa gång (START_DATE): {next_start_date}")


def sync_latest_data(start_date: str, end_date: str):
    # 1. Hämta rådata och slå ihop elpriser + väder till en bred DF
    df_staged = fetch_and_stage_data(start_date, end_date)

    # 2. Merga in den nya breda datan direkt i den omdöpta masterfilen
    append_to_master_dataset(df_staged)


sync_latest_data(next_start_date, "2026-09-09")
