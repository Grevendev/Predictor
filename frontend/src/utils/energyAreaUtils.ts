import { energyAreaInfo } from "../constants/energyAreaInfo";
import type { EnergyArea } from "../types/EnergyArea";

export function getEnergyArea(
  energyAreaCode: string
): EnergyArea | null {
  if (
    energyAreaCode !== "SE1" &&
    energyAreaCode !== "SE2" &&
    energyAreaCode !== "SE3" &&
    energyAreaCode !== "SE4"
  ) {
    return null;
  }

  return energyAreaInfo[energyAreaCode];
}