import type { WeatherHour } from "../../types/Weather";
import WeatherIcon from "./WeatherIcon";

interface HourlyForecastProps {
  forecast: WeatherHour[];
}

function HourlyForecast({
  forecast,
}: HourlyForecastProps) {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <section aria-label="Timprognos">
      <div className="mb-2">
        <span
          className="
            text-[0.65rem]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[var(--text-muted)]
          "
        >
          Timprognos
        </span>
      </div>

      <div
        className="
          flex
          gap-2
          overflow-x-auto
          pb-1
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-[var(--border)]
          snap-x
          snap-mandatory
        "
      >
        {forecast.map((hour) => {
          const hasRain = hour.precipitationProbability > 0;

          return (
            <div
              key={hour.time}
              className="
                w-[88px]
                shrink-0
                snap-start
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface-soft)]
                px-3
                py-3
                text-center
              "
            >
              <span
                className="
                  text-xs
                  font-medium
                  text-[var(--text-muted)]
                "
              >
                {hour.time}
              </span>

              <div
                className="
                  my-2
                  flex
                  justify-center
                  text-[var(--text)]
                "
              >
                <WeatherIcon
                  type={hour.weatherType}
                  size={24}
                />
              </div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-[var(--text)]
                "
              >
                {hour.temperature}°
              </p>

              <p
                className={`
                  mt-1
                  text-[0.65rem]
                  ${hasRain
                    ? "font-semibold text-[var(--text)]"
                    : "text-[var(--text-muted)]"
                  }
                `}
              >
                {hour.precipitationProbability}%
              </p>

              {hour.precipitationMm > 0 && (
                <p
                  className="
                    mt-0.5
                    text-[0.6rem]
                    text-[var(--text-muted)]
                  "
                >
                  {hour.precipitationMm} mm
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;