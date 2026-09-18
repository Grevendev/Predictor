import type { WeeklyForecastResponse } from "../types/Prediction";

import { useLanguage } from "../context/LanguageContext";

interface WeeklyForecastChartProps {
  forecast: WeeklyForecastResponse;
}

const levelColors = {
  low: "#22c55e",
  medium: "#facc15",
  high: "#ef4444",
} as const;

function WeeklyForecastChart({ forecast }: WeeklyForecastChartProps) {
  const { language, translations: t } = useLanguage();

  if (!forecast?.days?.length) {
    return null;
  }

  const prices = forecast.days.map((day) => day.predicted_price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const chartMax = Math.max(maxPrice, minPrice + 10);

  return (
    <div
      className="
        weekly-forecast-card
        mt-4
        rounded-[20px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-[26px]
        shadow-[var(--shadow)]
        max-[600px]:p-5
      "
      aria-label="8-day forecast"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <span
            className="
              card-eyebrow
              text-[0.68rem]
              font-bold
              tracking-[0.14em]
              text-[var(--text-subtle)]
            "
          >
            {t.results.weeklyForecast.label}
          </span>
          <h3
            className="
              m-0
              mt-2
              text-[1.15rem]
              font-semibold
              tracking-[-0.02em]
              text-[var(--text)]
            "
          >
            {t.results.weeklyForecast.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-[0.68rem] text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            {t.results.weeklyForecast.low}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#facc15]" />
            {t.results.weeklyForecast.medium}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
            {t.results.weeklyForecast.high}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[640px] items-end gap-3">
          {forecast.days.map((day) => {
            const percentage =
              ((day.predicted_price - minPrice) /
                (chartMax - minPrice || 1)) *
              100;
            const label = new Intl.DateTimeFormat(language === "en" ? "en-US" : "sv-SE", {
              weekday: "short",
            }).format(new Date(`${day.date}T12:00:00`));

            return (
              <div key={day.date} className="flex min-w-[65px] flex-1 flex-col items-center gap-2">
                <span className="text-[0.7rem] font-medium text-[var(--text-muted)]">
                  {label}
                </span>
                <div className="flex h-32 w-full items-end justify-center rounded-t-lg bg-[var(--surface-soft)] px-1 py-1">
                  <div
                    className="w-full rounded-t-md border border-black/5"
                    style={{
                      height: `${Math.max(percentage, 8)}%`,
                      backgroundColor: levelColors[day.classification],
                    }}
                    title={`${label}: ${day.predicted_price.toFixed(1)} ${forecast.zone}`}
                  />
                </div>
                <span className="text-[0.7rem] font-medium text-[var(--text-muted)]">
                  {day.predicted_price.toFixed(0)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm leading-6 text-[var(--text)]">
        <strong className="font-semibold">
          {t.results.weeklyForecast.bestDays}
        </strong>
        <p className="mt-2 mb-0 text-[var(--text-muted)]">
          {forecast.recommendation.text}
        </p>
      </div>
    </div>
  );
}

export default WeeklyForecastChart;
