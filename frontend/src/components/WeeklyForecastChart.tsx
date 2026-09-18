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

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatWeekdayLabel(date: Date, language: "sv" | "en"): string {
  const formatted = new Intl.DateTimeFormat(
    language === "en" ? "en-US" : "sv-SE",
    {
      weekday: "long",
    },
  ).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatDayList(days: string[], conjunction: string): string {
  if (days.length < 2) {
    return days[0] ?? "";
  }

  if (days.length === 2) {
    return `${days[0]} ${conjunction} ${days[1]}`;
  }

  return `${days.slice(0, -1).join(", ")}${conjunction === "och" ? " och " : ", and "}${days.at(-1)}`;
}

function WeeklyForecastChart({ forecast }: WeeklyForecastChartProps) {
  const { language, translations: t } = useLanguage();

  if (!forecast?.days?.length) {
    return null;
  }

  const prices = forecast.days.map((day) => day.predicted_price);
  const maxPrice = Math.max(...prices);
  const chartMax = Math.max(maxPrice, 1);

  const bestDays = forecast.recommendation.best_days
    .map((bestDay) =>
      forecast.days.find((day) => {
        const forecastDate = parseLocalDate(day.date);
        const localizedWeekday = formatWeekdayLabel(forecastDate, language);
        return (
          day.day_name.toLocaleLowerCase() === bestDay.toLocaleLowerCase() ||
          localizedWeekday.toLocaleLowerCase() === bestDay.toLocaleLowerCase()
        );
      }),
    )
    .filter((day): day is (typeof forecast.days)[number] => day !== undefined);
  const recommendedWeekdays = bestDays.map((day) =>
    formatWeekdayLabel(parseLocalDate(day.date), language),
  );
  const recommendationTemplate =
    recommendedWeekdays.length === 1
      ? t.results.weeklyForecast.recommendationSingle
      : t.results.weeklyForecast.recommendation;
  const recommendationText = recommendationTemplate.replace(
    "{days}",
    formatDayList(recommendedWeekdays, t.results.weeklyForecast.and),
  );

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
      aria-label={t.results.weeklyForecast.label}
    >
      <div className="mb-5">
        <div className="flex items-center justify-between gap-3 max-[600px]:items-start max-[600px]:flex-col">
          <div>
            <span className="card-eyebrow text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-subtle)]">
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
          <div className="flex flex-wrap items-center justify-end gap-3 text-[0.68rem] text-[var(--text-muted)] max-[600px]:justify-start">
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
      </div>

      <p className="mb-4 text-sm font-medium text-[var(--text-muted)]">
        {t.results.weeklyForecast.dailyAveragePrice}
      </p>

      <div className="overflow-x-auto">
        <div className="flex min-w-[640px] items-end gap-3">
          {forecast.days.map((day) => {
            const percentage = (day.predicted_price / chartMax) * 100;
            const forecastDate = parseLocalDate(day.date);
            const isToday =
              getLocalDateKey(forecastDate) === getLocalDateKey(new Date());
            const weekdayLabel = formatWeekdayLabel(forecastDate, language);
            const label = isToday ? t.results.today : weekdayLabel;

            return (
              <div key={day.date} className="flex min-w-[65px] flex-1 flex-col items-center gap-2">
                <span className="text-[0.7rem] font-medium text-[var(--text-muted)]">
                  {label}
                </span>
                <div className="flex h-32 w-full items-end justify-center rounded-t-lg bg-[var(--surface-soft)] px-1 py-1">
                  <div
                    className="w-full rounded-t-md border border-black/5"
                    style={{
                      height: `${percentage}%`,
                      backgroundColor: levelColors[day.classification],
                    }}
                    title={`${label}: ${day.predicted_price} ${t.results.weeklyForecast.priceUnit}`}
                  />
                </div>
                <span className="text-[0.7rem] font-medium text-[var(--text-muted)]">
                  {day.predicted_price}{" "}
                  {t.results.weeklyForecast.priceUnit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--text)]">
        <h4 className="m-0 font-semibold">{t.results.weeklyForecast.priceLevels}</h4>
        <p className="mb-0 mt-2 leading-6">{t.results.weeklyForecast.levelExplanation}</p>
      </div>

      <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-sm leading-6 text-[var(--text)]">
        <strong className="font-semibold">
          {t.results.weeklyForecast.bestDays}
        </strong>
        <p className="mt-2 mb-0 text-[var(--text-muted)]">
          {recommendationText}
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-[var(--text-muted)]">
        {t.results.weeklyForecast.forecastDisclaimer}
      </p>
    </div>
  );
}

export default WeeklyForecastChart;
