import { test, expect } from "@playwright/test";
import { mockSpotCheck } from "./helpers/mockApi";

test.describe("Prediction results", () => {
  test("should display prediction results after searching for Malmö", async ({
    page
  }) => {
    await mockSpotCheck(page);

    await page.goto("/");

    await page.getByRole("textbox", {
      name: "Stad"
    }).fill("Malmö");

    await page.getByRole("button", {
      name: "Sök"
    }).click();

    const results = page.getByRole("region", {
      name: "Elprisprognos"
    });

    await expect(results).toBeVisible();

    await expect(
      results.getByText("Elområde", {
        exact: true
      })
    ).toBeVisible();

    await expect(
      results
        .locator(".energy-area-badge")
        .getByText("SE4", { exact: true })
    ).toBeVisible();

    await expect(
      results.getByRole("heading", {
        name: "Malmö",
        level: 2
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

    await expect(
      results.getByRole("heading", {
        name: "Spara pengar"
      })
    ).toBeVisible();

    await expect(
      results.getByText("Kör tvättmaskin och diskmaskin", {
        exact: false
      })
    ).toBeVisible();

    await expect(
      results.getByText("Ladda elbilen under billigare timmar", {
        exact: false
      })
    ).toBeVisible();

    await expect(
      results.getByText(
        "Försök undvika flera stora elförbrukare samtidigt",
        {
          exact: false
        }
      )
    ).toBeVisible();
  });
});