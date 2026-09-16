import Header from "../components/Header";
import Footer from "../components/Footer";

function HowItWorksPage() {
  return (
    <>
      <Header />

      <main className="how-it-works-page bg-[var(--background)]">
        {/* Hero */}
        <section
          className="
            how-it-works-hero
            mx-auto
            max-w-[1200px]
            px-8
            pb-[100px]
            pt-[120px]
            max-[900px]:px-6
            max-[900px]:pb-20
            max-[900px]:pt-[90px]
            max-[600px]:px-5
            max-[600px]:pb-16
            max-[600px]:pt-[70px]
          "
        >
          <p
            className="
              section-label
              text-[0.68rem]
              font-bold
              tracking-[0.14em]
              text-[var(--text-muted)]
            "
          >
            SÅ FUNGERAR DET
          </p>

          <h1
            className="
              mt-6
              mb-6
              max-w-[900px]
              text-[clamp(3.5rem,7vw,7rem)]
              font-bold
              leading-[0.95]
              tracking-[-0.06em]
              text-[var(--text-strong)]
              max-[600px]:text-[clamp(3rem,15vw,4.5rem)]
            "
          >
            Från din stad
            <br />
            till en prognos.
          </h1>

          <p
            className="
              how-it-works-intro
              m-0
              max-w-[680px]
              text-[1.2rem]
              leading-[1.7]
              text-[var(--text-muted)]
              max-[600px]:text-base
            "
          >
            Predictor kopplar ihop din stad med rätt
            elområde, analyserar relevanta data och
            använder maskininlärning för att uppskatta
            hur elpriset kan utvecklas.
          </p>

          <div
            className="
              how-it-works-flow
              mt-20
              flex
              items-center
              gap-5
              border-t
              border-[var(--border)]
              pt-8
              max-[900px]:flex-wrap
              max-[900px]:gap-6
              max-[900px]:[&>.how-it-works-arrow]:hidden
              max-[600px]:mt-14
              max-[600px]:grid
              max-[600px]:grid-cols-2
            "
          >
            <div
              className="
                how-it-works-flow-item
                flex
                min-w-[120px]
                flex-col
                gap-2
                max-[600px]:min-w-0
                max-[600px]:border
                max-[600px]:border-[var(--border)]
                max-[600px]:bg-[var(--surface)]
                max-[600px]:p-5
              "
            >
              <span
                className="
                  text-[0.7rem]
                  tracking-[0.12em]
                  text-[var(--text-muted)]
                "
              >
                01
              </span>

              <strong
                className="
                  text-[0.9rem]
                  tracking-[0.08em]
                  text-[var(--text-strong)]
                "
              >
                STAD
              </strong>
            </div>

            <span
              className="
                how-it-works-arrow
                text-[1.2rem]
                text-[var(--text-muted)]
              "
            >
              →
            </span>

            <div
              className="
                how-it-works-flow-item
                flex
                min-w-[120px]
                flex-col
                gap-2
                max-[600px]:min-w-0
                max-[600px]:border
                max-[600px]:border-[var(--border)]
                max-[600px]:bg-[var(--surface)]
                max-[600px]:p-5
              "
            >
              <span
                className="
                  text-[0.7rem]
                  tracking-[0.12em]
                  text-[var(--text-muted)]
                "
              >
                02
              </span>

              <strong
                className="
                  text-[0.9rem]
                  tracking-[0.08em]
                  text-[var(--text-strong)]
                "
              >
                ELOMRÅDE
              </strong>
            </div>

            <span
              className="
                how-it-works-arrow
                text-[1.2rem]
                text-[var(--text-muted)]
              "
            >
              →
            </span>

            <div
              className="
                how-it-works-flow-item
                flex
                min-w-[120px]
                flex-col
                gap-2
                max-[600px]:min-w-0
                max-[600px]:border
                max-[600px]:border-[var(--border)]
                max-[600px]:bg-[var(--surface)]
                max-[600px]:p-5
              "
            >
              <span
                className="
                  text-[0.7rem]
                  tracking-[0.12em]
                  text-[var(--text-muted)]
                "
              >
                03
              </span>

              <strong
                className="
                  text-[0.9rem]
                  tracking-[0.08em]
                  text-[var(--text-strong)]
                "
              >
                DATA
              </strong>
            </div>

            <span
              className="
                how-it-works-arrow
                text-[1.2rem]
                text-[var(--text-muted)]
              "
            >
              →
            </span>

            <div
              className="
                how-it-works-flow-item
                flex
                min-w-[120px]
                flex-col
                gap-2
                max-[600px]:min-w-0
                max-[600px]:border
                max-[600px]:border-[var(--border)]
                max-[600px]:bg-[var(--surface)]
                max-[600px]:p-5
              "
            >
              <span
                className="
                  text-[0.7rem]
                  tracking-[0.12em]
                  text-[var(--text-muted)]
                "
              >
                04
              </span>

              <strong
                className="
                  text-[0.9rem]
                  tracking-[0.08em]
                  text-[var(--text-strong)]
                "
              >
                MODELL
              </strong>
            </div>

            <span
              className="
                how-it-works-arrow
                text-[1.2rem]
                text-[var(--text-muted)]
              "
            >
              →
            </span>

            <div
              className="
                how-it-works-flow-item
                flex
                min-w-[120px]
                flex-col
                gap-2
                max-[600px]:min-w-0
                max-[600px]:border
                max-[600px]:border-[var(--border)]
                max-[600px]:bg-[var(--surface)]
                max-[600px]:p-5
              "
            >
              <span
                className="
                  text-[0.7rem]
                  tracking-[0.12em]
                  text-[var(--text-muted)]
                "
              >
                05
              </span>

              <strong
                className="
                  text-[0.9rem]
                  tracking-[0.08em]
                  text-[var(--text-strong)]
                "
              >
                PROGNOS
              </strong>
            </div>
          </div>
        </section>

        {/* 01 - Energy area */}
        <section
          className="
            how-it-works-section
            border-t
            border-[var(--border)]
            px-8
            py-[110px]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div
            className="
              how-it-works-section-content
              mx-auto
              max-w-[1200px]
            "
          >
            <p
              className="
                section-label
                text-[0.68rem]
                font-bold
                tracking-[0.14em]
                text-[var(--text-muted)]
              "
            >
              01 — ELOMRÅDE
            </p>

            <h2
              className="
                mt-5
                mb-6
                max-w-[850px]
                text-[clamp(2.4rem,5vw,5rem)]
                font-bold
                leading-none
                tracking-[-0.05em]
                text-[var(--text-strong)]
                max-[600px]:text-[clamp(2.5rem,12vw,4rem)]
              "
            >
              Så hittar Predictor ditt elområde
            </h2>

            <p
              className="
                m-0
                max-w-[720px]
                text-[1.05rem]
                leading-[1.75]
                text-[var(--text-muted)]
                max-[600px]:text-base
              "
            >
              Din stad används för att identifiera
              vilket av Sveriges fyra elområden du
              tillhör. Elområdet är viktigt eftersom
              elpriset kan skilja sig mellan olika
              delar av Sverige.
            </p>

            <div
              className="
                how-it-works-example
                mt-16
                grid
                max-w-[760px]
                grid-cols-[1fr_auto_1fr]
                items-center
                gap-10
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-10
                text-[var(--text)]
                max-[600px]:mt-12
                max-[600px]:grid-cols-1
                max-[600px]:gap-6
                max-[600px]:p-7
              "
            >
              <div className="flex flex-col gap-3">
                <span
                  className="
                    text-[0.7rem]
                    tracking-[0.12em]
                    text-[var(--text-muted)]
                  "
                >
                  STAD
                </span>

                <strong
                  className="
                    text-[clamp(2rem,4vw,4rem)]
                    font-bold
                    tracking-[-0.04em]
                    text-[var(--text-strong)]
                  "
                >
                  Malmö
                </strong>
              </div>

              <span
                className="
                  how-it-works-example-arrow
                  text-[1.2rem]
                  text-[var(--text-muted)]
                  max-[600px]:justify-self-center
                  max-[600px]:rotate-90
                "
              >
                →
              </span>

              <div className="flex flex-col gap-3">
                <span
                  className="
                    text-[0.7rem]
                    tracking-[0.12em]
                    text-[var(--text-muted)]
                  "
                >
                  ELOMRÅDE
                </span>

                <strong
                  className="
                    text-[clamp(2rem,4vw,4rem)]
                    font-bold
                    tracking-[-0.04em]
                    text-[var(--text-strong)]
                  "
                >
                  SE4
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* 02 - Data */}
        <section
          className="
            how-it-works-section
            how-it-works-section-alt
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
            px-8
            py-[110px]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div className="how-it-works-section-content mx-auto max-w-[1200px]">
            <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
              02 — DATA
            </p>

            <h2 className="mt-5 mb-6 max-w-[850px] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text-strong)] max-[600px]:text-[clamp(2.5rem,12vw,4rem)]">
              Vilken data används?
            </h2>

            <p className="m-0 max-w-[720px] text-[1.05rem] leading-[1.75] text-[var(--text-muted)] max-[600px]:text-base">
              För att kunna hitta mönster i elpriset
              behöver modellen information om både
              marknaden och de faktorer som påverkar
              produktion och elanvändning.
            </p>

            <div
              className="
                how-it-works-data-grid
                mt-16
                grid
                grid-cols-2
                gap-px
                border
                border-[var(--border)]
                bg-[var(--border)]
                max-[600px]:mt-12
                max-[600px]:grid-cols-1
              "
            >
              {[
                {
                  number: "01",
                  title: "ELPRIS",
                  text: "Historiska elpriser används för att förstå hur priset har utvecklats över tid."
                },
                {
                  number: "02",
                  title: "VÄDER",
                  text: "Temperatur, vind och nederbörd kan påverka både produktion och elanvändning."
                },
                {
                  number: "03",
                  title: "PRODUKTION",
                  text: "Information om exempelvis vattenkraft, vindkraft, kärnkraft och solkraft ger modellen mer kontext."
                },
                {
                  number: "04",
                  title: "TID",
                  text: "Timme, veckodag och andra tidsmönster kan hjälpa modellen att identifiera återkommande variationer."
                }
              ].map((item) => (
                <article
                  className="
                    how-it-works-data-card
                    min-h-[260px]
                    bg-[var(--surface)]
                    p-9
                    text-[var(--text)]
                    max-[600px]:min-h-0
                    max-[600px]:p-7
                  "
                  key={item.number}
                >
                  <span className="text-[0.7rem] tracking-[0.12em] text-[var(--text-muted)]">
                    {item.number}
                  </span>

                  <h3 className="mt-12 mb-4 text-base font-bold tracking-[0.08em] text-[var(--text-strong)] max-[600px]:mt-9">
                    {item.title}
                  </h3>

                  <p className="m-0 max-w-[420px] text-[var(--text-muted)] leading-[1.7]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 - Machine learning */}
        <section
          className="
            how-it-works-section
            border-t
            border-[var(--border)]
            px-8
            py-[110px]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div className="how-it-works-section-content mx-auto max-w-[1200px]">
            <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
              03 — MASKININLÄRNING
            </p>

            <h2 className="mt-5 mb-6 max-w-[850px] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text-strong)] max-[600px]:text-[clamp(2.5rem,12vw,4rem)]">
              Från data till mönster
            </h2>

            <p className="m-0 max-w-[720px] text-[1.05rem] leading-[1.75] text-[var(--text-muted)] max-[600px]:text-base">
              Rådata behöver först bearbetas så att
              modellen kan använda informationen.
              Därefter kan relevanta egenskaper
              användas för att träna modellen.
            </p>

            <div
              className="
                how-it-works-process
                mt-[70px]
                grid
                grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]
                items-center
                gap-6
                max-[900px]:grid-cols-2
                max-[900px]:[&>.how-it-works-process-arrow]:hidden
                max-[600px]:mt-12
                max-[600px]:grid-cols-1
              "
            >
              {[
                ["01", "DATA", "Historiska observationer och relevanta variabler."],
                ["02", "PREPROCESSING", "Data struktureras och förbereds för modellen."],
                ["03", "MODELL", "Maskininlärningen tränas på historiska mönster."],
                ["04", "MÖNSTER", "Modellen lär sig samband som kan användas för nya prognoser."]
              ].map((step, index) => (
                <div key={step[0]} className="contents">
                  <article
                    className="
                      how-it-works-process-step
                      min-h-[220px]
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      p-[30px]
                      text-[var(--text)]
                    "
                  >
                    <span className="text-[0.7rem] tracking-[0.12em] text-[var(--text-muted)]">
                      {step[0]}
                    </span>

                    <strong className="mt-[50px] block text-[0.95rem] tracking-[0.06em] text-[var(--text-strong)]">
                      {step[1]}
                    </strong>

                    <p className="mt-3.5 mb-0 text-[0.9rem] leading-[1.6] text-[var(--text-muted)]">
                      {step[2]}
                    </p>
                  </article>

                  {index < 3 && (
                    <span
                      className="
                        how-it-works-process-arrow
                        text-[1.2rem]
                        text-[var(--text-muted)]
                      "
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 - Forecast */}
        <section
          className="
            how-it-works-section
            how-it-works-section-alt
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
            px-8
            py-[110px]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div className="how-it-works-section-content mx-auto max-w-[1200px]">
            <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
              04 — PROGNOS
            </p>

            <h2 className="mt-5 mb-6 max-w-[850px] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text-strong)] max-[600px]:text-[clamp(2.5rem,12vw,4rem)]">
              Från mönster till prognos
            </h2>

            <p className="m-0 max-w-[720px] text-[1.05rem] leading-[1.75] text-[var(--text-muted)] max-[600px]:text-base">
              När modellen har tränats kan den
              använda aktuell information för att
              uppskatta framtida elpriser.
            </p>

            <div
              className="
                how-it-works-forecast
                mt-16
                max-w-[900px]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--text)]
                max-[600px]:mt-12
              "
            >
              <div
                className="
                  how-it-works-forecast-header
                  flex
                  justify-between
                  border-b
                  border-[var(--border)]
                  p-6
                  px-7
                  max-[600px]:p-5
                "
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.1em] text-[var(--text-muted)]">
                    PROGNOS
                  </span>
                  <strong className="text-[var(--text-strong)]">SE4</strong>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.1em] text-[var(--text-muted)]">
                    ENHET
                  </span>
                  <strong className="text-[var(--text-strong)]">
                    öre/kWh
                  </strong>
                </div>
              </div>

              <div
                className="
                  how-it-works-forecast-list
                  grid
                  grid-cols-5
                  max-[900px]:grid-cols-3
                  max-[600px]:grid-cols-2
                "
              >
                {[
                  ["08:00", "42"],
                  ["09:00", "38"],
                  ["10:00", "34"],
                  ["11:00", "31"],
                  ["12:00", "29"]
                ].map(([time, price], index) => (
                  <div
                    className={`
                      flex
                      flex-col
                      gap-[18px]
                      border-r
                      border-[var(--border)]
                      p-7
                      px-5
                      max-[900px]:border-r
                      max-[900px]:border-b
                      max-[600px]:p-[22px]
                      max-[600px]:px-[18px]
                      ${index === 4 ? "max-[900px]:border-r-0" : ""}
                      ${index === 1 || index === 3 ? "max-[600px]:border-r-0" : ""}
                      ${index >= 3 ? "max-[600px]:border-b-0" : ""}
                    `}
                    key={time}
                  >
                    <span className="text-[0.75rem] text-[var(--text-muted)]">
                      {time}
                    </span>

                    <strong className="text-[2rem] tracking-[-0.04em] text-[var(--text-strong)]">
                      {price}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <p
              className="
                how-it-works-note
                mt-5
                max-w-[720px]
                text-[0.8rem]
                leading-[1.6]
                text-[var(--text-muted)]
              "
            >
              Exemplet ovan är illustrativt. Den
              faktiska prognosen kommer från
              Predictors tränade modell.
            </p>
          </div>
        </section>

        {/* 05 - Interpretation */}
        <section
          className="
            how-it-works-section
            border-t
            border-[var(--border)]
            px-8
            py-[110px]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div className="how-it-works-section-content mx-auto max-w-[1200px]">
            <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
              05 — TOLKNING
            </p>

            <h2 className="mt-5 mb-6 max-w-[850px] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text-strong)] max-[600px]:text-[clamp(2.5rem,12vw,4rem)]">
              Hur ska du tolka prognosen?
            </h2>

            <div
              className="
                how-it-works-interpretation
                mt-16
                grid
                max-w-[900px]
                grid-cols-[minmax(280px,1fr)_minmax(300px,1fr)]
                items-center
                gap-[60px]
                max-[600px]:mt-12
                max-[600px]:grid-cols-1
                max-[600px]:gap-8
              "
            >
              <div className="border border-[var(--border)] bg-[var(--surface)] p-9 text-[var(--text)] max-[600px]:p-7">
                <span className="mb-4 block text-[0.7rem] tracking-[0.1em] text-[var(--text-muted)]">
                  PROGNOS
                </span>

                <strong className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.05em] text-[var(--text-strong)]">
                  ≈ 31 öre/kWh
                </strong>
              </div>

              <p className="m-0 leading-[1.7] text-[var(--text-muted)]">
                Prognosen ska ses som en uppskattning
                av det framtida elpriset. Den visar
                en förväntad utveckling, inte ett
                garanterat pris.
              </p>
            </div>
          </div>
        </section>

        {/* 06 - Decisions */}
        <section
          className="
            how-it-works-section
            how-it-works-section-highlight
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
            px-8
            py-[110px]
            text-[var(--text)]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div className="how-it-works-section-content mx-auto max-w-[1200px]">
            <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
              06 — BESLUT
            </p>

            <h2 className="mt-5 mb-6 max-w-[850px] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text-strong)] max-[600px]:text-[clamp(2.5rem,12vw,4rem)]">
              Från prognos till beslut
            </h2>

            <p className="m-0 max-w-[720px] text-[1.05rem] leading-[1.75] text-[var(--text-muted)] max-[600px]:text-base">
              Syftet med Predictor är att göra
              prognosen användbar. När du förstår
              hur priset kan utvecklas blir det
              lättare att planera elanvändningen.
            </p>

            <div
              className="
                how-it-works-decisions
                mt-16
                grid
                grid-cols-3
                gap-px
                border
                border-[var(--border)]
                bg-[var(--border)]
                max-[900px]:grid-cols-1
                max-[600px]:mt-12
              "
            >
              {[
                ["01", "PLANERA", "Identifiera timmar då priset förväntas vara lägre."],
                ["02", "FÖRSTÅ", "Se hur elpriset kan variera över tid och mellan områden."],
                ["03", "AGERA", "Anpassa elanvändningen när prognosen ger bättre förutsättningar."]
              ].map(([number, title, text]) => (
                <article
                  className="
                    min-h-[280px]
                    bg-[var(--surface)]
                    p-9
                    text-[var(--text)]
                    max-[600px]:min-h-0
                    max-[600px]:p-7
                  "
                  key={number}
                >
                  <span className="text-[0.7rem] tracking-[0.12em] text-[var(--text-muted)]">
                    {number}
                  </span>

                  <strong className="mt-[60px] block text-base tracking-[0.08em] text-[var(--text-strong)] max-[600px]:mt-10">
                    {title}
                  </strong>

                  <p className="mt-4 mb-0 leading-[1.7] text-[var(--text-muted)]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 07 - Uncertainty */}
        <section
          className="
            how-it-works-section
            border-t
            border-[var(--border)]
            px-8
            py-[110px]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div className="how-it-works-section-content mx-auto max-w-[1200px]">
            <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
              07 — OSÄKERHET
            </p>

            <h2 className="mt-5 mb-6 max-w-[850px] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text-strong)] max-[600px]:text-[clamp(2.5rem,12vw,4rem)]">
              Varför kan prognosen ha fel?
            </h2>

            <p className="m-0 max-w-[720px] text-[1.05rem] leading-[1.75] text-[var(--text-muted)] max-[600px]:text-base">
              Elmarknaden påverkas av många faktorer
              och alla framtida händelser går inte att
              förutse. Därför kommer en prognos alltid
              att innehålla en viss osäkerhet.
            </p>

            <div
              className="
                how-it-works-uncertainty-grid
                mt-16
                grid
                grid-cols-4
                gap-px
                border
                border-[var(--border)]
                bg-[var(--border)]
                max-[900px]:grid-cols-2
                max-[600px]:mt-12
                max-[600px]:grid-cols-1
              "
            >
              {[
                ["01", "VÄDER", "Vädret kan utvecklas annorlunda än förväntat."],
                ["02", "EFTERFRÅGAN", "Elanvändningen kan förändras snabbt."],
                ["03", "PRODUKTION", "Driftstörningar eller förändrad produktion kan påverka priset."],
                ["04", "ELNÄT", "Begränsningar i överföringen kan förändra marknadsläget."]
              ].map(([number, title, text]) => (
                <article
                  className="
                    min-h-[240px]
                    bg-[var(--surface)]
                    p-[30px]
                    text-[var(--text)]
                    max-[600px]:min-h-0
                    max-[600px]:p-7
                  "
                  key={number}
                >
                  <span className="text-[0.7rem] tracking-[0.12em] text-[var(--text-muted)]">
                    {number}
                  </span>

                  <strong className="mt-12 block text-[0.9rem] tracking-[0.07em] text-[var(--text-strong)] max-[600px]:mt-9">
                    {title}
                  </strong>

                  <p className="mt-3.5 mb-0 text-[0.9rem] leading-[1.6] text-[var(--text-muted)]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 08 - Technical */}
        <section
          className="
            how-it-works-section
            how-it-works-section-alt
            border-t
            border-[var(--border)]
            bg-[var(--surface)]
            px-8
            py-[110px]
            max-[900px]:px-6
            max-[900px]:py-[90px]
            max-[600px]:px-5
            max-[600px]:py-[72px]
          "
        >
          <div className="how-it-works-section-content mx-auto max-w-[1200px]">
            <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
              08 — FÖR DIG SOM VILL VETA MER
            </p>

            <h2 className="mt-5 mb-6 max-w-[850px] text-[clamp(2.4rem,5vw,5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text-strong)] max-[600px]:text-[clamp(2.5rem,12vw,4rem)]">
              Från rådata till maskininlärning
            </h2>

            <p className="m-0 max-w-[720px] text-[1.05rem] leading-[1.75] text-[var(--text-muted)] max-[600px]:text-base">
              Bakom Predictor finns en teknisk
              pipeline där data hämtas, bearbetas
              och används för att träna
              maskininlärningsmodeller.
            </p>

            <div
              className="
                how-it-works-technical-flow
                mt-16
                grid
                grid-cols-6
                border
                border-[var(--border)]
                max-[900px]:grid-cols-3
                max-[600px]:mt-12
                max-[600px]:grid-cols-2
              "
            >
              {[
                ["01", "DATA"],
                ["02", "PREPROCESSING"],
                ["03", "FEATURES"],
                ["04", "TRÄNING"],
                ["05", "VALIDERING"],
                ["06", "PROGNOS"]
              ].map(([number, title], index) => (
                <div
                  className={`
                    flex
                    min-h-[150px]
                    flex-col
                    gap-[18px]
                    border-r
                    border-[var(--border)]
                    bg-[var(--surface)]
                    p-6
                    text-[var(--text)]
                    max-[900px]:min-h-[130px]
                    ${index % 3 === 2 ? "max-[900px]:border-r-0" : ""}
                    ${index < 3 ? "max-[900px]:border-b" : ""}
                    max-[600px]:min-h-[120px]
                    max-[600px]:p-5
                    ${index % 2 === 1 ? "max-[600px]:border-r-0" : ""}
                    ${index < 4 ? "max-[600px]:border-b" : ""}
                  `}
                  key={number}
                >
                  <span className="text-[0.7rem] tracking-[0.12em] text-[var(--text-muted)]">
                    {number}
                  </span>

                  <strong className="text-[0.8rem] tracking-[0.06em] text-[var(--text-strong)]">
                    {title}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="
            how-it-works-cta
            mx-auto
            max-w-[1200px]
            px-8
            py-[140px]
            text-[var(--text)]
            max-[600px]:px-5
            max-[600px]:py-[100px]
          "
        >
          <p className="section-label text-[0.68rem] font-bold tracking-[0.14em] text-[var(--text-muted)]">
            REDO?
          </p>

          <h2
            className="
              mt-5
              mb-5
              text-[clamp(3rem,7vw,6rem)]
              font-bold
              leading-[0.95]
              tracking-[-0.06em]
              text-[var(--text-strong)]
              max-[600px]:text-[clamp(3rem,15vw,5rem)]
            "
          >
            Testa Predictor
          </h2>

          <p
            className="
              m-0
              max-w-[560px]
              leading-[1.7]
              text-[var(--text-muted)]
            "
          >
            Sök efter din stad och se prognosen för
            ditt elområde.
          </p>

          <a
            className="
              how-it-works-cta-link
              mt-9
              inline-block
              border
              border-[var(--text)]
              px-6
              py-4
              text-[0.8rem]
              font-semibold
              tracking-[0.08em]
              text-[var(--text)]
              transition
              duration-200
              ease-in-out
              hover:bg-[var(--text)]
              hover:text-[var(--background)]
            "
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