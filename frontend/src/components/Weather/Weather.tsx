import { useState } from "react";
import type { WeatherDay } from "../../types/Weather";
import HourlyForecast from "./HourlyForecast";
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

  const [selectedDay, setSelectedDay] = useState<WeatherDay>(
    today,
  );

  if (!today) {
    return null;
  }

  return (
    <section
      className="
        min-w-0
        overflow-hidden
        p-5
        sm:p-6
      "
      aria-label="Väderprognos"
    >
      {/* Header */}
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <span
            className="
              text-[0.65rem]
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
              mt-0.5
              truncate
              text-lg
              font-semibold
              tracking-tight
              text-[var(--text)]
              sm:text-xl
            "
          >
            {city}
          </h2>
        </div>

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--surface-soft)]
            text-[var(--text)]
          "
        >
          <WeatherIcon
            type={selectedDay.weatherType}
            size={24}
          />
        </div>
      </div>

      {/* Selected day summary */}
      <div
        className="
          mb-5
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface-soft)]
          px-5
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            gap-5
            sm:gap-8
          "
        >
          <div className="text-center">
            <span
              className="
                text-[0.65rem]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[var(--text-muted)]
              "
            >
              {selectedDay.dayName}
            </span>

            <div
              className="
                mt-1
                flex
                justify-center
                text-[var(--text)]
              "
            >
              <WeatherIcon
                type={selectedDay.weatherType}
                size={36}
              />
            </div>
          </div>

          <div>
            <div
              className="
                text-4xl
                font-semibold
                leading-none
                tracking-[-0.04em]
                text-[var(--text)]
                sm:text-5xl
              "
            >
              {selectedDay.temperatureMax}°
            </div>

            <p
              className="
                mt-1
                text-xs
                text-[var(--text-muted)]
              "
            >
              Lägst {selectedDay.temperatureMin}°
            </p>
          </div>
        </div>

        {/* Selected day details */}
        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-4
            border-t
            border-[var(--border)]
            pt-3
          "
        >
          <div className="text-center">
            <span
              className="
                text-[0.7rem]
                text-[var(--text-muted)]
              "
            >
              Nederbörd
            </span>

            <p
              className="
                mt-0.5
                text-sm
                font-medium
                text-[var(--text)]
              "
            >
              {selectedDay.precipitationMm} mm
            </p>
          </div>

          <div className="text-center">
            <span
              className="
                text-[0.7rem]
                text-[var(--text-muted)]
              "
            >
              Vind
            </span>

            <p
              className="
                mt-0.5
                text-sm
                font-medium
                text-[var(--text)]
              "
            >
              {selectedDay.windSpeedKmh} km/h
            </p>
          </div>
        </div>
      </div>

      {/* Hourly forecast */}
      <div className="mb-5">
        <HourlyForecast
          forecast={selectedDay.hourlyForecast}
        />
      </div>

      {/* Weekly forecast */}
      <div>
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
            Veckans väder
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
          {forecast.map((day) => (
            <div
              key={day.date}
              className="
                w-[125px]
                shrink-0
                snap-start
                sm:w-[135px]
              "
            >
              <WeatherCard
                day={day}
                isToday={day.date === today.date}
                isSelected={day.date === selectedDay.date}
                onClick={() => setSelectedDay(day)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Weather;