import { test, expect, type Page } from "@playwright/test";

import { mockSpotCheck } from "./helpers/mockApi";

async function openMobileMenuIfNeeded(page: Page) {
  const menuButton = page.getByRole("button", {
    name: /Öppna meny|Open menu/i
  });

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
}

async function switchToEnglish(page: Page) {
  await openMobileMenuIfNeeded(page);

  await page
    .getByRole("button", {
      name: "Byt till engelska"
    })
    .click();
}

async function switchToSwedish(page: Page) {
  await openMobileMenuIfNeeded(page);

  await page
    .getByRole("button", {
      name: "Switch to Swedish"
    })
    .click();
}

test.describe("Language switch", () => {
  test("should display Swedish by default", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("textbox", {
        name: "Stad"
      })
    ).toBeVisible();

    await openMobileMenuIfNeeded(page);

    await expect(
      page.getByRole("button", {
        name: "Byt till engelska"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Sök"
      })
    ).toBeVisible();
  });

  test("should switch from Swedish to English", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("textbox", {
        name: "Stad"
      })
    ).toBeVisible();

    await switchToEnglish(page);

    await expect(
      page.getByRole("textbox", {
        name: "City"
      })
    ).toBeVisible();

    await openMobileMenuIfNeeded(page);

    await expect(
      page.getByRole("button", {
        name: "Switch to Swedish"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Search"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("textbox", {
        name: "Stad"
      })
    ).not.toBeVisible();
  });

  test("should switch from English back to Swedish", async ({ page }) => {
    await page.goto("/");

    await switchToEnglish(page);

    await expect(
      page.getByRole("textbox", {
        name: "City"
      })
    ).toBeVisible();

    await switchToSwedish(page);

    await expect(
      page.getByRole("textbox", {
        name: "Stad"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Sök"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("textbox", {
        name: "City"
      })
    ).not.toBeVisible();
  });

  test("should translate multiple parts of the page", async ({ page }) => {
    await page.goto("/");

    await switchToEnglish(page);

    await expect(
      page.getByRole("textbox", {
        name: "City"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Search"
      })
    ).toBeVisible();

    await openMobileMenuIfNeeded(page);

    await expect(
      page.getByRole("link", {
        name: /How it works/i
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: /About/i
      })
    ).toBeVisible();
  });

  test("should translate the How It Works page", async ({ page }) => {
    await page.goto("/how-it-works");

    await expect(
      page.getByText("SÅ FUNGERAR DET", {
        exact: true
      })
    ).toBeVisible();

    await switchToEnglish(page);

    await expect(
      page.getByText("HOW IT WORKS", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText("SÅ FUNGERAR DET", {
        exact: true
      })
    ).not.toBeVisible();
  });

  test("should translate How It Works content from Swedish to English", async ({
    page
  }) => {
    await page.goto("/how-it-works");

    await expect(
      page.getByText(
        "Så hittar Predictor ditt elområde",
        {
          exact: true
        }
      )
    ).toBeVisible();

    await switchToEnglish(page);

    await expect(
      page.getByText(
        "How Predictor finds your electricity area",
        {
          exact: true
        }
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        "Så hittar Predictor ditt elområde",
        {
          exact: true
        }
      )
    ).not.toBeVisible();
  });

  test("should translate the About page", async ({ page }) => {
    await page.goto("/about");

    // Swedish by default
    await expect(
      page.getByText("OM PREDICTOR", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Förstå elpriset."
      })
    ).toBeVisible();

    await expect(
      page.getByText("ELOMRÅDEN", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Sverige är indelat i fyra elområden"
      })
    ).toBeVisible();

    // Switch to English
    await switchToEnglish(page);

    // English
    await expect(
      page.getByText("ABOUT PREDICTOR", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Understand electricity prices."
      })
    ).toBeVisible();

    await expect(
      page.getByText("ELECTRICITY AREAS", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Sweden is divided into four electricity areas"
      })
    ).toBeVisible();

    // Swedish content should no longer be visible
    await expect(
      page.getByText("OM PREDICTOR", {
        exact: true
      })
    ).not.toBeVisible();

    await expect(
      page.getByText("ELOMRÅDEN", {
        exact: true
      })
    ).not.toBeVisible();
  });

  test("should translate prediction results from Swedish to English", async ({
    page
  }) => {
    await mockSpotCheck(page);

    await page.goto("/");

    // Search for Malmö in Swedish
    await page
      .getByRole("textbox", {
        name: "Stad"
      })
      .fill("Malmö");

    await page
      .getByRole("button", {
        name: "Sök"
      })
      .click();

    const results = page.getByRole("region", {
      name: "Elprisprognos"
    });

    // Swedish result content
    await expect(results).toBeVisible();

    await expect(
      results.getByText("Elområde", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      results.getByText("Prognos", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      results.getByRole("heading", {
        name: "Förväntat elpris"
      })
    ).toBeVisible();

    await expect(
      results.getByRole("img", {
        name: "Graf över förutspådda elpriser"
      })
    ).toBeVisible();

    // Switch to English
    await switchToEnglish(page);

    // English result region
    const englishResults = page.getByRole("region", {
      name: "Electricity Price Forecast"
    });

    await expect(englishResults).toBeVisible();

    // English result content
    await expect(
      englishResults.getByText("Electricity Area", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      englishResults.getByText("Forecast", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      englishResults.getByRole("heading", {
        name: "Expected electricity price"
      })
    ).toBeVisible();

    await expect(
      englishResults.getByRole("img", {
        name: "Chart showing predicted electricity prices"
      })
    ).toBeVisible();

    // Dynamic prediction data should remain unchanged
    await expect(
      englishResults.getByRole("heading", {
        name: "Malmö",
        level: 2
      })
    ).toBeVisible();

    await expect(
      englishResults
        .locator(".energy-area-badge")
        .getByText("SE4", {
          exact: true
        })
    ).toBeVisible();

    // Swedish result content should no longer be visible
    await expect(
      englishResults.getByText("Elområde", {
        exact: true
      })
    ).not.toBeVisible();

    await expect(
      englishResults.getByText("Prognos", {
        exact: true
      })
    ).not.toBeVisible();
  });

  test("should translate cost saving tips from Swedish to English", async ({
    page
  }) => {
    await mockSpotCheck(page);

    await page.goto("/");

    // Search for Malmö
    await page
      .getByRole("textbox", {
        name: "Stad"
      })
      .fill("Malmö");

    await page
      .getByRole("button", {
        name: "Sök"
      })
      .click();

    // Swedish
    await expect(
      page.getByRole("heading", {
        name: "Spara pengar"
      })
    ).toBeVisible();

    await expect(
      page.getByText(
        "Kör tvättmaskin och diskmaskin under timmar då elpriset förväntas vara lägre.",
        {
          exact: true
        }
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        "Ladda elbilen under billigare timmar istället för under pristoppar.",
        {
          exact: true
        }
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        "Försök undvika flera stora elförbrukare samtidigt när priset är högt.",
        {
          exact: true
        }
      )
    ).toBeVisible();

    // Switch to English
    await switchToEnglish(page);

    // English
    await expect(
      page.getByRole("heading", {
        name: "Save money"
      })
    ).toBeVisible();

    await expect(
      page.getByText(
        "Run your washing machine and dishwasher during hours when electricity prices are expected to be lower.",
        {
          exact: true
        }
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        "Charge your electric vehicle during cheaper hours instead of during price peaks.",
        {
          exact: true
        }
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        "Try to avoid using several high-consumption appliances at the same time when prices are high.",
        {
          exact: true
        }
      )
    ).toBeVisible();

    // Swedish tips should no longer be visible
    await expect(
      page.getByRole("heading", {
        name: "Spara pengar"
      })
    ).not.toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Save money"
      })
    ).toBeVisible();
  });

  test("should translate the price chart from Swedish to English", async ({
    page
  }) => {
    await mockSpotCheck(page);

    await page.goto("/");

    // Search for Malmö
    await page
      .getByRole("textbox", {
        name: "Stad"
      })
      .fill("Malmö");

    await page
      .getByRole("button", {
        name: "Sök"
      })
      .click();

    // Swedish chart
    await expect(
      page.getByRole("button", {
        name: "Idag"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Imorgon"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Alla"
      })
    ).toBeVisible();

    // The chart legend is desktop-only.
    // On mobile, the legend is intentionally hidden.
    const optimalTime = page.getByText("Optimal tid", {
      exact: true
    });

    if (await optimalTime.isVisible()) {
      await expect(optimalTime).toBeVisible();

      await expect(
        page.getByText("Nu", {
          exact: true
        })
      ).toBeVisible();
    }

    // Switch to English
    await switchToEnglish(page);

    // English chart
    await expect(
      page.getByRole("button", {
        name: "Today"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Tomorrow"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "All"
      })
    ).toBeVisible();

    // The English legend is desktop-only.
    const optimalTimeEnglish = page.getByText("Optimal time", {
      exact: true
    });

    if (await optimalTimeEnglish.isVisible()) {
      await expect(optimalTimeEnglish).toBeVisible();

      await expect(
        page.getByText("Now", {
          exact: true
        })
      ).toBeVisible();
    }

    // Swedish chart text should no longer be visible
    await expect(
      page.getByText("LADDA HÄR", {
        exact: true
      })
    ).not.toBeVisible();
  });
});