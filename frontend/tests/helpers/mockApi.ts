import type { Page } from "@playwright/test";

export async function mockSpotCheck(page: Page): Promise<void> {
  await page.route(
    "**/api/v1/spot-check?location=Malm%C3%B6",
    async (route) => {
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
    }
  );
}

export async function mockEnergyAreas(page: Page): Promise<void> {
  await page.route(
    "**/api/v1/energy-areas",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                energy_area: "SE1"
              },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [20.0, 69.0],
                  [24.0, 69.0],
                  [24.0, 64.5],
                  [20.0, 64.5],
                  [20.0, 69.0]
                ]]
              }
            },
            {
              type: "Feature",
              properties: {
                energy_area: "SE2"
              },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [15.0, 64.5],
                  [20.0, 64.5],
                  [20.0, 61.5],
                  [15.0, 61.5],
                  [15.0, 64.5]
                ]]
              }
            },
            {
              type: "Feature",
              properties: {
                energy_area: "SE3"
              },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [14.0, 61.5],
                  [20.0, 61.5],
                  [20.0, 57.0],
                  [14.0, 57.0],
                  [14.0, 61.5]
                ]]
              }
            },
            {
              type: "Feature",
              properties: {
                energy_area: "SE4"
              },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [12.0, 57.0],
                  [16.0, 57.0],
                  [16.0, 55.0],
                  [12.0, 55.0],
                  [12.0, 57.0]
                ]]
              }
            }
          ]
        })
      });
    }
  );
}