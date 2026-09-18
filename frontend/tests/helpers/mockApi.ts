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

export async function mockWeeklyForecast(page: Page): Promise<void> {
  await page.route(
    "**/api/v1/predictions/weekly-forecast?zone=SE4",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          zone: "SE4",
          days: [
            {
              date: "2026-09-17",
              day_name: "Torsdag",
              predicted_price: 28,
              classification: "low",
              recommended: true,
              weather: {
                temperature_c: 16,
                wind_speed_kmh: 24,
                rain_mm: 2,
              },
              energy_area: "SE4"
            },
            {
              date: "2026-09-18",
              day_name: "Fredag",
              predicted_price: 36,
              classification: "medium",
              recommended: false,
              weather: {
                temperature_c: 17,
                wind_speed_kmh: 18,
                rain_mm: 5,
              },
              energy_area: "SE4"
            },
            {
              date: "2026-09-19",
              day_name: "Lördag",
              predicted_price: 42,
              classification: "high",
              recommended: false,
              weather: {
                temperature_c: 15,
                wind_speed_kmh: 14,
                rain_mm: 1,
              },
              energy_area: "SE4"
            }
          ],
          recommendation: {
            title: "Bästa dagarna",
            text: "Prognosen visar att torsdag är den bästa kommande dagen för flexibel elanvändning.",
            best_days: ["Torsdag"]
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