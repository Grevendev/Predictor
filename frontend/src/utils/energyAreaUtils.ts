import type { EnergyArea } from "../types/EnergyArea";

const energyAreas: EnergyArea[] = [
  {
    code: "SE1",
    name: "Norra Sverige",
    description: "Elområde SE1 omfattar norra Sverige."
  },
  {
    code: "SE2",
    name: "Norra Mellansverige",
    description: "Elområde SE2 omfattar norra och centrala delar av Sverige."
  },
  {
    code: "SE3",
    name: "Södra Mellansverige",
    description: "Elområde SE3 omfattar bland annat Stockholm och Göteborg."
  },
  {
    code: "SE4",
    name: "Södra Sverige",
    description: "Elområde SE4 omfattar södra Sverige."
  }
];

export function getEnergyArea(
  energyAreaCode: string
): EnergyArea | null {
  return (
    energyAreas.find(
      (area) => area.code === energyAreaCode
    ) ?? null
  );
}