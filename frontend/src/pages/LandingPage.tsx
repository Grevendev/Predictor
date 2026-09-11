import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <Header />

      <main>
        <section>
          <h1>
            Vill du veta när det är som billigast
            att använda elen i ditt elområde?
          </h1>

          <SearchForm />

          <SearchResults />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;