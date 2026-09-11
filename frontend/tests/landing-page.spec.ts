import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("should display the main landing page elements", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "PREDICTOR" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Använd elen när/
      })
    ).toBeVisible();

    await expect(
      page.getByRole("textbox", { name: "Stad" })
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Sök" })
    ).toBeVisible();

    await expect(
      page.getByText("Electricity Predictor")
    ).toBeVisible();
  });
});