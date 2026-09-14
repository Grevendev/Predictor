import { useState } from "react";

import { getMockPrediction } from "../services/mockPredictionService";
import type { Prediction } from "../types/Prediction";
import { fetchSpotCheck } from "../utils/datafetch";
interface UseCitySearchResult {
  prediction: Prediction | null;
  isLoading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
}

function useCitySearch(): UseCitySearchResult {
  const [prediction, setPrediction] =
    useState<Prediction | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function searchCity(
    city: string
  ): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      const result = getMockPrediction(city);
      console.log(result)
      const result1 = await fetchSpotCheck(city);
      // console.log(result1, result)

      setPrediction(result);
    } catch {
      setPrediction(null);
      setError(
        "Kunde inte hämta information för staden."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    prediction,
    isLoading,
    error,
    searchCity
  };
}

export default useCitySearch;