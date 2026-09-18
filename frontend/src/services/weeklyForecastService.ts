import type {
  WeeklyForecastResponse,
} from "../types/Prediction";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function getWeeklyForecast(
  zone: string,
): Promise<WeeklyForecastResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/predictions/weekly-forecast?zone=${encodeURIComponent(
      zone,
    )}`,
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta veckoprognosen.");
  }

  return (await response.json()) as WeeklyForecastResponse;
}
