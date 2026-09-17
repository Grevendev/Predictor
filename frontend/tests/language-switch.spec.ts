import { test, expect } from "@playwright/test";
import { mockSpotCheck } from "./helpers/mockApi";
test.describe("Language switch", () => {
  test("should display Swedish by default", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("textbox", {
        name: "Stad"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: /English|engelska/i
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

    await page.getByRole("button", {
      name: /English|engelska/i
    }).click();

    await expect(
      page.getByRole("textbox", {
        name: "City"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: /Svenska|Swedish/i
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

    await page.getByRole("button", {
      name: /English|engelska/i
    }).click();

    await expect(
      page.getByRole("textbox", {
        name: "City"
      })
    ).toBeVisible();

    await page.getByRole("button", {
      name: /Svenska|Swedish/i
    }).click();

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

    await page.getByRole("button", {
      name: /English|engelska/i
    }).click();

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

    await page.getByRole("button", {
      name: /English|engelska/i
    }).click();

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
      page.getByText("Så hittar Predictor ditt elområde", {
        exact: true
      })
    ).toBeVisible();

    await page.getByRole("button", {
      name: /English|engelska/i
    }).click();

    await expect(
      page.getByText("How Predictor finds your electricity area", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText("Så hittar Predictor ditt elområde", {
        exact: true
      })
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
    await page.getByRole("button", {
      name: /English|engelska/i
    }).click();

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
    await page.getByRole("textbox", {
      name: "Stad"
    }).fill("Malmö");

    await page.getByRole("button", {
      name: "Sök"
    }).click();

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
    await page.getByRole("button", {
      name: /English|engelska/i
    }).click();

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
});