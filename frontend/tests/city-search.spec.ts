import { test, expect } from "@playwright/test";

test.describe("City search", () => {
  test("should display prediction results for Malmö", async ({ page }) => {
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
        name: "Malmö"
      })
    ).toBeVisible();

    await expect(
      page.getByText("SE4")
    ).toBeVisible();

    await expect(
      page.getByText("ELPROGNOS")
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Förväntat elpris"
      })
    ).toBeVisible();
  });
});