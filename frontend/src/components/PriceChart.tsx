import type { PricePrediction } from "../types/Prediction";

interface PriceChartProps {
  predictions: PricePrediction[];
}

function PriceChart({
  predictions
}: PriceChartProps) {
  return (
    <div>
      <h3>Förutspådda elpriser</h3>

      <ul>
        {predictions.map((prediction) => (
          <li key={prediction.timestamp}>
            <span>
              {prediction.timestamp}
            </span>

            {" – "}

            <span>
              {prediction.predictedPrice.toFixed(2)}
              {" öre/kWh"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceChart;