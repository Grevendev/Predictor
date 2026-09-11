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

      <p>
        {energyArea.description}
      </p>
    </div>
  );
}

export default EnergyAreaInfo;