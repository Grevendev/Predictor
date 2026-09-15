import type { Page } from "@playwright/test";

export async function mockSpotCheck(page: Page): Promise<void> {
  await page.route("**/api/v1/spot-check?location=Malm%C3%B6", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        name: "Malmö",
        country: "Sverige",
        country_code: "SE",
        latitude: 55.605,
        longitude: 13.0038,
        zone: {
          code: "SE4",
          name: "Södra Sverige",
          description: "Elområde SE4 omfattar södra Sverige."
        }
      })
    });
  });
}