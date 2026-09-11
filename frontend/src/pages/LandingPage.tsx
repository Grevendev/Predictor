import { useState } from "react";

import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import Footer from "../components/Footer";

function LandingPage() {
  const [searchedCity, setSearchedCity] = useState("");

  function handleCitySearch(city: string) {
    setSearchedCity(city);
  }

  return (
    <>
      <Header />

      <main>
        <section>
          <h1>
            Vill du veta när det är som billigast
            att använda elen i ditt elområde?
          </h1>

          <SearchForm onSearch={handleCitySearch} />

          {searchedCity && (
            <p>
              Du sökte efter: {searchedCity}
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
;
