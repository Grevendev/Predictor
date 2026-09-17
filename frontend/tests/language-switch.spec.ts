import { test, expect } from "@playwright/test";

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
});