import type { City } from "../types/City";

const cities: City[] = [
  {
    name: "Malmö",
    energyArea: "SE4"
  },
  {
    name: "Lund",
    energyArea: "SE4"
  },
  {
    name: "Helsingborg",
    energyArea: "SE4"
  },
  {
    name: "Göteborg",
    energyArea: "SE3"
  },
  {
    name: "Stockholm",
    energyArea: "SE3"
  },
  {
    name: "Uppsala",
    energyArea: "SE3"
  },
  {
    name: "Sundsvall",
    energyArea: "SE2"
  },
  {
    name: "Umeå",
    energyArea: "SE1"
  },
  {
    name: "Luleå",
    energyArea: "SE1"
  }
];

export function findCity(
  cityName: string
): City | null {
  const normalizedCity = cityName
    .trim()
    .toLowerCase();

  return (
    cities.find(
      (city) =>
        city.name.toLowerCase() === normalizedCity
    ) ?? null
  );
}