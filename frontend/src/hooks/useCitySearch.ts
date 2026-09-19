import { useState } from "react";
import type { Prediction } from "../types/Prediction";
import { fetchSpotCheck } from "../utils/datafetch";

interface UseCitySearchResult {
  prediction: Prediction | null;
  isLoading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
}

export function useCitySearch(): UseCitySearchResult {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function searchCity(city: string): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      const data: Prediction = await fetchSpotCheck(city);
      setPrediction(data);
    } catch (err: any) {
      setPrediction(null);

      if (err.status === 400) {
        setError(err.message || "Ange en giltig svensk tätort.");
      } else if (err.status === 404) {
        setError(err.message || `Hittade ingen svensk ort med namnet '${city}'.`);
      } else if (err.status === 502) {
        setError("Kunde inte nå kart- och platstjänsten. Försök igen om en stund.");
      } else {
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
    searchCity,
  };
}

export default useCitySearch;