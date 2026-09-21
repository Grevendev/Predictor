import { api } from "./api";
import type { WeeklyForecastResponse } from "../types/Prediction";

export async function getWeeklyForecast(
  zone: string,
): Promise<WeeklyForecastResponse> {
  return api.get<WeeklyForecastResponse>(
    `/predictions/weekly-forecast?zone=${encodeURIComponent(zone)}`,
  );
}