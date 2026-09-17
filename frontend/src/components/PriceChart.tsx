import { useState } from "react";

import type { PricePrediction } from "../types/Prediction";

import { useLanguage } from "../context/LanguageContext";

interface PriceChartProps {
  predictions: PricePrediction[];
}

function PriceChart({ predictions }: PriceChartProps) {
  const { translations: t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    "today" | "tomorrow" | "all"
  >("today");

  const [selectedPoint, setSelectedPoint] =
    useState<PricePrediction | null>(null);

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
          {t.results.priceForecast}
        </span>

        <p
          className="
            mt-4
            text-[0.95rem]
            leading-[1.65]
            text-[var(--text-muted)]
          "
        >
          {t.results.noPriceForecast}
        </p>
      </div>
    );
  }

  // Filter predictions based on the selected tab.
  const visiblePredictions = predictions.filter((prediction) => {
    if (activeTab === "all") {
      return true;
    }

    return prediction.day === activeTab;
  });

  const chartWidth = 760;
  const chartHeight = 270;
  const paddingLeft = 35;
  const paddingRight = 35;
  const paddingTop = 50;
  const paddingBottom = 40;

  const chartInnerWidth =
    chartWidth - paddingLeft - paddingRight;

  const chartInnerHeight =
    chartHeight - paddingTop - paddingBottom;

  const prices = visiblePredictions.map(
    (prediction) => prediction.predictedPrice
  );

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = Math.max(maxPrice - minPrice, 1);

  const points = visiblePredictions.map(
    (prediction, index) => {
      const x =
        visiblePredictions.length === 1
          ? paddingLeft + chartInnerWidth / 2
          : paddingLeft +
          (index /
            (visiblePredictions.length - 1)) *
          chartInnerWidth;

      const normalizedPrice =
        (prediction.predictedPrice - minPrice) /
        priceRange;

      const y =
        paddingTop +
        chartInnerHeight -
        normalizedPrice * chartInnerHeight;

      return {
        x,
        y,
        prediction,
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
    L ${points[points.length - 1]?.x ??
    paddingLeft
    } ${chartHeight - paddingBottom}
    L ${points[0]?.x ?? paddingLeft} ${chartHeight - paddingBottom
    }
    Z
  `;

  // Only consider future points when recommending a charging time.
  const futurePoints = points.filter(
    (point) => !point.prediction.isHistorical
  );

  // Prioritize future optimal points.
  const futureOptimalPoints = futurePoints.filter(
    (point) => point.prediction.isOptimal
  );

  const candidates =
    futureOptimalPoints.length > 0
      ? futureOptimalPoints
      : futurePoints.length > 0
        ? futurePoints
        : points;

  // Select the lowest price. If prices are equal,
  // the earlier point remains selected.
  const bestPointToCharge = candidates.reduce<
    (typeof points)[number] | null
  >((best, current) => {
    if (!best) {
      return current;
    }

    return current.prediction.predictedPrice <
      best.prediction.predictedPrice
      ? current
      : best;
  }, null);

  const activePointCoord = points.find(
    (point) =>
      point.prediction.raw_timestamp ===
      selectedPoint?.raw_timestamp
  );

  return (
    <div className="price-chart-content select-none">
      {/* Header, legend and tab buttons */}
      <div
        className="
          card-heading
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
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
            {t.results.priceForecast}
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
            {t.results.expectedPrice}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="
              mr-1
              hidden
              items-center
              gap-3
              text-[0.72rem]
              text-[var(--text-muted)]
              sm:flex
            "
          >
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" />
              <span>Optimal tid</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2563eb]" />
              <span>Nu</span>
            </div>
          </div>

          <div
            className="
              flex
              rounded-lg
              bg-[var(--surface-soft,rgba(0,0,0,0.05))]
              p-1
              text-xs
            "
          >
            <button
              type="button"
              className={`rounded-md px-2.5 py-1 font-medium transition ${activeTab === "today"
                ? "bg-[var(--surface)] text-[var(--text-strong)] shadow-sm"
                : "text-[var(--text-muted)]"
                }`}
              onClick={() => {
                setActiveTab("today");
                setSelectedPoint(null);
              }}
            >
              Idag
            </button>

            <button
              type="button"
              className={`rounded-md px-2.5 py-1 font-medium transition ${activeTab === "tomorrow"
                ? "bg-[var(--surface)] text-[var(--text-strong)] shadow-sm"
                : "text-[var(--text-muted)]"
                }`}
              onClick={() => {
                setActiveTab("tomorrow");
                setSelectedPoint(null);
              }}
            >
              Imorgon
            </button>

            <button
              type="button"
              className={`rounded-md px-2.5 py-1 font-medium transition ${activeTab === "all"
                ? "bg-[var(--surface)] text-[var(--text-strong)] shadow-sm"
                : "text-[var(--text-muted)]"
                }`}
              onClick={() => {
                setActiveTab("all");
                setSelectedPoint(null);
              }}
            >
              Alla
            </button>
          </div>
        </div>
      </div>

      {/* Price overview */}
      <div className="mt-3 flex items-baseline gap-2">
        <strong
          className="
            text-[2rem]
            leading-none
            tracking-[-0.04em]
            text-[var(--text-strong)]
          "
        >
          {selectedPoint
            ? selectedPoint.predictedPrice.toFixed(1)
            : minPrice.toFixed(1)}
        </strong>

        <span
          className="
            text-[0.8rem]
            text-[var(--text-subtle)]
          "
        >
          {selectedPoint
            ? `öre/kWh kl. ${selectedPoint.timestamp}`
            : t.results.lowestPredictedPrice}
        </span>
      </div>

      <div
        className="relative mt-2 overflow-x-auto"
        role="img"
        aria-label={t.results.chartAriaLabel}
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="
            h-auto
            w-full
            min-w-[500px]
            overflow-visible
          "
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
                stopColor="var(--accent, #3b82f6)"
                stopOpacity="0.22"
              />

              <stop
                offset="100%"
                stopColor="var(--accent, #3b82f6)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Horizontal guide lines */}
          <line
            x1={paddingLeft}
            x2={chartWidth - paddingRight}
            y1={paddingTop}
            y2={paddingTop}
            className="
              stroke-[var(--border)]
              stroke-dasharray-[4_4]
            "
          />

          <line
            x1={paddingLeft}
            x2={chartWidth - paddingRight}
            y1={chartHeight - paddingBottom}
            y2={chartHeight - paddingBottom}
            className="stroke-[var(--border)]"
          />

          <path
            d={areaPath}
            fill="url(#priceAreaGradient)"
          />

          <path
            d={linePath}
            fill="none"
            stroke="var(--accent, #3b82f6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertical line for selected point */}
          {activePointCoord && (
            <line
              x1={activePointCoord.x}
              x2={activePointCoord.x}
              y1={paddingTop}
              y2={chartHeight - paddingBottom}
              className="
                stroke-[var(--text-muted)]
                stroke-dasharray-[2_2]
              "
              strokeWidth="1.5"
            />
          )}

          {/* Data points */}
          {points.map((point, index) => {
            const {
              isOptimal,
              isCurrentHour,
              isHistorical,
              raw_timestamp,
              timestamp,
            } = point.prediction;

            const isSelected =
              selectedPoint?.raw_timestamp ===
              raw_timestamp;

            const step =
              activeTab === "all" ? 4 : 3;

            const showLabel =
              index % step === 0 ||
              isCurrentHour;

            let pointColor =
              "var(--accent, #3b82f6)";

            if (isCurrentHour) {
              pointColor = "#2563eb";
            } else if (isOptimal) {
              pointColor = "#10b981";
            } else if (isHistorical) {
              pointColor =
                "var(--text-subtle, #94a3b8)";
            }

            return (
              <g
                key={
                  raw_timestamp ||
                  `${timestamp}-${index}`
                }
                className="cursor-pointer"
                onClick={() =>
                  setSelectedPoint(
                    point.prediction
                  )
                }
              >
                {/* Hit area for mouse and touch */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="18"
                  fill="transparent"
                />

                {/* Aura for future optimal hours */}
                {isOptimal && !isHistorical && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isSelected ? 10 : 7}
                    fill="#10b981"
                    opacity="0.3"
                  />
                )}

                {/* Point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={
                    isSelected
                      ? 6.5
                      : isCurrentHour
                        ? 5.5
                        : 4
                  }
                  fill={pointColor}
                  stroke="var(--surface, #ffffff)"
                  strokeWidth={
                    isSelected ? "3" : "2"
                  }
                />

                {/* Time label */}
                {showLabel && (
                  <text
                    x={point.x}
                    y={chartHeight - 14}
                    textAnchor="middle"
                    fill={
                      isCurrentHour
                        ? "var(--text-strong)"
                        : "var(--text-muted)"
                    }
                    className={`text-[0.68rem] ${isCurrentHour
                      ? "font-bold"
                      : "font-normal"
                      }`}
                  >
                    {timestamp.replace(
                      "Imorgon ",
                      ""
                    )}
                  </text>
                )}
              </g>
            );
          })}

          {/* Indicator for the best remaining charging time */}
          {bestPointToCharge && (
            <g
              className="animate-bounce"
              style={{
                transformBox: "fill-box",
                transformOrigin:
                  "center bottom",
              }}
            >
              <rect
                x={bestPointToCharge.x - 36}
                y={bestPointToCharge.y - 34}
                width="72"
                height="18"
                rx="9"
                fill="#10b981"
                className="shadow-sm"
              />

              <text
                x={bestPointToCharge.x}
                y={bestPointToCharge.y - 22}
                textAnchor="middle"
                fill="#ffffff"
                className="
                  text-[0.58rem]
                  font-extrabold
                  tracking-wider
                "
              >
                LADDA HÄR
              </text>

              <path
                d={`
                  M ${bestPointToCharge.x} ${bestPointToCharge.y - 8
                  }
                  L ${bestPointToCharge.x - 4} ${bestPointToCharge.y - 14
                  }
                  L ${bestPointToCharge.x + 4} ${bestPointToCharge.y - 14
                  }
                  Z
                `}
                fill="#10b981"
              />
            </g>
          )}

          {/* Floating tooltip */}
          {activePointCoord && (
            <g
              transform={`
                translate(
                  ${Math.min(
                Math.max(
                  activePointCoord.x,
                  60
                ),
                chartWidth - 60
              )},
                  ${Math.max(
                activePointCoord.y - 45,
                20
              )}
                )
              `}
            >
              <rect
                x="-52"
                y="-18"
                width="104"
                height="32"
                rx="6"
                fill="var(--surface, #1e293b)"
                stroke="var(--border)"
                className="shadow-md"
              />

              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="var(--text-strong, #ffffff)"
                className="
                  text-[0.72rem]
                  font-bold
                "
              >
                {
                  activePointCoord.prediction
                    .predictedPrice
                }{" "}
                öre
              </text>

              <text
                x="0"
                y="10"
                textAnchor="middle"
                fill="var(--text-muted, #94a3b8)"
                className="text-[0.62rem]"
              >
                {
                  activePointCoord.prediction
                    .timestamp
                }
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default PriceChart;