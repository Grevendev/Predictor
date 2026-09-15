import type { EnergyArea } from "../types/EnergyArea";

interface EnergyAreaInfoProps {
  energyArea: EnergyArea;
}

function EnergyAreaInfo({
  energyArea
}: EnergyAreaInfoProps) {
  return (
    <div className="energy-area-content">
      <div className="card-heading">
        <span className="card-eyebrow">
          DITT ELOMRÅDE
        </span>

        <span className="area-code">
          {energyArea.code}
        </span>
      </div>

      <h3>
        {energyArea.name}
      </h3>

      <span className="energy-area-region">
        {energyArea.region}
      </span>

      <p>
        {energyArea.description}
      </p>

      <p>
        {energyArea.balanceDescription}
      </p>

      <div className="energy-area-sources">
        <span className="card-eyebrow">
          INSTALLERAD EFFEKT
        </span>

        <div className="energy-area-source-list">
          {energyArea.dominantSources.map(
            (source) => (
              <div
                className="energy-area-source"
                key={source.name}
              >
                <span>
                  {source.name}
                </span>

                <strong>
                  {source.installedCapacityMw.toLocaleString(
                    "sv-SE"
                  )}{" "}
                  MW
                </strong>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default EnergyAreaInfo;