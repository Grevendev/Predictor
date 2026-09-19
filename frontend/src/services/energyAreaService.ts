// const API_BASE_URL = "http://localhost:8000";

// export type Position = [
//   longitude: number,
//   latitude: number
// ];

// export interface PolygonGeometry {
//   type: "Polygon";
//   coordinates: Position[][];
// }

// export interface MultiPolygonGeometry {
//   type: "MultiPolygon";
//   coordinates: Position[][][];
// }

// export type EnergyAreaGeometry =
//   | PolygonGeometry
//   | MultiPolygonGeometry;

// export interface EnergyAreaFeature {
//   type: "Feature";
//   properties: {
//     energy_area: string;
//   };
//   geometry: EnergyAreaGeometry;
// }

// export interface EnergyAreaGeoJson {
//   type: "FeatureCollection";
//   features: EnergyAreaFeature[];
// }

// export async function getEnergyAreas(): Promise<EnergyAreaGeoJson> {
//   const response = await fetch(
//     `${API_BASE_URL}/api/v1/energy-areas`
//   );

//   if (!response.ok) {
//     throw new Error(
//       "Kunde inte hämta elområden."
//     );
//   }

//   const data: EnergyAreaGeoJson =
//     await response.json();

//   return data;
// }

import { api } from "./api";

export type Position = [longitude: number, latitude: number];

export interface PolygonGeometry {
  type: "Polygon";
  coordinates: Position[][];
}

export interface MultiPolygonGeometry {
  type: "MultiPolygon";
  coordinates: Position[][][];
}

export type EnergyAreaGeometry = PolygonGeometry | MultiPolygonGeometry;

export interface EnergyAreaFeature {
  type: "Feature";
  properties: {
    energy_area: string;
  };
  geometry: EnergyAreaGeometry;
}

export interface EnergyAreaGeoJson {
  type: "FeatureCollection";
  features: EnergyAreaFeature[];
}

export async function getEnergyAreas(): Promise<EnergyAreaGeoJson> {
  return api.get<EnergyAreaGeoJson>("/energy-areas");
}