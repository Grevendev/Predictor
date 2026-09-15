import type { PricePrediction } from "../types/Prediction";

interface PriceChartProps {
  predictions: PricePrediction[];
}

function PriceChart({ predictions }: PriceChartProps) {
  if (predictions.length === 0) {
    return (
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
          PRISPROGNOS
        </span>

        <p
          className="
            mt-4
            text-[0.95rem]
            leading-[1.65]
            text-[var(--text-muted)]
          "
        >
          Ingen prisprognos tillgänglig.
        </p>
      </div>
    );
  }

  const chartWidth = 800;
  const chartHeight = 280;

  const paddingLeft = 20;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 45;

  const chartInnerWidth =
    chartWidth -
    paddingLeft -
    paddingRight;

  const chartInnerHeight =
    chartHeight -
    paddingTop -
    paddingBottom;

  const prices = predictions.map(
    (prediction) => prediction.predictedPrice
  );

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const priceRange = Math.max(
    maxPrice - minPrice,
    1
  );

  const points = predictions.map(
    (prediction, index) => {
      const x =
        paddingLeft +
        (index /
          Math.max(
            predictions.length - 1,
            1
          )) *
        chartInnerWidth;

      const normalizedPrice =
        (prediction.predictedPrice -
          minPrice) /
        priceRange;

      const y =
        paddingTop +
        chartInnerHeight -
        normalizedPrice *
        chartInnerHeight;

      return {
        x,
        y,
        prediction
      };
    }
  );

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x}
      ${chartHeight - paddingBottom}
    L ${points[0].x}
      ${chartHeight - paddingBottom}
    Z
  `;

  return (
    <div className="price-chart-content">
      <div
        className="
          card-heading
          flex
          items-start
          justify-between
          gap-5
        "
      >
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
            PRISPROGNOS
          </span>

          <h3
            className="
              m-0
              mt-2
              text-[1.25rem]
              tracking-[-0.02em]
              text-[var(--text)]
            "
          >
            Förväntat elpris
          </h3>
        </div>

        <span
          className="
            chart-unit
            text-[0.8rem]
            text-[var(--text-subtle)]
          "
        >
          öre/kWh
        </span>
      </div>

      <div
        className="
          chart-summary
          mt-[22px]
          flex
          items-baseline
          gap-2.5
        "
      >
        <strong
          className="
            text-[2rem]
            leading-none
            tracking-[-0.04em]
            text-[var(--text-strong)]
          "
        >
          {Math.min(...prices).toFixed(1)}
        </strong>

        <span
          className="
            text-[0.8rem]
            text-[var(--text-subtle)]
          "
        >
          lägsta prognostiserade pris
        </span>
      </div>

      <div
        className="line-chart"
        role="img"
        aria-label="Graf över förutspådda elpriser"
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="priceAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopOpacity="0.18"
              />

              <stop
                offset="100%"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <line
            x1={paddingLeft}
            x2={chartWidth - paddingRight}
            y1={paddingTop}
            y2={paddingTop}
            className="chart-grid-line"
          />

          <line
            x1={paddingLeft}
            x2={chartWidth - paddingRight}
            y1={
              paddingTop +
              chartInnerHeight / 2
            }
            y2={
              paddingTop +
              chartInnerHeight / 2
            }
            className="chart-grid-line"
          />

          <line
            x1={paddingLeft}
            x2={chartWidth - paddingRight}
            y1={
              chartHeight -
              paddingBottom
            }
            y2={
              chartHeight -
              paddingBottom
            }
            className="chart-grid-line"
          />

          <path
            d={areaPath}
            className="chart-area"
          />

          <path
            d={linePath}
            className="chart-line"
          />

          {points.map((point) => (
            <g
              key={point.prediction.timestamp}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                className="chart-point"
              />

              <text
                x={point.x}
                y={chartHeight - 15}
                textAnchor="middle"
                className="chart-label"
              >
                {point.prediction.timestamp}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default PriceChart;