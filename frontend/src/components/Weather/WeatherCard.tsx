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
        min-w-[92px]
        flex-1
        flex-col
        items-center
        rounded-2xl
        border
        px-3
        py-4
        transition
        duration-200
        ${isToday
          ? "border-[var(--text)] bg-[var(--surface-soft)]"
          : "border-[var(--border)] bg-[var(--surface)]"
        }
      `}
    >
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

      <div
        className="
          my-4
          text-[var(--text)]
        "
      >
        <WeatherIcon
          type={day.weatherType}
          size={42}
        />
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-[var(--text)]">
          {day.temperatureMax}°
        </span>

        <span className="text-sm text-[var(--text-muted)]">
          {day.temperatureMin}°
        </span>
      </div>

      <span className="mt-2 text-xs text-[var(--text-muted)]">
        {day.precipitationProbability}%
      </span>
    </article>
  );
}

export default WeatherCard;