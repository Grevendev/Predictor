import type { WeatherDay } from "../types/Weather";

export const mockWeather: WeatherDay[] = [
  {
    date: "2026-09-17",
    dayName: "Idag",
    weatherType: "clear",
    temperatureMax: 18,
    temperatureMin: 11,
    precipitationProbability: 5,
  },
  {
    date: "2026-09-18",
    dayName: "Fre",
    weatherType: "rain",
    temperatureMax: 16,
    temperatureMin: 10,
    precipitationProbability: 70,
  },
  {
    date: "2026-09-19",
    dayName: "Lör",
    weatherType: "cloudy",
    temperatureMax: 15,
    temperatureMin: 9,
    precipitationProbability: 35,
  },
  {
    date: "2026-09-20",
    dayName: "Sön",
    weatherType: "partlyCloudy",
    temperatureMax: 19,
    temperatureMin: 12,
    precipitationProbability: 20,
  },
  {
    date: "2026-09-21",
    dayName: "Mån",
    weatherType: "heavyRain",
    temperatureMax: 14,
    temperatureMin: 9,
    precipitationProbability: 85,
  },
];