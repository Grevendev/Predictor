import sys
from datetime import datetime, timedelta
from pathlib import Path
import pandas as pd
from apscheduler.schedulers.blocking import BlockingScheduler

# 1. Säkerställ att backend-katalogen finns i sys.path oavsett varifrån skriptet körs
CURRENT_FILE = Path(__file__).resolve()
BACKEND_DIR = CURRENT_FILE.parent.parent  # backend/
PROJECT_ROOT = BACKEND_DIR.parent  # Predictor-roten (eller containerns /app)

if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

# Importera synkfunktioner (letar i scripts/ eller direkt beroende på miljö)
try:
    from scripts.daily_sync import append_to_master_dataset, fetch_and_stage_data
except ModuleNotFoundError:
    from daily_sync import append_to_master_dataset, fetch_and_stage_data

# 2. Sökvägar för dataset
# I Docker mountas mappen till /app/dataset, lokalt till projektrotens dataset/
if Path("/app/dataset").exists():
    DATASET_DIR = Path("/app/dataset")
else:
    DATASET_DIR = PROJECT_ROOT / "dataset"

CSV_PATH = DATASET_DIR / "all_zones_complete.csv"
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
    """Hämtar rådata och mergar in i masterfilen."""
    if start_date > end_date:
        print(
            f"Datasetet är redan uppdaterat t.o.m. {end_date} (nästa start vore {start_date})."
        )
        return

    print(f"Synkroniserar data: {start_date} -> {end_date}...")
    try:
        # 1. Hämta rådata och slå ihop elpriser + väder
        df_staged = fetch_and_stage_data(start_date, end_date)

        # 2. Skapa eller merga in i masterfilen
        append_to_master_dataset(df_staged, master_path=CSV_PATH)
        print("Data synkad och sparad framgångsrikt!")
    except Exception as e:
        print(f"Ett fel uppstod vid synkning ({start_date} till {end_date}): {e}")


def run_scheduled_sync():
    """Huvudfunktion som beräknar dynamiskt datumspann och anropar synken."""
    now = datetime.now()
    timestamp_str = now.strftime("%Y-%m-%d %H:%M:%S")
    print(f"\n[{timestamp_str}] Kör kontroll av dataset...")

    # Nord Pool publicerar nästa dygns priser runt kl. 13:00.
    # Om klockan är 13:00 eller senare hämtar vi t.o.m. imorgon, annars t.o.m. idag.
    if now.hour >= 13:
        target_end_date = (now + timedelta(days=1)).date().isoformat()
    else:
        target_end_date = now.date().isoformat()

    next_start_date = get_next_start_date(CSV_PATH, default_start="2025-01-01")
    sync_latest_data(next_start_date, target_end_date)


if __name__ == "__main__":
    scheduler = BlockingScheduler()

    # 1. Skarp körning: varje dag kl. 13:30 (efter Nord Pools prisauktion)
    scheduler.add_job(
        run_scheduled_sync,
        trigger="cron",
        hour=13,
        minute=30,
        id="daily_nordpool_sync",
        replace_existing=True,
    )

    # 2. Test/bevakning: kontrollerar var 10:e minut (avbryter direkt om allt redan finns)
    scheduler.add_job(
        run_scheduled_sync,
        trigger="interval",
        minutes=10,
        id="interval_check_sync",
        replace_existing=True,
    )

    print("==> Scheduler startad. Kör en initial kontroll direkt vid start...")
    run_scheduled_sync()

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        print("Scheduler avslutad.")
