import { test, expect } from "@playwright/test";
import { mockSpotCheck, mockWeeklyForecast } from "./helpers/mockApi";

test.describe("Prediction results", () => {
  test("should display prediction results after searching for Malmö", async ({
    page,
  }) => {
    await mockSpotCheck(page);
    await mockWeeklyForecast(page);

    await page.goto("/");

    await page
      .getByRole("textbox", {
        name: "Stad",
      })
      .fill("Malmö");

    await page
      .getByRole("button", {
        name: "Sök",
      })
      .click();

    const results = page.getByRole("region", {
      name: "Elprisprognos",
    });

    await expect(results).toBeVisible();

    await expect(
      results.getByText("Elområde", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      results
        .locator(".energy-area-badge")
        .getByText("SE4", { exact: true }),
    ).toBeVisible();

    await expect(
      results.getByRole("heading", {
        name: "Malmö",
        level: 2,
      }),
    ).toBeVisible();

    await expect(
      results.getByText("Prognos", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      results.getByRole("heading", {
        name: "Förväntat elpris",
      }),
    ).toBeVisible();

    await expect(
      results.getByRole("img", {
        name: "Graf över förutspådda elpriser",
      }),
    ).toBeVisible();

    await expect(
      results.getByRole("heading", {
        name: "Spara pengar",
      }),
    ).toBeVisible();

    await expect(
      results.getByText("Kör tvättmaskin och diskmaskin", {
        exact: false,
      }),
    ).toBeVisible();

    await expect(
      results.getByText("Ladda elbilen under billigare timmar", {
        exact: false,
      }),
    ).toBeVisible();

    await expect(
      results.getByText(
        "Försök undvika flera stora elförbrukare samtidigt",
        {
          exact: false,
        },
      ),
    ).toBeVisible();
  });

  test("should render a weekly electricity forecast and recommendation", async ({
    page,
  }) => {
    await mockSpotCheck(page);
    await mockWeeklyForecast(page);

    await page.goto("/");

    await page
      .getByRole("textbox", {
        name: "Stad",
      })
      .fill("Malmö");

    await page
      .getByRole("button", {
        name: "Sök",
      })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "Veckoprognos",
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Bästa dagarna", {
        exact: false,
      }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Fredag ser ut att vara en bra dag för flexibel elanvändning baserat på den kommande prognosen.",
        {
          exact: false,
        },
      ),
    ).toBeVisible();

    await expect(
      page.getByText("Prognostiserat dagsmedelpris", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("28 öre/kWh", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Prisnivåer", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Priserna är prognostiserade dagsmedelvärden", {
        exact: false,
      }),
    ).toBeVisible();
  });

  test("should label today from the actual local date in Swedish", async ({
    page,
  }) => {
    // Set Swedish before the application loads.
    await page.addInitScript(() => {
      localStorage.setItem("predictor-language", "sv");
    });

    // Freeze the browser time to Friday, 18 September 2026.
    await page.clock.install({
      time: new Date("2026-09-18T12:00:00+02:00"),
    });

    await mockSpotCheck(page);
    await mockWeeklyForecast(page);

    await page.goto("/");

    await page
      .getByRole("textbox", {
        name: "Stad",
      })
      .fill("Malmö");

    await page
      .getByRole("button", {
        name: "Sök",
      })
      .click();

    const weeklyCard = page.getByLabel("Veckoprognos");

    await expect(
      weeklyCard.getByText("Idag", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Lördag", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Söndag", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Måndag", {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("should label today from the actual local date in English", async ({
    page,
  }) => {
    // Set English before the application loads.
    await page.addInitScript(() => {
      localStorage.setItem("predictor-language", "en");
    });

    // Freeze the browser time to Friday, 18 September 2026.
    await page.clock.install({
      time: new Date("2026-09-18T12:00:00+02:00"),
    });

    await mockSpotCheck(page);
    await mockWeeklyForecast(page);

    await page.goto("/");

    await page
      .getByRole("textbox", {
        name: "City",
      })
      .fill("Malmö");

    await page
      .getByRole("button", {
        name: "Search",
      })
      .click();

    const weeklyCard = page.getByLabel("Weekly Forecast");

    await expect(
      weeklyCard.getByText("Today", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Saturday", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Sunday", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Monday", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Forecast daily average price", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Price levels", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      weeklyCard.getByText("Prices are forecast daily averages", {
        exact: false,
      }),
    ).toBeVisible();
  });
});