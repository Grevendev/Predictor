export interface ZoneDetail {
  code: "SE1" | "SE2" | "SE3" | "SE4";
  name: string;
  description: string;
}

export interface PricePrediction {
  timestamp: string;
  raw_timestamp: string;
  predictedPrice: number;
  isHistorical: boolean;
  isCurrentHour: boolean;
  isOptimal: boolean;
  day: "today" | "tomorrow";
}

export interface Prediction {
  name: string;
  city: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  energyArea: "SE1" | "SE2" | "SE3" | "SE4";
  zone: ZoneDetail;
  unit: string;
  has_tomorrow_data: boolean;
  current_price: number;
  is_now_optimal: boolean;
  lowest_price: number;
  lowest_price_time: string;
  predictions: PricePrediction[];
}