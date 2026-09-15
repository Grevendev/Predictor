import { test, expect } from "@playwright/test";
import { mockSpotCheck } from "./helpers/mockApi";

test.describe("City search", () => {
  test("should display prediction results for Malmö", async ({ page }) => {
    await mockSpotCheck(page);

    await page.goto("/");

    const cityInput = page.getByRole("textbox", {
      name: "Stad"
    });

    await cityInput.fill("Malmö");

    await page.getByRole("button", {
      name: "Sök"
    }).click();

    await expect(
      page.getByRole("heading", {
        name: "Malmö",
        level: 2
      })
    ).toBeVisible();

    await expect(
      page
        .locator(".energy-area-badge")
        .getByText("SE4", { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText("ELPROGNOS", { exact: true })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Förväntat elpris"
      })
    ).toBeVisible();
  });
});