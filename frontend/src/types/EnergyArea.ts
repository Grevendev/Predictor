export interface EnergySource {
  name: string;
  installedCapacityMw: number;
}

export interface EnergyArea {
  code: "SE1" | "SE2" | "SE3" | "SE4";
  name: string;
  region: string;
  description: string;
  balanceDescription: string;
  dominantSources: EnergySource[];
}