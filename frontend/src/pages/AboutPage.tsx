
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import EnergyAreaMap from "../components/EnergyAreaMap";
import EnergyAreaInfo from "../components/EnergyAreaInfo";

import { energyAreaInfo } from "../constants/energyAreaInfo";

import type { EnergyArea } from "../types/EnergyArea";

import { useLanguage } from "../context/LanguageContext";

function AboutPage() {
  const { translations: t } = useLanguage();

  const [selectedArea, setSelectedArea] =
    useState<EnergyArea["code"] | null>(null);

  const selectedAreaInfo =
    selectedArea
      ? energyAreaInfo[selectedArea]
      : null;

  const priceFactors = [
    {
      number: "01",
      title: t.about.price.factors.supply.title,
      description:
        t.about.price.factors.supply.description
    },
    {
      number: "02",
      title: t.about.price.factors.demand.title,
      description:
        t.about.price.factors.demand.description
    },
    {
      number: "03",
      title: t.about.price.factors.weather.title,
      description:
        t.about.price.factors.weather.description
    },
    {
      number: "04",
      title:
        t.about.price.factors.transmission.title,
      description:
        t.about.price.factors.transmission.description
    }
  ];

  const forecastSteps = [
    {
      number: "01",
      title: t.about.forecasts.process.data
    },
    {
      number: "02",
      title: t.about.forecasts.process.patterns
    },
    {
      number: "03",
      title: t.about.forecasts.process.forecast
    }
  ];

  const benefits = [
    {
      number: "01",
      title:
        t.about.whyPredictor.benefits.plan.title,
      description:
        t.about.whyPredictor.benefits.plan.description
    },
    {
      number: "02",
      title:
        t.about.whyPredictor.benefits.understand.title,
      description:
        t.about.whyPredictor.benefits.understand
          .description
    },
    {
      number: "03",
      title:
        t.about.whyPredictor.benefits.act.title,
      description:
        t.about.whyPredictor.benefits.act.description
    }
  ];

  return (
    <>
      <Header />

      <main
        className="
          about-page
          w-full
        "
      >
        {/* Hero */}

        <section
          className="
            about-hero
            mx-auto
            max-w-[1200px]
            px-10
            pb-[120px]
            pt-[140px]
            max-[900px]:px-7
            max-[900px]:pb-[90px]
            max-[900px]:pt-[100px]
            max-[600px]:px-5
            max-[600px]:pb-[72px]
            max-[600px]:pt-20
          "
        >
          <p
            className="
              section-label
              m-0
              mb-[18px]
              text-[0.72rem]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[var(--text-subtle)]
            "
          >
            {t.about.heroLabel}
          </p>

          <h1
            className="
              m-0
              max-w-[900px]
              text-[clamp(3.5rem,7vw,7rem)]
              font-normal
              leading-[0.94]
              tracking-[-0.055em]
              text-[var(--text-strong)]
              max-[600px]:text-[3.2rem]
            "
          >
            {t.about.heroTitle}
            <br />
            {t.about.heroTitleAccent}
          </h1>

          <p
            className="
              about-intro
              mt-9
              max-w-[680px]
              text-[1.2rem]
              leading-[1.7]
              text-[var(--text-muted)]
              max-[600px]:mt-7
              max-[600px]:text-[1.05rem]
            "
          >
            {t.about.heroDescription}
          </p>
        </section>

        {/* Energy areas */}

        <section
          className="
            about-section
            px-10
            py-[120px]
            max-[900px]:px-7
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div
            className="
              about-section-content
              mx-auto
              w-full
              max-w-[1200px]
            "
          >
            <p
              className="
                section-label
                m-0
                mb-[18px]
                text-[0.72rem]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[var(--text-subtle)]
              "
            >
              {t.about.energyAreas.label}
            </p>

            <h2
              className="
                m-0
                mb-7
                max-w-[850px]
                text-[clamp(2.5rem,5vw,4.8rem)]
                font-normal
                leading-[0.98]
                tracking-[-0.045em]
                text-[var(--text-strong)]
                max-[600px]:text-[2.5rem]
              "
            >
              {t.about.energyAreas.title}
            </h2>

            <p
              className="
                m-0
                mb-5
                max-w-[720px]
                text-[1.05rem]
                leading-[1.75]
                text-[var(--text-muted)]
              "
            >
              {t.about.energyAreas.description}
            </p>

            <div
              className="
                energy-area-layout
                mt-[72px]
                grid
                grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]
                items-center
                gap-20
                max-[900px]:mt-12
                max-[900px]:grid-cols-1
                max-[900px]:gap-12
              "
            >
              <div
                className="
                  energy-area-map-column
                  min-w-0
                "
              >
                <EnergyAreaMap
                  selectedArea={selectedArea}
                  onSelectArea={setSelectedArea}
                />
              </div>

              <div
                className="
                  energy-area-info-column
                  min-w-0
                "
              >
                {selectedAreaInfo ? (
                  <EnergyAreaInfo
                    energyArea={selectedAreaInfo}
                  />
                ) : (
                  <div
                    className="
                      energy-area-placeholder
                      flex
                      min-h-[360px]
                      flex-col
                      justify-center
                      rounded-[18px]
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      p-9
                      max-[600px]:min-h-[300px]
                      max-[600px]:px-[22px]
                      max-[600px]:py-7
                    "
                  >
                    <span
                      className="
                        card-eyebrow
                        text-[0.68rem]
                        font-bold
                        tracking-[0.14em]
                        text-[var(--text-subtle)]
                      "
                    >
                      {t.about.energyAreas.selectArea}
                    </span>

                    <h3
                      className="
                        m-0
                        mb-[10px]
                        mt-2
                        text-[2.4rem]
                        leading-none
                        tracking-[-0.04em]
                        text-[var(--text-strong)]
                      "
                    >
                      {t.about.energyAreas.placeholderTitle}
                    </h3>

                    <p
                      className="
                        m-0
                        mb-5
                        text-[0.98rem]
                        leading-[1.7]
                        text-[var(--text-muted)]
                      "
                    >
                      {
                        t.about.energyAreas
                          .placeholderDescription
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Electricity prices */}

        <section
          className="
            about-section
            about-section-alt
            bg-[color-mix(in_srgb,var(--text)_2.5%,var(--background))]
            px-10
            py-[120px]
            max-[900px]:px-7
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div
            className="
              about-section-content
              mx-auto
              w-full
              max-w-[1200px]
            "
          >
            <p
              className="
                section-label
                m-0
                mb-[18px]
                text-[0.72rem]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[var(--text-subtle)]
              "
            >
              {t.about.price.label}
            </p>

            <h2
              className="
                m-0
                mb-7
                max-w-[850px]
                text-[clamp(2.5rem,5vw,4.8rem)]
                font-normal
                leading-[0.98]
                tracking-[-0.045em]
                text-[var(--text-strong)]
                max-[600px]:text-[2.5rem]
              "
            >
              {t.about.price.title}
            </h2>

            <p
              className="
                m-0
                mb-5
                max-w-[720px]
                text-[1.05rem]
                leading-[1.75]
                text-[var(--text-muted)]
              "
            >
              {t.about.price.description}
            </p>

            <div
              className="
                about-price-factors
                mt-14
                grid
                grid-cols-2
                gap-4
                max-[600px]:mt-10
                max-[600px]:grid-cols-1
              "
            >
              {priceFactors.map(
                ({
                  number,
                  title,
                  description
                }) => (
                  <article
                    className="
                      about-price-factor
                      min-h-[220px]
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      p-7
                      max-[600px]:min-h-0
                    "
                    key={number}
                  >
                    <span
                      className="
                        mb-14
                        block
                        text-[0.68rem]
                        font-bold
                        tracking-[0.14em]
                        text-[var(--text-subtle)]
                        max-[600px]:mb-8
                      "
                    >
                      {number}
                    </span>

                    <h3
                      className="
                        m-0
                        mb-3
                        text-[1.6rem]
                        tracking-[-0.025em]
                        text-[var(--text-strong)]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        m-0
                        text-[0.92rem]
                        leading-[1.6]
                        text-[var(--text-muted)]
                      "
                    >
                      {description}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* Forecasts */}

        <section
          className="
            about-section
            px-10
            py-[120px]
            max-[900px]:px-7
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div
            className="
              about-section-content
              mx-auto
              w-full
              max-w-[1200px]
            "
          >
            <p
              className="
                section-label
                m-0
                mb-[18px]
                text-[0.72rem]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[var(--text-subtle)]
              "
            >
              {t.about.forecasts.label}
            </p>

            <h2
              className="
                m-0
                mb-7
                max-w-[850px]
                text-[clamp(2.5rem,5vw,4.8rem)]
                font-normal
                leading-[0.98]
                tracking-[-0.045em]
                text-[var(--text-strong)]
                max-[600px]:text-[2.5rem]
              "
            >
              {t.about.forecasts.title}
            </h2>

            <p
              className="
                m-0
                mb-5
                max-w-[720px]
                text-[1.05rem]
                leading-[1.75]
                text-[var(--text-muted)]
              "
            >
              {t.about.forecasts.description}
            </p>

            <p
              className="
                m-0
                mb-5
                max-w-[720px]
                text-[1.05rem]
                leading-[1.75]
                text-[var(--text-muted)]
              "
            >
              {t.about.forecasts.modelDescription}
            </p>

            <div
              className="
                about-forecast-process
                mt-16
                grid
                grid-cols-3
                border-b
                border-t
                border-[var(--border)]
                max-[900px]:grid-cols-1
                max-[900px]:mt-11
              "
            >
              {forecastSteps.map(
                ({ number, title }, index) => (
                  <article
                    key={number}
                    className={
                      `;
about - forecast - step;
relative;
min - h - [190px];
px - 8;
py - 9;
max - [900px]: min - h - 0;
max - [900px]: border - l - 0;
max - [900px]: border - t;
max - [900px]: border - [var(--border)]
max - [900px]: first: border - t - 0;
max - [600px]: px - [22px];
max - [600px]: py - 7
  ` +
                      (index > 0
                        ? " border-l border-[var(--border)] max-[900px]:border-l-0"
                        : "")
                    }
                  >
                    <span
                      className="
                        mb-12
                        block
                        text-[0.68rem]
                        font-bold
                        tracking-[0.14em]
                        text-[var(--text-subtle)]
                        max-[600px]:mb-7
                      "
                    >
                      {number}
                    </span>

                    <h3
                      className="
                        m-0
                        text-[2rem]
                        tracking-[-0.035em]
                        text-[var(--text-strong)]
                      "
                    >
                      {title}
                    </h3>

                    {index < 2 && (
                      <span
                        className="
                          absolute
                          right-[-11px]
                          top-1/2
                          z-[2]
                          -translate-y-1/2
                          text-base
                          text-[var(--text-muted)]
                          max-[900px]:hidden
                        "
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* Why Predictor */}

        <section
          className="
            about-section
            about-section-highlight
            bg-[color-mix(in_srgb,var(--text)_4.5%,var(--background))]
            px-10
            py-[120px]
            max-[900px]:px-7
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div
            className="
              about-section-content
              mx-auto
              w-full
              max-w-[1200px]
            "
          >
            <p
              className="
                section-label
                m-0
                mb-[18px]
                text-[0.72rem]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[var(--text-subtle)]
              "
            >
              {t.about.whyPredictor.label}
            </p>

            <h2
              className="
                m-0
                mb-7
                max-w-[850px]
                text-[clamp(2.5rem,5vw,4.8rem)]
                font-normal
                leading-[0.98]
                tracking-[-0.045em]
                text-[var(--text-strong)]
                max-[600px]:text-[2.5rem]
              "
            >
              {t.about.whyPredictor.title}
            </h2>

            <p
              className="
                m-0
                mb-5
                max-w-[720px]
                text-[1.05rem]
                leading-[1.75]
                text-[var(--text-muted)]
              "
            >
              {t.about.whyPredictor.description}
            </p>

            <div
              className="
                about-benefits
                mt-14
                grid
                grid-cols-3
                gap-4
                max-[900px]:grid-cols-1
                max-[600px]:mt-10
              "
            >
              {benefits.map(
                ({
                  number,
                  title,
                  description
                }) => (
                  <div
                    className="
                      flex
                      min-h-[220px]
                      flex-col
                      gap-4
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      p-7
                      max-[600px]:min-h-0
                      max-[600px]:px-[22px]
                      max-[600px]:py-6
                    "
                    key={number}
                  >
                    <span
                      className="
                        text-[0.92rem]
                        leading-[1.6]
                        text-[var(--text-muted)]
                      "
                    >
                      {number}
                    </span>

                    <strong
                      className="
                        text-[1.5rem]
                        tracking-[-0.025em]
                        text-[var(--text-strong)]
                      "
                    >
                      {title}
                    </strong>

                    <span
                      className="
                        text-[0.92rem]
                        leading-[1.6]
                        text-[var(--text-muted)]
                      "
                    >
                      {description}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Disclaimer */}

        <section
          className="
            about-disclaimer
            mx-auto
            max-w-[1200px]
            px-10
            pb-20
            pt-12
            max-[900px]:px-7
            max-[900px]:pb-16
            max-[900px]:pt-10
            max-[600px]:px-5
            max-[600px]:pb-14
            max-[600px]:pt-9
          "
        >
          <p
            className="
              m-0
              max-w-[700px]
              text-[0.8rem]
              leading-[1.6]
              text-[var(--text-subtle)]
            "
          >
            {t.about.disclaimer}
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutPage;
;
