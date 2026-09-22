
import type { WeatherDay } from "../../types/Weather";
import WeatherIcon from "./WeatherIcon";
import { useLanguage } from "../../context/LanguageContext";

interface WeatherCardProps {
  day: WeatherDay;
  isToday?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

function WeatherCard({
  day,
  isToday = false,
  isSelected = false,
  onClick,
}: WeatherCardProps) {
  const { translations } = useLanguage();

  const cardClassName = isSelected
    ? `;
w - full;
rounded - 2xl;
border;
p - 4;
text - left;
transition;
duration - 200;
focus: outline - none;
focus: ring - 2;
focus: ring - [var(--text)]
focus: ring - offset - 2;
focus: ring - offset - [var(--surface)]
border - [var(--text)]
bg - [var(--surface - soft)]
`
    : `;
w - full;
rounded - 2xl;
border;
p - 4;
text - left;
transition;
duration - 200;
focus: outline - none;
focus: ring - 2;
focus: ring - [var(--text)]
focus: ring - offset - 2;
focus: ring - offset - [var(--surface)]
border - [var(--border)]
bg - [var(--surface)]
hover: bg - [var(--surface - soft)]
`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cardClassName}
      aria-pressed={isSelected}
    >
      {/* Day */}
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
            {translations.weather.today}
          </span>
        )}
      </div>

      {/* Weather icon */}
      <div
        className="
          my-5
          flex
          justify-center
          text-[var(--text)]
        "
      >
        <WeatherIcon type={day.weatherType} size={40} />
      </div>

      {/* Temperature */}
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
          {translations.weather.lowest} {day.temperatureMin}°
        </div>
      </div>

      {/* Weather details */}
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
            <span
              className="
                block
                text-[var(--text-muted)]
              "
            >
              {translations.weather.rain}
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
            <span
              className="
                block
                text-[var(--text-muted)]
              "
            >
              {translations.weather.wind}
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
    </button>
  );
}

export default WeatherCard;
;
