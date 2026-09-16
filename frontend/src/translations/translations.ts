export const translations = {
  sv: {
    navigation: {
      home: "Hem",
      howItWorks: "Så fungerar det",
      about: "Om oss",
      openMenu: "Öppna meny",
      closeMenu: "Stäng meny",
    },

    hero: {
      label: "INTELLIGENT ELPROGNOS",
      title: "Använd elen när",
      titleAccent: "priset är lägst.",
      description:
        "Sök efter din stad och få en prognos för när det är smartast att använda elen i ditt elområde.",
      cityPlaceholder: "STAD",
      cityLabel: "Stad",
      search: "Sök",
      loading: "Hämtar information...",
      predictionInfo:
        "Prognoser baseras på data och maskininlärning.",
    },

    howItWorks: {
      label: "SÅ FUNGERAR DET",
      title: "Från din stad till en prognos.",
    },

    results: {
      title: "Elprisprognos",
      area: "Elområde",
      yourArea: "Ditt elområde",
      installedCapacity: "Installerad effekt",
      priceForecast: "Prisprognos",
      expectedPrice: "Förväntat elpris",
      lowestPredictedPrice: "Lägsta prognostiserade pris",
      chartAriaLabel: "Graf över förutspådda elpriser",
      noPriceForecast: "Ingen prisprognos tillgänglig.",
      today: "Idag",
      tomorrow: "Imorgon",
      price: "Pris",
      lowestPrice: "Lägsta pris",
      highestPrice: "Högsta pris",
      averagePrice: "Genomsnittligt pris",
      forecast: "Prognos",
    },

    errors: {
      cityNotFound: "Kunde inte hitta staden.",
      noResults: "Ingen information kunde hittas.",
      generic: "Något gick fel. Försök igen.",
      invalidCity: "Ange en giltig stad.",
    },

    loading: {
      search: "Söker...",
      prediction: "Hämtar prognos...",
      information: "Hämtar information...",
    },

    about: {
      heroLabel: "OM PREDICTOR",
      heroTitle: "Förstå elpriset.",
      heroTitleAccent: "Använd elen smartare.",
      heroDescription:
        "Predictor hjälper dig att förstå hur elpriser kan utvecklas över tid och vilket elområde du tillhör.",

      energyAreas: {
        label: "ELOMRÅDEN",
        title: "Sverige är indelat i fyra elområden",
        description:
          "Elområdena SE1, SE2, SE3 och SE4 används för att hantera begränsningar i överföringen av el mellan olika delar av Sverige.",
        selectArea: "VÄLJ ELOMRÅDE",
        placeholderTitle: "Utforska Sveriges elområden",
        placeholderDescription:
          "Klicka på ett elområde på kartan för att se information om området och vilka kraftslag som har störst installerad effekt.",

        areas: {
          SE1: {
            name: "Luleå",
            region: "Norra Sverige",
            description:
              "SE1 omfattar den nordligaste delen av Sverige och har en stor elproduktion i förhållande till den lokala elanvändningen.",
            balanceDescription:
              "Området har ett stort produktionsöverskott och är särskilt präglat av vattenkraft och vindkraft.",
          },
          SE2: {
            name: "Sundsvall",
            region: "Norra och mellersta Sverige",
            description:
              "SE2 sträcker sig över stora delar av norra och mellersta Sverige och är ett av landets viktigaste produktionsområden.",
            balanceDescription:
              "Området har ett stort produktionsöverskott och har mycket både vattenkraft och vindkraft.",
          },
          SE3: {
            name: "Stockholm",
            region: "Mellersta Sverige",
            description:
              "SE3 omfattar bland annat Stockholm och stora delar av mellersta Sverige och är Sveriges största elområde sett till elanvändning.",
            balanceDescription:
              "Kärnkraft står för den största installerade effekten, följt av vindkraft, vattenkraft och solkraft.",
          },
          SE4: {
            name: "Malmö",
            region: "Södra Sverige",
            description:
              "SE4 omfattar södra Sverige och är det svenska elområde som ligger närmast kontinentala Europa.",
            balanceDescription:
              "Området har normalt ett större elbehov än den lokala produktionen och är därför beroende av överföring från andra områden och import.",
          },
        },

        sources: {
          hydropower: "Vattenkraft",
          windPower: "Vindkraft",
          nuclearPower: "Kärnkraft",
          solarPower: "Solkraft",
        },
      },

      price: {
        label: "ELPRISET",
        title: "Varför förändras elpriset?",
        description:
          "Elpriset påverkas av flera olika faktorer. Tillgång och efterfrågan, väderförhållanden, elproduktion och överföringskapacitet mellan olika delar av elsystemet kan alla påverka priset.",

        factors: {
          supply: {
            title: "Tillgång",
            description:
              "När mycket el produceras kan tillgången öka och priserna pressas ned.",
          },

          demand: {
            title: "Efterfrågan",
            description:
              "Hög elanvändning ökar efterfrågan och kan bidra till högre priser.",
          },

          weather: {
            title: "Väder",
            description:
              "Temperatur, vind och nederbörd påverkar både elanvändning och produktion.",
          },

          transmission: {
            title: "Överföring",
            description:
              "Begränsningar i elnätet påverkar hur mycket el som kan överföras mellan olika områden.",
          },
        },
      },

      forecasts: {
        label: "PROGNOSER",
        title: "Vad är en elprisprognos?",
        description:
          "En elprisprognos är en uppskattning av hur elpriset kan utvecklas under kommande timmar eller perioder.",
        modelDescription:
          "Predictor använder data och maskininlärning för att identifiera mönster i historiska och aktuella data och skapa prognoser för framtida elpriser.",

        process: {
          data: "DATA",
          patterns: "MÖNSTER",
          forecast: "PROGNOS",
        },
      },

      whyPredictor: {
        label: "VARFÖR PREDICTOR?",
        title: "Från prognos till beslut",
        description:
          "Målet är inte bara att visa vad elen kostar. Predictor ska göra det enklare att förstå när det kan vara smartare att använda mycket el.",

        benefits: {
          plan: {
            title: "Planera",
            description:
              "Se när priserna förväntas vara lägre och planera elanvändningen därefter.",
          },

          understand: {
            title: "Förstå",
            description:
              "Få en tydligare bild av elpriset och vad som påverkar utvecklingen i ditt område.",
          },

          act: {
            title: "Agera",
            description:
              "Anpassa elanvändningen när prognosen visar bättre förutsättningar.",
          },
        },
      },

      disclaimer:
        "Prognoser är uppskattningar och kan skilja sig från det faktiska elpriset. Predictor är ett beslutsstöd och ingen garanti för framtida priser.",
    },

    costSavingTips: {
      label: "SMART ELANVÄNDNING",
      title: "Spara pengar",
      description:
        "Planera din elanvändning efter elpriset för att minska dina elkostnader.",
      tip1:
        "Kör tvättmaskin och diskmaskin under timmar då elpriset förväntas vara lägre.",
      tip2:
        "Ladda elbilen under billigare timmar istället för under pristoppar.",
      tip3:
        "Försök undvika flera stora elförbrukare samtidigt när priset är högt.",
    },

    footer: {
      description: "Prognoser för smartare elanvändning.",
      navigation: "Navigation",
      home: "Hem",
      howItWorks: "Så fungerar det",
      about: "Om oss",
      copyright: "Alla rättigheter förbehållna.",
    },

    howItWorksPage: {
      hero: {
        label: "SÅ FUNGERAR DET",
        title: "Från din stad till en prognos.",
        description:
          "Predictor kopplar din stad till rätt elområde, analyserar relevant data och använder maskininlärning för att uppskatta hur elpriserna kan utvecklas.",

        flow: {
          city: "STAD",
          area: "ELOMRÅDE",
          data: "DATA",
          model: "MODELL",
          forecast: "PROGNOS",
        },
      },

      energyArea: {
        label: "01 — ELOMRÅDE",
        title: "Så hittar Predictor ditt elområde",
        description:
          "Din stad används för att identifiera vilket av Sveriges fyra elområden du tillhör. Elområdet är viktigt eftersom elpriserna kan skilja sig mellan olika delar av Sverige.",
        city: "STAD",
        cityExample: "Malmö",
        area: "ELOMRÅDE",
        areaExample: "SE4",
      },

      data: {
        label: "02 — DATA",
        title: "Vilken data används?",
        description:
          "För att identifiera mönster i elpriser behöver modellen information om både marknaden och de faktorer som påverkar elproduktion och elanvändning.",

        cards: [
          {
            number: "01",
            title: "ELPRIS",
            text: "Historiska elpriser används för att identifiera tidigare prisnivåer och återkommande mönster.",
          },
          {
            number: "02",
            title: "VÄDER",
            text: "Temperatur, vind och nederbörd kan påverka både produktion och efterfrågan på el.",
          },
          {
            number: "03",
            title: "PRODUKTION",
            text: "Information om vattenkraft, vindkraft, kärnkraft och solenergi hjälper modellen att förstå tillgången på el.",
          },
          {
            number: "04",
            title: "TID",
            text: "Timme, veckodag och återkommande tidsmönster används för att hitta variationer i elpriset.",
          },
        ],
      },

      machineLearning: {
        label: "03 — MASKININLÄRNING",
        title: "Från data till mönster",
        description:
          "När datan har samlats in bearbetas den innan modellen tränas. Målet är att hitta mönster som kan användas för att uppskatta framtida elpriser.",

        steps: [
          {
            number: "01",
            title: "DATA",
            text: "Historisk data samlas in.",
          },
          {
            number: "02",
            title: "PREPROCESSING",
            text: "Datan rengörs och förbereds för modellen.",
          },
          {
            number: "03",
            title: "MODELL",
            text: "En maskininlärningsmodell tränas på historiska observationer.",
          },
          {
            number: "04",
            title: "MÖNSTER",
            text: "Modellen identifierar mönster som kan användas för framtida prognoser.",
          },
        ],
      },

      forecast: {
        label: "04 — PROGNOS",
        title: "Från mönster till prognos",
        description:
          "När modellen har tränats kan den använda aktuell information för att uppskatta framtida elpriser i ett specifikt elområde.",
        forecast: "PROGNOS",
        area: "SE4",
        unit: "öre/kWh",
        note:
          "Exemplet ovan är illustrativt. Den faktiska prognosen kommer från Predictors tränade modell.",
      },

      interpretation: {
        label: "05 — TOLKNING",
        title: "Hur ska du tolka prognosen?",
        forecast: "PROGNOS",
        examplePrice: "≈ 31 öre/kWh",
        description:
          "Prognosen ska ses som en uppskattning av framtida elpriser. Den visar en förväntad utveckling och är inte ett garanterat elpris.",
      },

      decisions: {
        label: "06 — BESLUT",
        title: "Från prognos till beslut",
        description:
          "Prognosen kan hjälpa dig att planera din elanvändning och förstå när priserna förväntas vara högre eller lägre.",

        cards: [
          {
            number: "01",
            title: "PLANERA",
            text: "Planera energikrävande aktiviteter till timmar där priset förväntas vara lägre.",
          },
          {
            number: "02",
            title: "FÖRSTÅ",
            text: "Använd prognosen för att förstå hur elpriset kan utvecklas under dagen.",
          },
          {
            number: "03",
            title: "AGERA",
            text: "Anpassa din elanvändning utifrån den information som prognosen ger.",
          },
        ],
      },

      uncertainty: {
        label: "07 — OSÄKERHET",
        title: "Varför kan prognosen ha fel?",
        description:
          "En prognos är aldrig en garanti. Elmarknaden påverkas av många faktorer och oväntade förändringar kan göra att det faktiska priset skiljer sig från modellens uppskattning.",

        cards: [
          {
            number: "01",
            title: "VÄDER",
            text: "Oväntade förändringar i temperatur, vind eller nederbörd kan påverka både produktion och efterfrågan.",
          },
          {
            number: "02",
            title: "EFTERFRÅGAN",
            text: "Elanvändningen kan förändras snabbt beroende på exempelvis temperatur och samhällsaktivitet.",
          },
          {
            number: "03",
            title: "PRODUKTION",
            text: "Förändringar i exempelvis vind-, vatten- eller kärnkraftsproduktion kan påverka tillgången på el.",
          },
          {
            number: "04",
            title: "ELNÄT",
            text: "Begränsningar och förändringar i elnätet kan påverka hur el kan distribueras mellan olika områden.",
          },
        ],
      },

      technical: {
        label: "08 — FÖR DIG SOM VILL VETA MER",
        title: "Från rådata till maskininlärning",
        description:
          "Bakom prognosen finns en pipeline där rådata bearbetas, relevanta egenskaper skapas och en modell tränas och valideras innan den används för prognoser.",

        steps: [
          {
            number: "01",
            title: "DATA",
          },
          {
            number: "02",
            title: "PREPROCESSING",
          },
          {
            number: "03",
            title: "FEATURES",
          },
          {
            number: "04",
            title: "TRÄNING",
          },
          {
            number: "05",
            title: "VALIDERING",
          },
          {
            number: "06",
            title: "PROGNOS",
          },
        ],
      },

      cta: {
        label: "REDO?",
        title: "Testa Predictor",
        description:
          "Sök efter din stad och se prognosen för ditt elområde.",
        button: "TESTA PREDICTOR →",
      },
    },

    energyAreaMap: {
      loading: "Laddar karta...",
      error: "Kartan kunde inte laddas.",
      mapTitle: "Sveriges fyra elområden",
      areaLabel: "Elområde",
      selectedArea: "VALT ELOMRÅDE",
      areas: "ELOMRÅDEN",
      source: "Geografisk data: Svenska kraftnät",
    },
  },

  en: {
    navigation: {
      home: "Home",
      howItWorks: "How it works",
      about: "About",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },

    hero: {
      label: "INTELLIGENT ELECTRICITY FORECAST",
      title: "Use electricity when",
      titleAccent: "prices are lowest.",
      description:
        "Search for your city and get a forecast for when it is smartest to use electricity in your area.",
      cityPlaceholder: "CITY",
      cityLabel: "City",
      search: "Search",
      loading: "Fetching information...",
      predictionInfo:
        "Forecasts are based on data and machine learning.",
    },

    howItWorks: {
      label: "HOW IT WORKS",
      title: "From your city to a forecast.",
    },

    results: {
      title: "Electricity Price Forecast",
      area: "Electricity Area",
      yourArea: "Your electricity area",
      installedCapacity: "Installed capacity",
      priceForecast: "Price forecast",
      expectedPrice: "Expected electricity price",
      lowestPredictedPrice: "Lowest predicted price",
      chartAriaLabel: "Chart showing predicted electricity prices",
      noPriceForecast: "No price forecast available.",
      today: "Today",
      tomorrow: "Tomorrow",
      price: "Price",
      lowestPrice: "Lowest price",
      highestPrice: "Highest price",
      averagePrice: "Average price",
      forecast: "Forecast",
    },

    errors: {
      cityNotFound: "Could not find the city.",
      noResults: "No information could be found.",
      generic: "Something went wrong. Please try again.",
      invalidCity: "Please enter a valid city.",
    },

    loading: {
      search: "Searching...",
      prediction: "Fetching forecast...",
      information: "Fetching information...",
    },

    about: {
      heroLabel: "ABOUT PREDICTOR",
      heroTitle: "Understand electricity prices.",
      heroTitleAccent: "Use electricity smarter.",
      heroDescription:
        "Predictor helps you understand how electricity prices can develop over time and which electricity area you belong to.",

      energyAreas: {
        label: "ELECTRICITY AREAS",
        title: "Sweden is divided into four electricity areas",
        description:
          "The electricity areas SE1, SE2, SE3 and SE4 are used to manage limitations in the transmission of electricity between different parts of Sweden.",
        selectArea: "SELECT ELECTRICITY AREA",
        placeholderTitle: "Explore Sweden's electricity areas",
        placeholderDescription:
          "Click an electricity area on the map to see information about the area and which energy sources have the highest installed capacity.",

        areas: {
          SE1: {
            name: "Luleå",
            region: "Northern Sweden",
            description:
              "SE1 covers the northernmost part of Sweden and has a large amount of electricity production in relation to local electricity consumption.",
            balanceDescription:
              "The area has a large production surplus and is particularly characterized by hydropower and wind power.",
          },
          SE2: {
            name: "Sundsvall",
            region: "Northern and central Sweden",
            description:
              "SE2 stretches across large parts of northern and central Sweden and is one of the country's most important electricity production areas.",
            balanceDescription:
              "The area has a large production surplus and has significant amounts of both hydropower and wind power.",
          },
          SE3: {
            name: "Stockholm",
            region: "Central Sweden",
            description:
              "SE3 includes Stockholm and large parts of central Sweden and is Sweden's largest electricity area in terms of electricity consumption.",
            balanceDescription:
              "Nuclear power has the largest installed capacity, followed by wind power, hydropower and solar power.",
          },
          SE4: {
            name: "Malmö",
            region: "Southern Sweden",
            description:
              "SE4 covers southern Sweden and is the Swedish electricity area closest to continental Europe.",
            balanceDescription:
              "The area normally has a greater electricity demand than local production and therefore depends on transmission from other areas and imports.",
          },
        },

        sources: {
          hydropower: "Hydropower",
          windPower: "Wind power",
          nuclearPower: "Nuclear power",
          solarPower: "Solar power",
        },
      },

      price: {
        label: "ELECTRICITY PRICES",
        title: "Why do electricity prices change?",
        description:
          "Electricity prices are affected by several factors. Supply and demand, weather conditions, electricity production, and transmission capacity between different parts of the power system can all affect prices.",

        factors: {
          supply: {
            title: "Supply",
            description:
              "When a large amount of electricity is produced, supply can increase and prices may decrease.",
          },

          demand: {
            title: "Demand",
            description:
              "High electricity usage increases demand and can contribute to higher prices.",
          },

          weather: {
            title: "Weather",
            description:
              "Temperature, wind, and precipitation affect both electricity usage and production.",
          },

          transmission: {
            title: "Transmission",
            description:
              "Limitations in the power grid affect how much electricity can be transmitted between different areas.",
          },
        },
      },

      forecasts: {
        label: "FORECASTS",
        title: "What is an electricity price forecast?",
        description:
          "An electricity price forecast is an estimate of how electricity prices may develop over the coming hours or periods.",
        modelDescription:
          "Predictor uses data and machine learning to identify patterns in historical and current data and create forecasts for future electricity prices.",

        process: {
          data: "DATA",
          patterns: "PATTERNS",
          forecast: "FORECAST",
        },
      },

      whyPredictor: {
        label: "WHY PREDICTOR?",
        title: "From forecast to decision",
        description:
          "The goal is not only to show what electricity costs. Predictor is designed to make it easier to understand when it may be smarter to use more electricity.",

        benefits: {
          plan: {
            title: "Plan",
            description:
              "See when prices are expected to be lower and plan your electricity usage accordingly.",
          },

          understand: {
            title: "Understand",
            description:
              "Get a clearer view of electricity prices and what affects their development in your area.",
          },

          act: {
            title: "Act",
            description:
              "Adjust your electricity usage when the forecast shows more favorable conditions.",
          },
        },
      },

      disclaimer:
        "Forecasts are estimates and may differ from actual electricity prices. Predictor is a decision-support tool and does not guarantee future prices.",
    },

    costSavingTips: {
      label: "SMART ELECTRICITY USAGE",
      title: "Save money",
      description:
        "Plan your electricity usage around electricity prices to reduce your energy costs.",
      tip1:
        "Run your washing machine and dishwasher during hours when electricity prices are expected to be lower.",
      tip2:
        "Charge your electric vehicle during cheaper hours instead of during price peaks.",
      tip3:
        "Try to avoid using several high-consumption appliances at the same time when prices are high.",
    },

    footer: {
      description: "Forecasts for smarter electricity usage.",
      navigation: "Navigation",
      home: "Home",
      howItWorks: "How it works",
      about: "About",
      copyright: "All rights reserved.",
    },

    howItWorksPage: {
      hero: {
        label: "HOW IT WORKS",
        title: "From your city to a forecast.",
        description:
          "Predictor connects your city to the correct electricity area, analyzes relevant data, and uses machine learning to estimate how electricity prices may develop.",

        flow: {
          city: "CITY",
          area: "ELECTRICITY AREA",
          data: "DATA",
          model: "MODEL",
          forecast: "FORECAST",
        },
      },

      energyArea: {
        label: "01 — ELECTRICITY AREA",
        title: "How Predictor finds your electricity area",
        description:
          "Your city is used to identify which of Sweden's four electricity areas you belong to. The electricity area is important because electricity prices can differ between different parts of Sweden.",
        city: "CITY",
        cityExample: "Malmö",
        area: "ELECTRICITY AREA",
        areaExample: "SE4",
      },

      data: {
        label: "02 — DATA",
        title: "What data is used?",
        description:
          "To identify patterns in electricity prices, the model needs information about both the market and the factors that affect electricity production and consumption.",

        cards: [
          {
            number: "01",
            title: "ELECTRICITY PRICE",
            text: "Historical electricity prices are used to identify previous price levels and recurring patterns.",
          },
          {
            number: "02",
            title: "WEATHER",
            text: "Temperature, wind and precipitation can affect both electricity production and demand.",
          },
          {
            number: "03",
            title: "PRODUCTION",
            text: "Information about hydropower, wind power, nuclear power and solar energy helps the model understand electricity supply.",
          },
          {
            number: "04",
            title: "TIME",
            text: "Hour, weekday and recurring time patterns are used to identify variations in electricity prices.",
          },
        ],
      },

      machineLearning: {
        label: "03 — MACHINE LEARNING",
        title: "From data to patterns",
        description:
          "Once the data has been collected, it is processed before the model is trained. The goal is to identify patterns that can be used to estimate future electricity prices.",

        steps: [
          {
            number: "01",
            title: "DATA",
            text: "Historical data is collected.",
          },
          {
            number: "02",
            title: "PREPROCESSING",
            text: "The data is cleaned and prepared for the model.",
          },
          {
            number: "03",
            title: "MODEL",
            text: "A machine learning model is trained on historical observations.",
          },
          {
            number: "04",
            title: "PATTERNS",
            text: "The model identifies patterns that can be used for future forecasts.",
          },
        ],
      },

      forecast: {
        label: "04 — FORECAST",
        title: "From patterns to forecast",
        description:
          "Once the model has been trained, it can use current information to estimate future electricity prices in a specific electricity area.",
        forecast: "FORECAST",
        area: "SE4",
        unit: "öre/kWh",
        note:
          "The example above is illustrative. The actual forecast comes from Predictor's trained model.",
      },

      interpretation: {
        label: "05 — INTERPRETATION",
        title: "How should you interpret the forecast?",
        forecast: "FORECAST",
        examplePrice: "≈ 31 öre/kWh",
        description:
          "The forecast should be viewed as an estimate of future electricity prices. It shows an expected development, not a guaranteed price.",
      },

      decisions: {
        label: "06 — DECISION",
        title: "From forecast to decision",
        description:
          "The forecast can help you plan your electricity usage and understand when prices are expected to be higher or lower.",

        cards: [
          {
            number: "01",
            title: "PLAN",
            text: "Plan energy-intensive activities for hours when the price is expected to be lower.",
          },
          {
            number: "02",
            title: "UNDERSTAND",
            text: "Use the forecast to understand how electricity prices may develop throughout the day.",
          },
          {
            number: "03",
            title: "ACT",
            text: "Adjust your electricity usage based on the information provided by the forecast.",
          },
        ],
      },

      uncertainty: {
        label: "07 — UNCERTAINTY",
        title: "Why can the forecast be wrong?",
        description:
          "A forecast is never a guarantee. The electricity market is affected by many factors, and unexpected changes can cause the actual price to differ from the model's estimate.",

        cards: [
          {
            number: "01",
            title: "WEATHER",
            text: "Unexpected changes in temperature, wind or precipitation can affect both production and demand.",
          },
          {
            number: "02",
            title: "DEMAND",
            text: "Electricity usage can change quickly depending on factors such as temperature and societal activity.",
          },
          {
            number: "03",
            title: "PRODUCTION",
            text: "Changes in wind, hydropower or nuclear production can affect the availability of electricity.",
          },
          {
            number: "04",
            title: "POWER GRID",
            text: "Limitations and changes in the power grid can affect how electricity is distributed between different areas.",
          },
        ],
      },

      technical: {
        label: "08 — FOR THOSE WHO WANT TO KNOW MORE",
        title: "From raw data to machine learning",
        description:
          "Behind the forecast is a pipeline where raw data is processed, relevant features are created, and a model is trained and validated before being used for forecasting.",

        steps: [
          {
            number: "01",
            title: "DATA",
          },
          {
            number: "02",
            title: "PREPROCESSING",
          },
          {
            number: "03",
            title: "FEATURES",
          },
          {
            number: "04",
            title: "TRAINING",
          },
          {
            number: "05",
            title: "VALIDATION",
          },
          {
            number: "06",
            title: "FORECAST",
          },
        ],
      },

      cta: {
        label: "READY?",
        title: "Try Predictor",
        description:
          "Search for your city and see the forecast for your electricity area.",
        button: "TRY PREDICTOR →",
      },
    },

    energyAreaMap: {
      loading: "Loading map...",
      error: "The map could not be loaded.",
      mapTitle: "Sweden's four electricity areas",
      areaLabel: "Electricity area",
      selectedArea: "SELECTED AREA",
      areas: "ELECTRICITY AREAS",
      source: "Geographical data: Svenska kraftnät",
    },
  },
} as const;