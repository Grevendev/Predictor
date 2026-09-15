
import { test, expect } from "@playwright/test";

test.describe("How it works page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/how-it-works");
  });

  test("should display the hero and main process", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /Från din stad till en prognos/
      })
    ).toBeVisible();

    await expect(
      page.getByText("SÅ FUNGERAR DET", {
        exact: true
      })
    ).toBeVisible();

    const flow = page.locator(
      ".how-it-works-flow"
    );

    await expect(
      flow.getByText("STAD", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      flow.getByText("ELOMRÅDE", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      flow.getByText("DATA", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      flow.getByText("MODELL", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      flow.getByText("PROGNOS", {
        exact: true
      })
    ).toBeVisible();
  });

  test("should explain how a city maps to an energy area", async ({
    page
  }) => {
    await expect(
      page.getByRole("heading", {
        name: "Så hittar Predictor ditt elområde"
      })
    ).toBeVisible();

    const example = page.locator(
      ".how-it-works-example"
    );

    await expect(
      example.getByText("Malmö", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      example.getByText("SE4", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText(
        "Elområdet är viktigt eftersom elpriset kan skilja sig mellan olika delar av Sverige."
      )
    ).toBeVisible();
  });

  test("should explain the data, machine learning and forecast", async ({
    page
  }) => {
    await expect(
      page.getByRole("heading", {
        name: "Vilken data används?"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Från data till mönster"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Från mönster till prognos"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Hur ska du tolka prognosen?"
      })
    ).toBeVisible();

    const dataGrid = page.locator(
      ".how-it-works-data-grid"
    );

    await expect(
      dataGrid.getByText("ELPRIS", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      dataGrid.getByText("VÄDER", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      dataGrid.getByText("PRODUKTION", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      dataGrid.getByText("TID", {
        exact: true
      })
    ).toBeVisible();

    const process = page.locator(
      ".how-it-works-process"
    );

    await expect(
      process.getByText("PREPROCESSING", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText("≈ 31 öre/kWh", {
        exact: true
      })
    ).toBeVisible();
  });

  test("should explain decisions, uncertainty and provide a CTA", async ({
    page
  }) => {
    await expect(
      page.getByRole("heading", {
        name: "Från prognos till beslut"
      })
    ).toBeVisible();

    await expect(
      page.getByText("PLANERA", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText("FÖRSTÅ", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText("AGERA", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Varför kan prognosen ha fel?"
      })
    ).toBeVisible();

    const uncertaintyGrid = page.locator(
      ".how-it-works-uncertainty-grid"
    );

    await expect(
      uncertaintyGrid.getByText("VÄDER", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      uncertaintyGrid.getByText("EFTERFRÅGAN", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      uncertaintyGrid.getByText("PRODUKTION", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      uncertaintyGrid.getByText("ELNÄT", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Testa Predictor"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: "TESTA PREDICTOR →"
      })
    ).toHaveAttribute("href", "/");
  });
});
;
