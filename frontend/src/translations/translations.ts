export const translations = {
  sv: {
    navigation: {
      home: "Hem",
      howItWorks: "Så fungerar det",
      about: "Om oss"
    },

    hero: {
      title:
        "Vill du veta när det är billigast att använda elen i ditt elområde?",
      cityPlaceholder: "STAD",
      search: "Sök",
      loading: "Hämtar information..."
    },

    howItWorks: {
      label: "SÅ FUNGERAR DET",
      title: "Från din stad till en prognos."
    },

    results: {
      title: "Elprisprognos",
      area: "Elområde",
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
      label: "SPARTIPS",
      title: "Spara pengar på din elanvändning.",
      description:
        "Genom att planera när du använder mest el kan du minska dina elkostnader.",
      tip1: "Använd el när priserna är lägre.",
      tip2: "Undvik onödig elanvändning under pristoppar.",
      tip3: "Planera energikrävande aktiviteter efter elpriset."
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
      about: "About"
    },

    hero: {
      title:
        "Want to know when electricity is cheapest to use in your area?",
      cityPlaceholder: "CITY",
      search: "Search",
      loading: "Fetching information..."
    },

    howItWorks: {
      label: "HOW IT WORKS",
      title: "From your city to a forecast."
    },

    results: {
      title: "Electricity Price Forecast",
      area: "Electricity Area",
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
      label: "COST-SAVING TIPS",
      title: "Save money on your electricity usage.",
      description:
        "By planning when you use the most electricity, you can reduce your energy costs.",
      tip1: "Use electricity when prices are lower.",
      tip2: "Avoid unnecessary electricity usage during price peaks.",
      tip3: "Plan energy-intensive activities around electricity prices."
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