import datetime
from apscheduler.schedulers.blocking import BlockingScheduler


def dummy_task():
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{now}] Dummy-jobb körs: Kontrollerar nya datapunkter... Allt OK!")


if __name__ == "__main__":
    scheduler = BlockingScheduler()

    # För test: Kör var 10:e minut (ändra till seconds=10 om du vill se det direkt i terminalen)
    scheduler.add_job(dummy_task, "interval", minutes=10, id="dummy_sync_job")

    print(
        "==> Dummy Scheduler startad! Körs var 10:e minut. Tryck Ctrl+C för att avbryta."
    )
    try:
        # Kör jobbet en gång direkt vid start så du slipper vänta 10 minuter
        dummy_task()
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        print("Scheduler stoppad.")
