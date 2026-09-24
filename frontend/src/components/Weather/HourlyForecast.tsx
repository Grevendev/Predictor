import type { WeatherHour } from "../../types/Weather";
import WeatherIcon from "./WeatherIcon";
import { useLanguage } from "../../context/LanguageContext";

interface HourlyForecastProps {
  forecast: WeatherHour[];
}

function HourlyForecast({ forecast }: HourlyForecastProps) {
  const { translations } = useLanguage();

  if (forecast.length === 0) {
    return null;
  }

  const rainyHours = forecast.filter(
    (hour) => hour.precipitationMm > 0,
  );

  const highestRainfall = forecast.reduce(
    (highest, hour) =>
      hour.precipitationMm > highest.precipitationMm
        ? hour
        : highest,
    forecast[0],
  );

  const firstRainHour = rainyHours[0];
  const lastRainHour = rainyHours[rainyHours.length - 1];

  const hasRain = rainyHours.length > 0;

  return (
    <section aria-label={translations.weather.hourlyForecast}>
      {/* Section title */}
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
          {translations.weather.hourlyForecast}
        </span>
      </div>

      {/* Rain summary */}
      {hasRain ? (
        <div
          className="
            mb-3
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface-soft)]
            px-3
            py-2.5
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-x-4
              gap-y-1
            "
          >
            <p className="text-xs text-[var(--text-muted)]">
              {translations.weather.rain}{" "}
              <span className="font-medium text-[var(--text)]">
                {firstRainHour.time}–{lastRainHour.time}
              </span>
            </p>

            <p className="text-xs text-[var(--text-muted)]">
              {translations.weather.highestRainfall}{" "}
              <span className="font-medium text-[var(--text)]">
                {highestRainfall.time} ·{" "}
                {highestRainfall.precipitationMm} mm
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div
          className="
            mb-3
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface-soft)]
            px-3
            py-2.5
          "
        >
          <p className="text-xs text-[var(--text-muted)]">
            {translations.weather.noPrecipitation}
          </p>
        </div>
      )}

      {/* Hourly cards */}
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
          const hourHasRain = hour.precipitationMm > 0;

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
              {/* Time */}
              <span
                className="
                  text-xs
                  font-medium
                  text-[var(--text-muted)]
                "
              >
                {hour.time}
              </span>

              {/* Weather icon */}
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

              {/* Temperature */}
              <p
                className="
                  text-sm
                  font-semibold
                  text-[var(--text)]
                "
              >
                {hour.temperature}°
              </p>

              {/* Precipitation */}
              <p
                className={
                  hourHasRain
                    ? "mt-1 text-[0.65rem] font-semibold text-[var(--text)]"
                    : "mt-1 text-[0.65rem] text-[var(--text-muted)]"
                }
              >
                {hourHasRain
                  ? `${hour.precipitationMm} mm`
                  : "0 mm"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;
;
