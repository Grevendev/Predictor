import type { PricePrediction } from "../types/Prediction";

interface PriceChartProps {
  predictions: PricePrediction[];
}

function PriceChart({
  predictions
}: PriceChartProps) {
  if (predictions.length === 0) {
    return (
      <div>
        <span className="card-eyebrow">
          PRISPROGNOS
        </span>

        <p>
          Ingen prisprognos tillgänglig.
        </p>
      </div>
    );
  }

  const maxPrice = Math.max(
    ...predictions.map(
      (prediction) => prediction.predictedPrice
    )
  );

  const minPrice = Math.min(
    ...predictions.map(
      (prediction) => prediction.predictedPrice
    )
  );

  const priceRange = Math.max(
    maxPrice - minPrice,
    1
  );

  return (
    <div className="price-chart-content">
      <div className="card-heading">
        <div>
          <span className="card-eyebrow">
            PRISPROGNOS
          </span>

          <h3>
            Förväntat elpris
          </h3>
        </div>

        <span className="chart-unit">
          öre/kWh
        </span>
      </div>

      <div
        className="price-chart"
        role="img"
        aria-label="Graf över förutspådda elpriser"
      >
        {predictions.map((prediction) => {
          const normalizedHeight =
            ((prediction.predictedPrice - minPrice) /
              priceRange) *
            70 +
            15;

          return (
            <div
              className="chart-column"
              key={prediction.timestamp}
            >
              <div className="chart-value">
                {prediction.predictedPrice.toFixed(0)}
              </div>

              <div className="chart-bar-wrapper">
                <div
                  className="chart-bar"
                  style={{
                    height: `${normalizedHeight}%`
                  }}
                />
              </div>

              <span className="chart-time">
                {prediction.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PriceChart;