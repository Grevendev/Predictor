export type WeatherType =
  | "clear"
  | "partlyCloudy"
  | "cloudy"
  | "rain"
  | "heavyRain"
  | "snow"
  | "thunderstorm";

export interface WeatherDay {
  date: string;
  dayName: string;
  weatherType: WeatherType;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbability: number;
}