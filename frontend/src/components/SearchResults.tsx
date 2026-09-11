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
    <section aria-label="Sökresultat">
      <h2>{prediction.city}</h2>

      <details>
        <summary>
          Visa information om elområdet
        </summary>

        {energyArea && (
          <EnergyAreaInfo
            energyArea={energyArea}
          />
        )}

        <PriceChart
          predictions={prediction.predictions}
        />

        <CostSavingTips />
      </details>
    </section>
  );
}

export default SearchResults;