import type { EnergyArea } from "../types/EnergyArea";

interface EnergyAreaInfoProps {
  energyArea: EnergyArea;
}

function EnergyAreaInfo({
  energyArea
}: EnergyAreaInfoProps) {
  return (
    <div>
      <h3>Elområde</h3>

      <p>
        {energyArea.code}
      </p>

      <p>
        {energyArea.name}
      </p>

      <p>
        {energyArea.description}
      </p>
    </div>
  );
}

export default EnergyAreaInfo;