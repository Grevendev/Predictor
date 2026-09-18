import { api } from "./api";
import type { WeatherDay, WeatherType } from "../types/Weather";

interface BackendWeatherHour {
  time: string;
  temperature: number;
  precipitation_mm: number;
  wind_speed_kmh: number;
  weather_type: string;
}

interface BackendWeatherDay {
  date: string;
  day_name: string;
  temperature_max: number;
  temperature_min: number;
  precipitation_mm: number;
  wind_speed_kmh: number;
  weather_type: string;
  hourly_forecast: BackendWeatherHour[];
}

interface BackendWeatherResponse {
  zone: string;
  forecast: BackendWeatherDay[];
}

function mapWeatherType(value: string): WeatherType {
  const validTypes: WeatherType[] = [
    "clear",
    "partlyCloudy",
    "cloudy",
    "rain",
    "heavyRain",
    "snow",
    "thunderstorm",
  ];

  if (validTypes.includes(value as WeatherType)) {
    return value as WeatherType;
  }

  return "cloudy";
}

function mapWeatherDay(day: BackendWeatherDay): WeatherDay {
  return {
    date: day.date,
    dayName: day.day_name,
    weatherType: mapWeatherType(day.weather_type),
    temperatureMax: day.temperature_max,
    temperatureMin: day.temperature_min,
    precipitationMm: day.precipitation_mm,
    windSpeedKmh: day.wind_speed_kmh,

    hourlyForecast: day.hourly_forecast.map((hour) => ({
      time: hour.time,
      temperature: hour.temperature,
      precipitationMm: hour.precipitation_mm,
      windSpeedKmh: hour.wind_speed_kmh,
      weatherType: mapWeatherType(hour.weather_type),
    })),
  };
}

export async function getWeather(zone: string): Promise<WeatherDay[]> {
  const data = await api.get<BackendWeatherResponse>(
    `/weather?zone=${encodeURIComponent(zone)}`
  );

  return data.forecast.map(mapWeatherDay);
}