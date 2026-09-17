import type { WeatherDay } from "../../types/Weather";
import WeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
  day: WeatherDay;
  isToday?: boolean;
}

function WeatherCard({
  day,
  isToday = false,
}: WeatherCardProps) {
  return (
    <article
      className={`
        min-w-0
        rounded-2xl
        border
        p-3
        transition
        duration-200
        sm:p-4
        ${isToday
          ? "border-[var(--text)] bg-[var(--surface-soft)]"
          : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)]"
        }
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="
            truncate
            text-[0.68rem]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[var(--text-muted)]
          "
        >
          {day.dayName}
        </span>

        {isToday && (
          <span
            className="
              shrink-0
              rounded-full
              bg-[var(--text)]
              px-2
              py-1
              text-[0.55rem]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[var(--surface)]
            "
          >
            Idag
          </span>
        )}
      </div>

      <div
        className="
          my-4
          flex
          justify-center
          text-[var(--text)]
          sm:my-5
        "
      >
        <WeatherIcon
          type={day.weatherType}
          size={40}
        />
      </div>

      <div className="text-center">
        <div
          className="
            text-xl
            font-semibold
            tracking-tight
            text-[var(--text)]
          "
        >
          {day.temperatureMax}°
        </div>

        <div
          className="
            mt-1
            text-sm
            text-[var(--text-muted)]
          "
        >
          Lägst {day.temperatureMin}°
        </div>
      </div>

      <div
        className="
          mt-4
          border-t
          border-[var(--border)]
          pt-3
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            text-xs
          "
        >
          <div>
            <span className="block text-[var(--text-muted)]">
              Regn
            </span>

            <span
              className="
                mt-1
                block
                font-medium
                text-[var(--text)]
              "
            >
              {day.precipitationMm} mm
            </span>
          </div>

          <div className="text-right">
            <span className="block text-[var(--text-muted)]">
              Vind
            </span>

            <span
              className="
                mt-1
                block
                font-medium
                text-[var(--text)]
              "
            >
              {day.windSpeedKmh} km/h
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;