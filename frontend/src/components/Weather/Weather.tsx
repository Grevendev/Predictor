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
      <div
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <span
            className="
              text-[0.7rem]
              font-semibold
              uppercase
              tracking-[0.14em]
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

        <div className="text-[var(--text)]">
          <WeatherIcon
            type={today.weatherType}
            size={44}
          />
        </div>
      </div>

      <div
        className="
          mb-7
          flex
          items-end
          justify-between
          gap-6
        "
      >
        <div>
          <div className="flex items-start">
            <span
              className="
                text-5xl
                font-semibold
                tracking-tight
                text-[var(--text)]
                sm:text-6xl
              "
            >
              {today.temperatureMax}°
            </span>
          </div>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {today.precipitationProbability}% risk för nederbörd
          </p>
        </div>

        <div className="text-right">
          <span className="text-sm text-[var(--text-muted)]">
            Lägst
          </span>

          <p className="text-xl font-medium text-[var(--text)]">
            {today.temperatureMin}°
          </p>
        </div>
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
    </section>
  );
}

export default Weather;