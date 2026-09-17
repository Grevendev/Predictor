
import type { EnergyArea } from "../types/EnergyArea";
import { useLanguage } from "../context/LanguageContext";

interface EnergyAreaInfoProps {
  energyArea: EnergyArea;
}

function EnergyAreaInfo({ energyArea }: EnergyAreaInfoProps) {
  const { translations: t } = useLanguage();

  const translatedArea = t.about.energyAreas.areas[energyArea.code];

  const translatedSources: Record<string, string> = {
    Vattenkraft: t.about.energyAreas.sources.hydropower,
    Vindkraft: t.about.energyAreas.sources.windPower,
    Kärnkraft: t.about.energyAreas.sources.nuclearPower,
    Solkraft: t.about.energyAreas.sources.solarPower,
  };

  return (
    <div
      className="
        energy-area-content
        flex
        h-full
        flex-col
        justify-between
      "
    >
      <div
        className="
          card-heading
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <span
          className="
            card-eyebrow
            text-[0.68rem]
            font-bold
            tracking-[0.14em]
            text-[var(--text-subtle)]
          "
        >
          {t.results.yourArea}
        </span>

        <span
          className="
            area-code
            inline-flex
            h-[34px]
            min-w-[52px]
            items-center
            justify-center
            rounded-[9px]
            bg-[var(--surface-soft)]
            px-2
            text-[0.8rem]
            font-[750]
            text-[var(--text)]
          "
        >
          {energyArea.code}
        </span>
      </div>

      <h3
        className="
          m-0
          mt-6
          text-[1.25rem]
          tracking-[-0.02em]
          text-[var(--text)]
        "
      >
        {translatedArea.name}
      </h3>

      <span
        className="
          energy-area-region
          mt-2
          block
          text-[0.85rem]
          text-[var(--text-muted)]
        "
      >
        {translatedArea.region}
      </span>

      <div className="mt-[18px] max-w-[300px]">
        <p
          className="
            m-0
            text-[0.95rem]
            leading-[1.65]
            text-[var(--text-muted)]
          "
        >
          {translatedArea.description}
        </p>

        <p
          className="
            mt-4
            text-[0.95rem]
            leading-[1.65]
            text-[var(--text-muted)]
          "
        >
          {translatedArea.balanceDescription}
        </p>
      </div>

      <div
        className="
          energy-area-sources
          mt-8
          border-t
          border-[var(--border)]
          pt-6
        "
      >
        <span
          className="
            card-eyebrow
            text-[0.68rem]
            font-bold
            tracking-[0.14em]
            text-[var(--text-subtle)]
          "
        >
          {t.results.installedCapacity}
        </span>

        <div
          className="
            energy-area-source-list
            mt-[14px]
            flex
            flex-col
            gap-3
          "
        >
          {energyArea.dominantSources.map((source) => (
            <div
              className="
      energy-area-source
      flex
      items-center
      justify-between
      gap-5
      border-b
      border-[var(--border)]
      py-[14px]
      last:border-b-0
    "
              key={source.name}
            >
              <span
                className="
        text-[0.9rem]
        text-[var(--text-muted)]
      "
              >
                {translatedSources[source.name] ?? source.name}
              </span>

              <strong
                className="
        text-[0.9rem]
        text-[var(--text)]
      "
              >
                {source.installedCapacityMw.toLocaleString("sv-SE")} MW
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnergyAreaInfo;
;
