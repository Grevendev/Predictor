import type { EnergyArea } from "../types/EnergyArea";

export const energyAreaInfo: Record<
  EnergyArea["code"],
  EnergyArea
> = {
  SE1: {
    code: "SE1",
    name: "Luleå",
    region: "Norra Sverige",
    description:
      "SE1 omfattar den nordligaste delen av Sverige och har en stor elproduktion i förhållande till den lokala elanvändningen.",
    balanceDescription:
      "Området har ett stort produktionsöverskott och är särskilt präglat av vattenkraft och vindkraft.",
    dominantSources: [
      {
        name: "Vattenkraft",
        installedCapacityMw: 5198,
      },
      {
        name: "Vindkraft",
        installedCapacityMw: 3144,
      },
    ],
  },

  SE2: {
    code: "SE2",
    name: "Sundsvall",
    region: "Norra och mellersta Sverige",
    description:
      "SE2 sträcker sig över stora delar av norra och mellersta Sverige och är ett av landets viktigaste produktionsområden.",
    balanceDescription:
      "Området har ett stort produktionsöverskott och har mycket både vattenkraft och vindkraft.",
    dominantSources: [
      {
        name: "Vattenkraft",
        installedCapacityMw: 8103,
      },
      {
        name: "Vindkraft",
        installedCapacityMw: 7957,
      },
    ],
  },

  SE3: {
    code: "SE3",
    name: "Stockholm",
    region: "Mellersta Sverige",
    description:
      "SE3 omfattar bland annat Stockholm och stora delar av mellersta Sverige och är Sveriges största elområde sett till elanvändning.",
    balanceDescription:
      "Kärnkraft står för den största installerade effekten, följt av vindkraft, vattenkraft och solkraft.",
    dominantSources: [
      {
        name: "Kärnkraft",
        installedCapacityMw: 7012,
      },
      {
        name: "Vindkraft",
        installedCapacityMw: 4555,
      },
      {
        name: "Vattenkraft",
        installedCapacityMw: 2627,
      },
      {
        name: "Solkraft",
        installedCapacityMw: 2578,
      },
    ],
  },

  SE4: {
    code: "SE4",
    name: "Malmö",
    region: "Södra Sverige",
    description:
      "SE4 omfattar södra Sverige och är det svenska elområde som ligger närmast kontinentala Europa.",
    balanceDescription:
      "Området har normalt ett större elbehov än den lokala produktionen och är därför beroende av överföring från andra områden och import.",
    dominantSources: [
      {
        name: "Vindkraft",
        installedCapacityMw: 2687,
      },
      {
        name: "Solkraft",
        installedCapacityMw: 2652,
      },
    ],
  },
};