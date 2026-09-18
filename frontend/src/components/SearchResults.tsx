import { useEffect, useState, useRef } from "react";
import type { Prediction } from "../types/Prediction";
import type { WeatherDay } from "../types/Weather";

import { getEnergyArea } from "../utils/energyAreaUtils";
import EnergyAreaInfo from "./EnergyAreaInfo";
import PriceChart from "./PriceChart";
import CostSavingTips from "./CostSavingTips";
import Weather from "../components/Weather/Weather";
import { useLanguage } from "../context/LanguageContext";
import { getWeather } from "../services/weatherService";

interface SearchResultsProps {
  prediction: Prediction;
}

function SearchResults({ prediction }: SearchResultsProps) {
  const energyArea = getEnergyArea(prediction.energyArea);
  const { translations: t } = useLanguage();
  const resultsRef = useRef<HTMLElement | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<WeatherDay[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Scrolla mjukt ner så fort ett nytt resultat renderas
  useEffect(() => {
    const timer = setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [prediction]);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      setWeatherLoading(true);
      setWeatherError(null);

      try {
        const forecast = await getWeather(prediction.energyArea);

        if (!cancelled) {
          setWeatherForecast(forecast);
        }
      } catch (error) {
        if (!cancelled) {
          setWeatherForecast([]);

          setWeatherError(
            error instanceof Error
              ? error.message
              : "Kunde inte hämta väderdata."
          );
        }
      } finally {
        if (!cancelled) {
          setWeatherLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [prediction.energyArea]);

  return (
    <section
      ref={resultsRef}
      className="
        search-results
        mx-auto
        mt-[72px]
        scroll-mt-8
        w-[min(960px,100%)]
        max-[800px]:mt-[52px]
        max-[480px]:mt-[44px]
      "
      aria-label={t.results.title}
    >
      <div
        className="
          results-header
          mb-8
          flex
          items-end
          justify-between
          gap-6
          max-[700px]:items-start
          max-[700px]:flex-col
        "
      >
        <div>
          <span
            className="
              results-label
              mb-2
              block
              text-[0.68rem]
              font-bold
              tracking-[0.14em]
              text-[var(--text-muted)]
            "
          >
            {t.results.forecast}
          </span>

          <h2
            className="
              m-0
              text-[2rem]
              font-bold
              tracking-[-0.03em]
              text-[var(--text-strong)]
              max-[700px]:text-[1.7rem]
            "
          >
            {prediction.city}
          </h2>
        </div>

        {energyArea && (
          <div
            className="
              energy-area-badge
              flex
              items-center
              gap-3
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              py-2
              shadow-[var(--shadow)]
            "
          >
            <span
              className="
                text-[0.68rem]
                font-semibold
                tracking-[0.06em]
                text-[var(--text-muted)]
              "
            >
              {t.results.area}
            </span>

            <strong
              className="
                text-[0.8rem]
                font-bold
                tracking-[0.08em]
                text-[var(--text-strong)]
              "
            >
              {energyArea.code}
            </strong>
          </div>
        )}
      </div>

      {/* Energy area + price chart */}
      <div
        className="
          results-grid
          grid
          grid-cols-[1fr_1.6fr]
          gap-4
          max-[800px]:grid-cols-1
        "
      >
        {energyArea && (
          <div
            className="
              result-card
              energy-area-card
              min-h-[230px]
              min-w-0
              rounded-[20px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-[26px]
              shadow-[var(--shadow)]
              transition
              duration-200
              ease-in-out
              hover:-translate-y-0.5
              hover:shadow-[0_18px_40px_rgba(15,23,42,0.07),0_3px_10px_rgba(15,23,42,0.03)]
              max-[600px]:p-5
            "
          >
            <EnergyAreaInfo energyArea={energyArea} />
          </div>
        )}

        <div
          className="
            result-card
            chart-card
            min-w-0
            rounded-[20px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-[26px]
            shadow-[var(--shadow)]
            transition
            duration-200
            ease-in-out
            hover:-translate-y-0.5
            hover:shadow-[0_18px_40px_rgba(15,23,42,0.07),0_3px_10px_rgba(15,23,42,0.03)]
            max-[600px]:p-5
          "
        >
          <PriceChart predictions={prediction.predictions} />
        </div>
      </div>

      {/* Weather - full width */}
      <div
        className="
          result-card
          weather-card
          mt-4
          min-w-0
          overflow-hidden
          rounded-[20px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-[var(--shadow)]
          transition
          duration-200
          ease-in-out
          hover:-translate-y-0.5
          hover:shadow-[0_18px_40px_rgba(15,23,42,0.07),0_3px_10px_rgba(15,23,42,0.03)]
        "
      >
        {weatherLoading && (
          <div className="p-6 text-sm text-[var(--text-muted)]">
            Hämtar väderdata...
          </div>
        )}

        {!weatherLoading && weatherError && (
          <div className="p-6 text-sm text-[var(--text-muted)]">
            {weatherError}
          </div>
        )}

        {!weatherLoading &&
          !weatherError &&
          weatherForecast.length > 0 && (
            <Weather
              city={prediction.city}
              forecast={weatherForecast}
            />
          )}

        {!weatherLoading &&
          !weatherError &&
          weatherForecast.length === 0 && (
            <div className="p-6 text-sm text-[var(--text-muted)]">
              Ingen väderdata tillgänglig.
            </div>
          )}
      </div>

      {/* Cost saving tips - full width */}
      <div
        className="
          result-card
          tips-card
          mt-4
          min-w-0
          rounded-[20px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-[26px]
          shadow-[var(--shadow)]
          transition
          duration-200
          ease-in-out
          hover:-translate-y-0.5
          hover:shadow-[0_18px_40px_rgba(15,23,42,0.07),0_3px_10px_rgba(15,23,42,0.03)]
          max-[600px]:p-5
        "
      >
        <CostSavingTips />
      </div>
    </section>
  );
}

export default SearchResults;