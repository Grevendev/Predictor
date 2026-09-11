export interface PricePrediction {
  timestamp: string;
  predictedPrice: number;
}

export interface Prediction {
  city: string;
  energyArea: string;
  predictions: PricePrediction[];
}