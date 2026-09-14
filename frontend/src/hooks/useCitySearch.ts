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
      const resultAPI = await fetchSpotCheck(city);
      console.log(resultAPI) // adderade en log för att arbeta vidare på att bryta bort mock data senare
      setPrediction(result);
    } catch (err: any) {
      setPrediction(null);

      // 1. Om backend skickade ett specifikt felmeddelande (t.ex. 404 eller 502):
      if (err.status === 404) {
        // "Kunde inte hitta någon svensk ort med namnet '...'"
        setError(err.message || `Hittade ingen svensk ort med namnet '${city}'.`);
      } else if (err.status === 502) {
        // Geokodningstjänsten svarade inte eller kastade fel
        setError("Kunde inte nå kart- och platstjänsten. Försök igen om en stund.");
      } else {
        // Nätverksavbrott eller server nere helt
        setError(err.message || "Nätverksfel – kontrollera din anslutning till servern.");
      }
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