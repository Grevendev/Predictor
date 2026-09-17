import type { WeatherDay } from "../../types/Weather";
import WeatherCard from "./WeatherCard";
import WeatherIcon from "./WeatherIcon";

interface WeatherProps {
  city: string;
  forecast: WeatherDay[];
}

function Weather({
  city,
  forecast,
}: WeatherProps) {
  const today = forecast[0];

  if (!today) {
    return null;
  }

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-5
        sm:p-7
      "
      aria-label="Väderprognos"
    >
      {/* Header */}
      <div
        className="
          mb-8
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <span
            className="
              text-[0.68rem]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[var(--text-muted)]
            "
          >
            Väder
          </span>

          <h2
            className="
              mt-1
              text-xl
              font-semibold
              tracking-tight
              text-[var(--text)]
              sm:text-2xl
            "
          >
            {city}
          </h2>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[var(--surface-soft)]
            text-[var(--text)]
          "
        >
          <WeatherIcon
            type={today.weatherType}
            size={30}
          />
        </div>
      </div>

      {/* Current weather */}
      <div
        className="
          mb-8
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface-soft)]
          p-5
          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Temperature */}
          <div>
            <span
              className="
                text-[0.68rem]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[var(--text-muted)]
              "
            >
              Idag
            </span>

            <div
              className="
                mt-1
                flex
                items-start
              "
            >
              <span
                className="
                  text-6xl
                  font-semibold
                  leading-none
                  tracking-[-0.04em]
                  text-[var(--text)]
                  sm:text-7xl
                "
              >
                {today.temperatureMax}°
              </span>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-[var(--text-muted)]
              "
            >
              Lägst {today.temperatureMin}°
            </p>
          </div>

          {/* Weather details */}
          <div
            className="
              grid
              grid-cols-2
              gap-x-8
              gap-y-4
              sm:min-w-[240px]
            "
          >
            <div>
              <span
                className="
                  text-xs
                  text-[var(--text-muted)]
                "
              >
                Nederbörd
              </span>

              <p
                className="
                  mt-1
                  text-lg
                  font-medium
                  text-[var(--text)]
                "
              >
                {today.precipitationMm} mm
              </p>
            </div>

            <div>
              <span
                className="
                  text-xs
                  text-[var(--text-muted)]
                "
              >
                Vind
              </span>

              <p
                className="
                  mt-1
                  text-lg
                  font-medium
                  text-[var(--text)]
                "
              >
                {today.windSpeedKmh} km/h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <div
          className="
            mb-3
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[0.68rem]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[var(--text-muted)]
            "
          >
            Prognos
          </span>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-2
            sm:grid-cols-3
            lg:grid-cols-5
          "
        >
          {forecast.map((day, index) => (
            <WeatherCard
              key={day.date}
              day={day}
              isToday={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Weather;