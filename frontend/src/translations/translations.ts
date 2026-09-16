
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
      label: "OM OSS",
      title: "Förstå elpriset bättre.",
      description:
        "Vi använder data och maskininlärning för att ge dig en tydligare bild av framtida elpriser."
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
      label: "ABOUT US",
      title: "Understand electricity prices better.",
      description:
        "We use data and machine learning to give you a clearer view of future electricity prices."
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
