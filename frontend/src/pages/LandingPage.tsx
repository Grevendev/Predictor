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
        <section
          className="
            relative
            overflow-hidden
            bg-[var(--background)]
            px-5
            pb-[120px]
            pt-[110px]
            transition-colors
            duration-250

            max-[700px]:pt-[72px]

            max-[600px]:px-4
            max-[600px]:pb-[90px]

            max-[480px]:px-3
            max-[480px]:pb-[72px]
            max-[480px]:pt-[56px]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-180px]
              h-[500px]
              w-[700px]
              -translate-x-1/2
              bg-[radial-gradient(circle,rgba(148,163,184,0.14),rgba(148,163,184,0)_70%)]
            "
          />

          <div
            className="
              relative
              z-[1]
              mx-auto
              w-full
              max-w-[1000px]
              text-center
            "
          >
            <span
              className="
                mb-[22px]
                inline-flex
                text-[0.72rem]
                font-[800]
                tracking-[0.16em]
                text-[var(--text-subtle)]

                max-[480px]:mb-[18px]
                max-[480px]:text-[0.65rem]
              "
            >
              INTELLIGENT ELPROGNOS
            </span>

            <h1
              className="
                mx-auto
                max-w-[850px]
                text-[clamp(3rem,8vw,6.5rem)]
                font-[850]
                leading-[0.96]
                tracking-[-0.065em]
                text-[var(--text-strong)]

                max-[700px]:text-[clamp(3rem,15vw,4.5rem)]

                max-[480px]:text-[3rem]
              "
            >
              Använd elen när
              <span className="block text-[var(--text-muted)]">
                {" "}
                priset är lägst.
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-8
                max-w-[620px]
                text-[1.08rem]
                leading-[1.7]
                text-[var(--text-muted)]

                max-[700px]:text-[0.98rem]

                max-[480px]:mt-6
                max-[480px]:text-[0.94rem]
                max-[480px]:leading-[1.65]
              "
            >
              Sök efter din stad och få en prognos
              för när det är smartast att använda
              elen i ditt elområde.
            </p>

            <div
              className="
                mt-10

                max-[480px]:mt-[30px]
              "
            >
              <SearchForm onSearch={searchCity} />
            </div>

            <p
              className="
                mt-4
                text-[0.75rem]
                text-[var(--text-faint)]
              "
            >
              Prognoser baseras på data och
              maskininlärning.
            </p>
          </div>

          {isLoading && (
            <p
              className="
      mt-6
      text-center
      text-[var(--text-subtle)]
    "
            >
              Hämtar information...
            </p>
          )}

          {error && (
            <p
              className="
      mx-auto
      mt-5
      w-full
      max-w-[680px]
      rounded-xl
      border
      border-[#e5d7d7]
      bg-[#fffafa]
      px-[18px]
      py-[14px]
      text-center
      text-[#8b3a3a]
      dark:border-[#563b3b]
      dark:bg-[#211618]
      dark:text-[#e5a8a8]
    "
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