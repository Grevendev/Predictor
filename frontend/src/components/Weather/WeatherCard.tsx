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
        flex
        min-w-[120px]
        flex-1
        flex-col
        rounded-2xl
        border
        p-4
        transition
        duration-200
        ${isToday
          ? "border-[var(--text)] bg-[var(--surface-soft)]"
          : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)]"
        }
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="
            text-[0.72rem]
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
              rounded-full
              bg-[var(--text)]
              px-2
              py-1
              text-[0.6rem]
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
          my-5
          flex
          justify-center
          text-[var(--text)]
        "
      >
        <WeatherIcon
          type={day.weatherType}
          size={44}
        />
      </div>

      <div className="flex items-baseline justify-center gap-2">
        <span
          className="
            text-xl
            font-semibold
            tracking-tight
            text-[var(--text)]
          "
        >
          {day.temperatureMax}°
        </span>

        <span
          className="
            text-sm
            text-[var(--text-muted)]
          "
        >
          {day.temperatureMin}°
        </span>
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          justify-center
          gap-3
          border-t
          border-[var(--border)]
          pt-3
          text-xs
          text-[var(--text-muted)]
        "
      >
        <span>
          {day.precipitationMm} mm
        </span>

        <span
          className="
            h-1
            w-1
            rounded-full
            bg-[var(--text-muted)]
          "
          aria-hidden="true"
        />

        <span>
          {day.windSpeedKmh} km/h
        </span>
      </div>
    </article>
  );
}

export default WeatherCard;