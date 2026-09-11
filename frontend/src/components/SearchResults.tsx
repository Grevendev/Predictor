import type { Prediction } from "../types/Prediction";

interface SearchResultsProps {
  prediction: Prediction;
}

function SearchResults({
  prediction
}: SearchResultsProps) {
  return (
    <section aria-label="Sökresultat">
      <h2>{prediction.city}</h2>

      <details>
        <summary>
          Visa information om elområdet
        </summary>

        <div>
          <h3>Elområde</h3>

          <p>
            {prediction.energyArea}
          </p>
        </div>

        <div>
          <h3>Billigaste tid</h3>

          <p>
            {prediction.predictedCheapestHour}
          </p>
        </div>

        <div>
          <h3>Förutspått elpris</h3>

          <p>
            {prediction.predictedPrice} öre/kWh
          </p>
        </div>

        <div>
          <h3>Tips för att minska elkostnader</h3>

          <p>
            Använd större elförbrukare under
            de timmar då elpriset förväntas vara lägre.
          </p>
        </div>
      </details>
    </section>
  );
}

export default SearchResults;