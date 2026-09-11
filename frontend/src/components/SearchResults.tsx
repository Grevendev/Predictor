interface SearchResultsProps {
  city: string;
}

function SearchResults({ city }: SearchResultsProps) {
  return (
    <section aria-label="Sökresultat">
      <h2>{city}</h2>

      <details>
        <summary>
          Visa information om elområdet
        </summary>

        <div>
          <h3>Elområde</h3>
          <p>
            Elområde kommer att visas här.
          </p>
        </div>

        <div>
          <h3>Elpriser</h3>
          <p>
            Prediktioner från ML-modellen kommer
            att visas här.
          </p>
        </div>

        <div>
          <h3>Tips för att minska elkostnader</h3>
          <p>
            Rekommendationer kommer att visas här.
          </p>
        </div>
      </details>
    </section>
  );
}

export default SearchResults;
;
