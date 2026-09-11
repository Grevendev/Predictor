import type { Prediction } from "../types/Prediction";

import { getEnergyArea } from "../utils/energyAreaUtils";

import EnergyAreaInfo from "./EnergyAreaInfo";
import PriceChart from "./PriceChart";
import CostSavingTips from "./CostSavingTips";

interface SearchResultsProps {
  prediction: Prediction;
}

function SearchResults({
  prediction
}: SearchResultsProps) {
  const energyArea = getEnergyArea(
    prediction.energyArea
  );

  return (
    <section
      className="search-results"
      aria-label="Sökresultat"
    >
      <div className="results-header">
        <div>
          <span className="results-label">
            ELPROGNOS
          </span>

          <h2>{prediction.city}</h2>
        </div>

        {energyArea && (
          <div className="energy-area-badge">
            <span>
              Elområde
            </span>

            <strong>
              {energyArea.code}
            </strong>
          </div>
        )}
      </div>

      <div className="results-grid">
        {energyArea && (
          <div className="result-card energy-area-card">
            <EnergyAreaInfo
              energyArea={energyArea}
            />
          </div>
        )}

        <div className="result-card chart-card">
          <PriceChart
            predictions={prediction.predictions}
          />
        </div>

        <div className="result-card tips-card">
          <CostSavingTips />
        </div>
      </div>
    </section>
  );
}

export default SearchResults;