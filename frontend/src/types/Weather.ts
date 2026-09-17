export type WeatherType =
  | "clear"
  | "partlyCloudy"
  | "cloudy"
  | "rain"
  | "heavyRain"
  | "snow"
  | "thunderstorm";

export interface WeatherHour {
  time: string;
  temperature: number;
  precipitationProbability: number;
  precipitationMm: number;
  windSpeedKmh: number;
  weatherType: WeatherType;
}

export interface WeatherDay {
  date: string;
  dayName: string;
  weatherType: WeatherType;
  temperatureMax: number;
  temperatureMin: number;
  precipitationMm: number;
  windSpeedKmh: number;
  hourlyForecast: WeatherHour[];
}