import Header from "../components/Header";
import Footer from "../components/Footer";
import EnergyAreaMap from "../components/EnergyAreaMap";

function AboutPage() {
  return (
    <>
      <Header />

      <main className="about-page">
        <section className="about-hero">
          <p className="section-label">
            OM PREDICTOR
          </p>

          <h1>
            Förstå elpriset.
            <br />
            Använd elen smartare.
          </h1>

          <p className="about-intro">
            Predictor hjälper dig att förstå hur
            elpriser kan utvecklas över tid och
            vilket elområde du tillhör.
          </p>
        </section>

        <section className="about-section">
          <div className="about-section-content">
            <span className="section-label">
              ELOMRÅDEN
            </span>

            <h2>
              Sverige är indelat i fyra elområden
            </h2>

            <p>
              Elområdena SE1, SE2, SE3 och SE4
              används för att hantera begränsningar
              i överföringen av el mellan olika delar
              av Sverige.
            </p>

            <EnergyAreaMap />
          </div>
        </section>

        <section className="about-section about-section-alt">
          <div className="about-section-content">
            <p className="section-label">
              ELPRISET
            </p>

            <h2>
              Varför förändras elpriset?
            </h2>

            <p>
              Elpriset påverkas av flera olika
              faktorer. Tillgång och efterfrågan,
              väderförhållanden, elproduktion och
              överföringskapacitet mellan olika
              delar av elsystemet kan alla påverka
              priset.
            </p>

            <p>
              Därför kan priset variera både över
              tid och mellan olika delar av Sverige.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-content">
            <p className="section-label">
              PROGNOSER
            </p>

            <h2>
              Vad är en elprisprognos?
            </h2>

            <p>
              En elprisprognos är en uppskattning
              av hur elpriset kan utvecklas under
              kommande timmar eller perioder.
            </p>

            <p>
              Predictor använder data och
              maskininlärning för att identifiera
              mönster i historiska och aktuella
              data och skapa prognoser för framtida
              elpriser.
            </p>
          </div>
        </section>

        <section className="about-section about-section-highlight">
          <div className="about-section-content">
            <p className="section-label">
              VARFÖR PREDICTOR?
            </p>

            <h2>
              Från prognos till beslut
            </h2>

            <p>
              Målet är inte bara att visa vad elen
              kostar. Predictor ska göra det enklare
              att förstå när det kan vara smartare
              att använda mycket el.
            </p>

            <div className="about-benefits">
              <div>
                <strong>Planera</strong>
                <span>
                  Se när priserna förväntas vara
                  lägre.
                </span>
              </div>

              <div>
                <strong>Förstå</strong>
                <span>
                  Få en tydligare bild av
                  elpriset i ditt område.
                </span>
              </div>

              <div>
                <strong>Agera</strong>
                <span>
                  Anpassa din elanvändning efter
                  prognosen.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-disclaimer">
          <p>
            Prognoser är uppskattningar och kan
            skilja sig från det faktiska elpriset.
            Predictor är ett beslutsstöd och ingen
            garanti för framtida priser.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutPage;
;
