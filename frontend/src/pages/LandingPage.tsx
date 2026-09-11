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
        <section>
          <h1>
            Vill du veta när det är som billigast
            att använda elen i ditt elområde?
          </h1>

          <SearchForm onSearch={searchCity} />

          {isLoading && (
            <p>
              Hämtar information...
            </p>
          )}

          {error && (
            <p role="alert">
              {error}
            </p>
          )}

          {prediction && (
            <SearchResults prediction={prediction} />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;