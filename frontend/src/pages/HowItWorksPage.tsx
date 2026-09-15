import Header from "../components/Header";
import Footer from "../components/Footer";
import "../components/HowItWorksPage.css";

function HowItWorksPage() {
  return (
    <>
      <Header />

      <main className="how-it-works-page">
        <section className="how-it-works-hero">
          <p className="section-label">
            SÅ FUNGERAR DET
          </p>

          <h1>
            Från din stad
            <br />
            till en prognos.
          </h1>

          <p className="how-it-works-intro">
            Predictor kopplar ihop din stad med rätt
            elområde, analyserar relevanta data och
            använder maskininlärning för att uppskatta
            hur elpriset kan utvecklas.
          </p>

          <div className="how-it-works-flow">
            <div className="how-it-works-flow-item">
              <span>01</span>
              <strong>STAD</strong>
            </div>

            <span className="how-it-works-arrow">→</span>

            <div className="how-it-works-flow-item">
              <span>02</span>
              <strong>ELOMRÅDE</strong>
            </div>

            <span className="how-it-works-arrow">→</span>

            <div className="how-it-works-flow-item">
              <span>03</span>
              <strong>DATA</strong>
            </div>

            <span className="how-it-works-arrow">→</span>

            <div className="how-it-works-flow-item">
              <span>04</span>
              <strong>MODELL</strong>
            </div>

            <span className="how-it-works-arrow">→</span>

            <div className="how-it-works-flow-item">
              <span>05</span>
              <strong>PROGNOS</strong>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <div className="how-it-works-section-content">
            <p className="section-label">
              01 — ELOMRÅDE
            </p>

            <h2>
              Så hittar Predictor ditt elområde
            </h2>

            <p>
              Din stad används för att identifiera
              vilket av Sveriges fyra elområden du
              tillhör. Elområdet är viktigt eftersom
              elpriset kan skilja sig mellan olika
              delar av Sverige.
            </p>

            <div className="how-it-works-example">
              <div>
                <span>STAD</span>
                <strong>Malmö</strong>
              </div>

              <span className="how-it-works-example-arrow">
                →
              </span>

              <div>
                <span>ELOMRÅDE</span>
                <strong>SE4</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works-section how-it-works-section-alt">
          <div className="how-it-works-section-content">
            <p className="section-label">
              02 — DATA
            </p>

            <h2>
              Vilken data används?
            </h2>

            <p>
              För att kunna hitta mönster i elpriset
              behöver modellen information om både
              marknaden och de faktorer som påverkar
              produktion och elanvändning.
            </p>

            <div className="how-it-works-data-grid">
              <article className="how-it-works-data-card">
                <span>01</span>
                <h3>ELPRIS</h3>
                <p>
                  Historiska elpriser används för
                  att förstå hur priset har
                  utvecklats över tid.
                </p>
              </article>

              <article className="how-it-works-data-card">
                <span>02</span>
                <h3>VÄDER</h3>
                <p>
                  Temperatur, vind och nederbörd
                  kan påverka både produktion
                  och elanvändning.
                </p>
              </article>

              <article className="how-it-works-data-card">
                <span>03</span>
                <h3>PRODUKTION</h3>
                <p>
                  Information om exempelvis
                  vattenkraft, vindkraft,
                  kärnkraft och solkraft ger
                  modellen mer kontext.
                </p>
              </article>

              <article className="how-it-works-data-card">
                <span>04</span>
                <h3>TID</h3>
                <p>
                  Timme, veckodag och andra
                  tidsmönster kan hjälpa modellen
                  att identifiera återkommande
                  variationer.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <div className="how-it-works-section-content">
            <p className="section-label">
              03 — MASKININLÄRNING
            </p>

            <h2>
              Från data till mönster
            </h2>

            <p>
              Rådata behöver först bearbetas så att
              modellen kan använda informationen.
              Därefter kan relevanta egenskaper
              användas för att träna modellen.
            </p>

            <div className="how-it-works-process">
              <article className="how-it-works-process-step">
                <span>01</span>
                <strong>DATA</strong>
                <p>
                  Historiska observationer och
                  relevanta variabler.
                </p>
              </article>

              <span className="how-it-works-process-arrow">
                →
              </span>

              <article className="how-it-works-process-step">
                <span>02</span>
                <strong>PREPROCESSING</strong>
                <p>
                  Data struktureras och förbereds
                  för modellen.
                </p>
              </article>

              <span className="how-it-works-process-arrow">
                →
              </span>

              <article className="how-it-works-process-step">
                <span>03</span>
                <strong>MODELL</strong>
                <p>
                  Maskininlärningen tränas på
                  historiska mönster.
                </p>
              </article>

              <span className="how-it-works-process-arrow">
                →
              </span>

              <article className="how-it-works-process-step">
                <span>04</span>
                <strong>MÖNSTER</strong>
                <p>
                  Modellen lär sig samband som
                  kan användas för nya prognoser.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="how-it-works-section how-it-works-section-alt">
          <div className="how-it-works-section-content">
            <p className="section-label">
              04 — PROGNOS
            </p>

            <h2>
              Från mönster till prognos
            </h2>

            <p>
              När modellen har tränats kan den
              använda aktuell information för att
              uppskatta framtida elpriser.
            </p>

            <div className="how-it-works-forecast">
              <div className="how-it-works-forecast-header">
                <div>
                  <span>PROGNOS</span>
                  <strong>SE4</strong>
                </div>

                <div>
                  <span>ENHET</span>
                  <strong>öre/kWh</strong>
                </div>
              </div>

              <div className="how-it-works-forecast-list">
                <div>
                  <span>08:00</span>
                  <strong>42</strong>
                </div>

                <div>
                  <span>09:00</span>
                  <strong>38</strong>
                </div>

                <div>
                  <span>10:00</span>
                  <strong>34</strong>
                </div>

                <div>
                  <span>11:00</span>
                  <strong>31</strong>
                </div>

                <div>
                  <span>12:00</span>
                  <strong>29</strong>
                </div>
              </div>
            </div>

            <p className="how-it-works-note">
              Exemplet ovan är illustrativt. Den
              faktiska prognosen kommer från
              Predictors tränade modell.
            </p>
          </div>
        </section>

        <section className="how-it-works-section">
          <div className="how-it-works-section-content">
            <p className="section-label">
              05 — TOLKNING
            </p>

            <h2>
              Hur ska du tolka prognosen?
            </h2>

            <div className="how-it-works-interpretation">
              <div>
                <span>PROGNOS</span>
                <strong>≈ 31 öre/kWh</strong>
              </div>

              <p>
                Prognosen ska ses som en uppskattning
                av det framtida elpriset. Den visar
                en förväntad utveckling, inte ett
                garanterat pris.
              </p>
            </div>
          </div>
        </section>

        <section className="how-it-works-section how-it-works-section-highlight">
          <div className="how-it-works-section-content">
            <p className="section-label">
              06 — BESLUT
            </p>

            <h2>
              Från prognos till beslut
            </h2>

            <p>
              Syftet med Predictor är att göra
              prognosen användbar. När du förstår
              hur priset kan utvecklas blir det
              lättare att planera elanvändningen.
            </p>

            <div className="how-it-works-decisions">
              <article>
                <span>01</span>
                <strong>PLANERA</strong>
                <p>
                  Identifiera timmar då priset
                  förväntas vara lägre.
                </p>
              </article>

              <article>
                <span>02</span>
                <strong>FÖRSTÅ</strong>
                <p>
                  Se hur elpriset kan variera
                  över tid och mellan områden.
                </p>
              </article>

              <article>
                <span>03</span>
                <strong>AGERA</strong>
                <p>
                  Anpassa elanvändningen när
                  prognosen ger bättre
                  förutsättningar.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <div className="how-it-works-section-content">
            <p className="section-label">
              07 — OSÄKERHET
            </p>

            <h2>
              Varför kan prognosen ha fel?
            </h2>

            <p>
              Elmarknaden påverkas av många faktorer
              och alla framtida händelser går inte att
              förutse. Därför kommer en prognos alltid
              att innehålla en viss osäkerhet.
            </p>

            <div className="how-it-works-uncertainty-grid">
              <article>
                <span>01</span>
                <strong>VÄDER</strong>
                <p>
                  Vädret kan utvecklas annorlunda
                  än förväntat.
                </p>
              </article>

              <article>
                <span>02</span>
                <strong>EFTERFRÅGAN</strong>
                <p>
                  Elanvändningen kan förändras
                  snabbt.
                </p>
              </article>

              <article>
                <span>03</span>
                <strong>PRODUKTION</strong>
                <p>
                  Driftstörningar eller förändrad
                  produktion kan påverka priset.
                </p>
              </article>

              <article>
                <span>04</span>
                <strong>ELNÄT</strong>
                <p>
                  Begränsningar i överföringen
                  kan förändra marknadsläget.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="how-it-works-section how-it-works-section-alt">
          <div className="how-it-works-section-content">
            <p className="section-label">
              08 — FÖR DIG SOM VILL VETA MER
            </p>

            <h2>
              Från rådata till maskininlärning
            </h2>

            <p>
              Bakom Predictor finns en teknisk
              pipeline där data hämtas, bearbetas
              och används för att träna
              maskininlärningsmodeller.
            </p>

            <div className="how-it-works-technical-flow">
              <div>
                <span>01</span>
                <strong>DATA</strong>
              </div>

              <div>
                <span>02</span>
                <strong>PREPROCESSING</strong>
              </div>

              <div>
                <span>03</span>
                <strong>FEATURES</strong>
              </div>

              <div>
                <span>04</span>
                <strong>TRÄNING</strong>
              </div>

              <div>
                <span>05</span>
                <strong>VALIDERING</strong>
              </div>

              <div>
                <span>06</span>
                <strong>PROGNOS</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works-cta">
          <p className="section-label">
            REDO?
          </p>

          <h2>
            Testa Predictor
          </h2>

          <p>
            Sök efter din stad och se prognosen för
            ditt elområde.
          </p>

          <a
            className="how-it-works-cta-link"
            href="/"
          >
            TESTA PREDICTOR →
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HowItWorksPage;