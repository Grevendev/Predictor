from datetime import timedelta
from pathlib import Path
from daily_sync import append_to_master_dataset, fetch_and_stage_data
import pandas as pd

# Sökvägar via Path-objekt
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # Predictor-roten
DATASET_DIR = BASE_DIR / "dataset"
CSV_PATH = DATASET_DIR / "all_zones_complete.csv"

# Skapa målmappen om den inte finns
DATASET_DIR.mkdir(parents=True, exist_ok=True)


def get_next_start_date(master_path: Path, default_start: str = "2025-01-01") -> str:
    """Kontrollerar om filen finns och returnerar nästa datum som behöver hämtas."""
    if not master_path.is_file():
        print(
            f"Hittade ingen befintlig fil på {master_path}. Skapar ny från {default_start}."
        )
        return default_start

    try:
        df = pd.read_csv(master_path, usecols=["timestamp"])
        if df.empty or "timestamp" not in df.columns:
            return default_start

        df["timestamp"] = pd.to_datetime(df["timestamp"], utc=True)
        last_ts = df["timestamp"].max()

        if pd.isnull(last_ts):
            return default_start

        last_date = last_ts.date().isoformat()
        print(f"Sista registrerade tidsstämpel i filen: {last_date}")

        next_start = (last_ts + timedelta(hours=1)).date().isoformat()
        print(f"Datum att anropa nästa gång (START_DATE): {next_start}")
        return next_start

    except Exception as e:
        print(
            f"Kunde inte läsa tidsstämpel från filen ({e}). Använder {default_start}."
        )
        return default_start


def sync_latest_data(start_date: str, end_date: str):
    if start_date > end_date:
        print(
            f"Datasetet är redan uppdaterat t.o.m. {end_date} (nästa start vore {start_date})."
        )
        return

    # 1. Hämta rådata och slå ihop elpriser + väder
    df_staged = fetch_and_stage_data(start_date, end_date)

    # 2. Skapa eller merga in i masterfilen
    append_to_master_dataset(df_staged, master_path=CSV_PATH)


next_start_date = get_next_start_date(CSV_PATH, default_start="2025-01-01")
sync_latest_data(next_start_date, "2026-09-15")
