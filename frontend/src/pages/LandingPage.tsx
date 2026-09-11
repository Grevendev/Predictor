import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Footer from "../components/Footer";
import useCitySearch from "../hooks/useCitySearch";

function LandingPage() {
  const {
    prediction,
    isLoading,
    error,
    searchCity
  } = useCitySearch();

  return (
    <>
      <Header />

      <main>
        <section className="hero-section">
          <div className="hero-background-glow" />

          <div className="hero-content">
            <span className="hero-eyebrow">
              INTELLIGENT ELPROGNOS
            </span>

            <h1>
              Använd elen när
              <span> priset är lägst.</span>
            </h1>

            <p className="hero-description">
              Sök efter din stad och få en prognos
              för när det är smartast att använda
              elen i ditt elområde.
            </p>

            <SearchForm onSearch={searchCity} />

            <p className="hero-disclaimer">
              Prognoser baseras på data och
              maskininlärning.
            </p>
          </div>

          {isLoading && (
            <p className="loading-message">
              Hämtar information...
            </p>
          )}

          {error && (
            <p
              className="error-message"
              role="alert"
            >
              {error}
            </p>
          )}

          {prediction && (
            <SearchResults
              prediction={prediction}
            />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;