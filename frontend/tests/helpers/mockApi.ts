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
          city: "Malmö",
          country: "Sverige",
          country_code: "SE",
          latitude: 55.605,
          longitude: 13.0038,
          energyArea: "SE4",
          zone: {
            code: "SE4",
            name: "Södra Sverige",
            description: "Elområde SE4 omfattar södra Sverige."
          },
          unit: "öre/kWh",
          has_tomorrow_data: true,
          current_price: 31.5,
          is_now_optimal: false,
          lowest_price: 24.2,
          lowest_price_time: "2026-09-17T03:00:00",
          predictions: [
            {
              timestamp: "03:00",
              raw_timestamp: "2026-09-17T03:00:00",
              predictedPrice: 24.2,
              isHistorical: false,
              isCurrentHour: false,
              isOptimal: true,
              day: "today"
            },
            {
              timestamp: "12:00",
              raw_timestamp: "2026-09-17T12:00:00",
              predictedPrice: 31.5,
              isHistorical: false,
              isCurrentHour: true,
              isOptimal: false,
              day: "today"
            },
            {
              timestamp: "18:00",
              raw_timestamp: "2026-09-17T18:00:00",
              predictedPrice: 38.7,
              isHistorical: false,
              isCurrentHour: false,
              isOptimal: false,
              day: "today"
            }
          ]
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