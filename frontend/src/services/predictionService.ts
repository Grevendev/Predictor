import type { Prediction } from "../types/Prediction";

const API_BASE_URL = "http://localhost:8000";

export async function getPrediction(
  city: string
): Promise<Prediction> {
  const response = await fetch(
    `${API_BASE_URL}/prediction?city=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta prediktionen.");
  }

  const data: Prediction = await response.json();

  return data;
}