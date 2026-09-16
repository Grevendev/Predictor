
export const translations = {
  sv: {
    navigation: {
      home: "Hem",
      howItWorks: "Så fungerar det",
      about: "Om oss",
      openMenu: "Öppna meny",
      closeMenu: "Stäng meny"
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
        "Prognoser baseras på data och maskininlärning."
    },

    howItWorks: {
      label: "SÅ FUNGERAR DET",
      title: "Från din stad till en prognos."
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
      forecast: "Prognos"
    },

    errors: {
      cityNotFound: "Kunde inte hitta staden.",
      noResults: "Ingen information kunde hittas.",
      generic: "Något gick fel. Försök igen.",
      invalidCity: "Ange en giltig stad."
    },

    loading: {
      search: "Söker...",
      prediction: "Hämtar prognos...",
      information: "Hämtar information..."
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
          "Klicka på ett elområde på kartan för att se information om området och vilka kraftslag som har störst installerad effekt."
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
              "När mycket el produceras kan tillgången öka och priserna pressas ned."
          },

          demand: {
            title: "Efterfrågan",
            description:
              "Hög elanvändning ökar efterfrågan och kan bidra till högre priser."
          },

          weather: {
            title: "Väder",
            description:
              "Temperatur, vind och nederbörd påverkar både elanvändning och produktion."
          },

          transmission: {
            title: "Överföring",
            description:
              "Begränsningar i elnätet påverkar hur mycket el som kan överföras mellan olika områden."
          }
        }
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
          forecast: "PROGNOS"
        }
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
              "Se när priserna förväntas vara lägre och planera elanvändningen därefter."
          },

          understand: {
            title: "Förstå",
            description:
              "Få en tydligare bild av elpriset och vad som påverkar utvecklingen i ditt område."
          },

          act: {
            title: "Agera",
            description:
              "Anpassa elanvändningen när prognosen visar bättre förutsättningar."
          }
        }
      },

      disclaimer:
        "Prognoser är uppskattningar och kan skilja sig från det faktiska elpriset. Predictor är ett beslutsstöd och ingen garanti för framtida priser."
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
        "Försök undvika flera stora elförbrukare samtidigt när priset är högt."
    },

    footer: {
      description: "Prognoser för smartare elanvändning.",
      navigation: "Navigation",
      home: "Hem",
      howItWorks: "Så fungerar det",
      about: "Om oss",
      copyright: "Alla rättigheter förbehållna."
    }
  },

  en: {
    navigation: {
      home: "Home",
      howItWorks: "How it works",
      about: "About",
      openMenu: "Open menu",
      closeMenu: "Close menu"
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
        "Forecasts are based on data and machine learning."
    },

    howItWorks: {
      label: "HOW IT WORKS",
      title: "From your city to a forecast."
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
      forecast: "Forecast"
    },

    errors: {
      cityNotFound: "Could not find the city.",
      noResults: "No information could be found.",
      generic: "Something went wrong. Please try again.",
      invalidCity: "Please enter a valid city."
    },

    loading: {
      search: "Searching...",
      prediction: "Fetching forecast...",
      information: "Fetching information..."
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
          "Click an electricity area on the map to see information about the area and which energy sources have the highest installed capacity."
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
              "When a large amount of electricity is produced, supply can increase and prices may decrease."
          },

          demand: {
            title: "Demand",
            description:
              "High electricity usage increases demand and can contribute to higher prices."
          },

          weather: {
            title: "Weather",
            description:
              "Temperature, wind, and precipitation affect both electricity usage and production."
          },

          transmission: {
            title: "Transmission",
            description:
              "Limitations in the power grid affect how much electricity can be transmitted between different areas."
          }
        }
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
          forecast: "FORECAST"
        }
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
              "See when prices are expected to be lower and plan your electricity usage accordingly."
          },

          understand: {
            title: "Understand",
            description:
              "Get a clearer view of electricity prices and what affects their development in your area."
          },

          act: {
            title: "Act",
            description:
              "Adjust your electricity usage when the forecast shows more favorable conditions."
          }
        }
      },

      disclaimer:
        "Forecasts are estimates and may differ from actual electricity prices. Predictor is a decision-support tool and does not guarantee future prices."
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
        "Try to avoid using several high-consumption appliances at the same time when prices are high."
    },

    footer: {
      description: "Forecasts for smarter electricity usage.",
      navigation: "Navigation",
      home: "Home",
      howItWorks: "How it works",
      about: "About",
      copyright: "All rights reserved."
    }
  }
} as const;
;
