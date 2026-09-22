import { test, expect } from "@playwright/test";

import { mockEnergyAreas } from "./helpers/mockApi";

test.describe("About page", () => {
  test("should display the main About page sections", async ({ page }) => {
    await mockEnergyAreas(page);

    await page.goto("/about");

    await expect(
      page.getByRole("heading", {
        name: /Förstå elpriset/
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Sverige är indelat i fyra elområden"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Varför förändras elpriset?"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Vad är en elprisprognos?"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Från prognos till beslut"
      })
    ).toBeVisible();
  });

  test("should display the energy area map", async ({ page }) => {
    await mockEnergyAreas(page);

    await page.goto("/about");

    await expect(
      page.getByRole("img", {
        name: "Sveriges fyra elområden"
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "SE1",
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "SE2",
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "SE3",
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "SE4",
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText("SE1 · SE2 · SE3 · SE4", {
        exact: true
      })
    ).toBeVisible();
  });

  test("should display information when selecting an energy area", async ({
    page
  }) => {
    await mockEnergyAreas(page);

    await page.goto("/about");

    const energyAreaInfo =
      page.locator(".energy-area-info-column");

    await expect(
      energyAreaInfo.getByText("VÄLJ ELOMRÅDE", {
        exact: true
      })
    ).toBeVisible();

    await page.getByRole("button", {
      name: "SE4",
      exact: true
    }).click();

    await expect(
      page.getByText("VALT ELOMRÅDE", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      page.getByText("SE4", {
        exact: true
      }).first()
    ).toBeVisible();

    await expect(
      energyAreaInfo.getByText("Södra Sverige", {
        exact: true
      })
    ).toBeVisible();
  });

  test("should display an error when the energy area map cannot be loaded", async ({
    page
  }) => {
    await page.route(
      "**/energy-areas*",
      async (route) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            detail: "Kunde inte hämta elområden."
          })
        });
      }
    );

    await page.goto("/about");

    await expect(
      page.getByRole("alert")
    ).toHaveText("Kartan kunde inte laddas.");
  });
});
;
