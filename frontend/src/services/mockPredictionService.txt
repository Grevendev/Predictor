import type { Prediction } from "../types/Prediction";

export function getMockPrediction(
  city: string
): Prediction {
  return {
    city,
    energyArea: "SE4",
    predictions: [
      {
        timestamp: "08:00",
        predictedPrice: 72.4
      },
      {
        timestamp: "09:00",
        predictedPrice: 68.2
      },
      {
        timestamp: "10:00",
        predictedPrice: 61.7
      },
      {
        timestamp: "11:00",
        predictedPrice: 55.3
      },
      {
        timestamp: "12:00",
        predictedPrice: 51.8
      },
      {
        timestamp: "13:00",
        predictedPrice: 49.2
      },
      {
        timestamp: "14:00",
        predictedPrice: 52.7
      },
      {
        timestamp: "15:00",
        predictedPrice: 58.9
      },
      {
        timestamp: "16:00",
        predictedPrice: 67.4
      },
      {
        timestamp: "17:00",
        predictedPrice: 78.6
      },
      {
        timestamp: "18:00",
        predictedPrice: 82.1
      },
      {
        timestamp: "19:00",
        predictedPrice: 75.8
      }
    ]
  };
}