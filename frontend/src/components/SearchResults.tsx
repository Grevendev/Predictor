import type { Prediction } from "../types/Prediction";

import { getEnergyArea } from "../utils/energyAreaUtils";

import EnergyAreaInfo from "./EnergyAreaInfo";

import PriceChart from "./PriceChart";

import CostSavingTips from "./CostSavingTips";

interface SearchResultsProps {
  prediction: Prediction;
}

function SearchResults({ prediction }: SearchResultsProps) {
  const energyArea = getEnergyArea(prediction.energyArea);

  return (
    <section
      className="
        search-results
        mx-auto
        mt-[72px]
        w-[min(960px,100%)]
        max-[800px]:mt-[52px]
        max-[480px]:mt-[44px]
      "
      aria-label="Sökresultat"
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
            ELPROGNOS
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
              Elområde
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

        <div
          className="
            result-card
            tips-card
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
      </div>
    </section>
  );
}

export default SearchResults;