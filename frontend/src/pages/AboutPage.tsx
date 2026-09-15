import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import EnergyAreaMap from "../components/EnergyAreaMap";
import EnergyAreaInfo from "../components/EnergyAreaInfo";

import { energyAreaInfo } from "../constants/energyAreaInfo";

import type { EnergyArea } from "../types/EnergyArea";

function AboutPage() {
  const [selectedArea, setSelectedArea] =
    useState<EnergyArea["code"] | null>(null);

  const selectedAreaInfo =
    selectedArea
      ? energyAreaInfo[selectedArea]
      : null;

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
            <p className="section-label">
              ELOMRÅDEN
            </p>

            <h2>
              Sverige är indelat i fyra elområden
            </h2>

            <p>
              Elområdena SE1, SE2, SE3 och SE4
              används för att hantera begränsningar
              i överföringen av el mellan olika delar
              av Sverige.
            </p>

            <div className="energy-area-layout">
              <div className="energy-area-map-column">
                <EnergyAreaMap
                  selectedArea={selectedArea}
                  onSelectArea={setSelectedArea}
                />
              </div>

              <div className="energy-area-info-column">
                {selectedAreaInfo ? (
                  <EnergyAreaInfo
                    energyArea={selectedAreaInfo}
                  />
                ) : (
                  <div className="energy-area-placeholder">
                    <span className="card-eyebrow">
                      VÄLJ ELOMRÅDE
                    </span>

                    <h3>
                      Utforska Sveriges
                      elområden
                    </h3>

                    <p>
                      Klicka på ett elområde
                      på kartan för att se
                      information om området
                      och vilka kraftslag som
                      har störst installerad
                      effekt.
                    </p>
                  </div>
                )}
              </div>
            </div>
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

            <div className="about-price-factors">
              <article className="about-price-factor">
                <span>
                  01
                </span>

                <h3>
                  Tillgång
                </h3>

                <p>
                  När mycket el produceras kan
                  tillgången öka och priserna
                  pressas ned.
                </p>
              </article>

              <article className="about-price-factor">
                <span>
                  02
                </span>

                <h3>
                  Efterfrågan
                </h3>

                <p>
                  Hög elanvändning ökar efterfrågan
                  och kan bidra till högre priser.
                </p>
              </article>

              <article className="about-price-factor">
                <span>
                  03
                </span>

                <h3>
                  Väder
                </h3>

                <p>
                  Temperatur, vind och nederbörd
                  påverkar både elanvändning och
                  produktion.
                </p>
              </article>

              <article className="about-price-factor">
                <span>
                  04
                </span>

                <h3>
                  Överföring
                </h3>

                <p>
                  Begränsningar i elnätet påverkar
                  hur mycket el som kan överföras
                  mellan olika områden.
                </p>
              </article>
            </div>
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

            <div className="about-forecast-process">
              <article className="about-forecast-step">
                <span>
                  01
                </span>

                <h3>
                  DATA
                </h3>
              </article>

              <article className="about-forecast-step">
                <span>
                  02
                </span>

                <h3>
                  MÖNSTER
                </h3>
              </article>

              <article className="about-forecast-step">
                <span>
                  03
                </span>

                <h3>
                  PROGNOS
                </h3>
              </article>
            </div>
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
                <span>
                  01
                </span>

                <strong>
                  Planera
                </strong>

                <span>
                  Se när priserna förväntas vara
                  lägre och planera elanvändningen
                  därefter.
                </span>
              </div>

              <div>
                <span>
                  02
                </span>

                <strong>
                  Förstå
                </strong>

                <span>
                  Få en tydligare bild av elpriset
                  och vad som påverkar utvecklingen
                  i ditt område.
                </span>
              </div>

              <div>
                <span>
                  03
                </span>

                <strong>
                  Agera
                </strong>

                <span>
                  Anpassa elanvändningen när
                  prognosen visar bättre
                  förutsättningar.
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