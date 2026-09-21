import { api } from "../services/api";
import type { Prediction } from "../types/Prediction";

export interface ZoneData {
    name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
    zone: string;
    zone_description: string;
}

export async function fetchSpotCheck(city: string): Promise<Prediction> {
    return api.get<Prediction>(`/spot-check?location=${encodeURIComponent(city)}`);
}