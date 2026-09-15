
import {
  test,
  expect
} from "@playwright/test";

test.describe("Mobile navigation", () => {
  test("should open and close the mobile navigation menu", async ({
    page
  }) => {
    await page.goto("/");

    const viewport = page.viewportSize();

    if (viewport && viewport.width > 700) {
      test.skip(
        true,
        "Mobile navigation is only tested on mobile"
      );
    }

    const menuButton = page.getByRole("button", {
      name: "Öppna meny"
    });

    await expect(menuButton).toBeVisible();

    const navigation = page.locator(".site-navigation");

    await expect(
      navigation
    ).not.toHaveClass(/is-open/);

    await menuButton.click();

    await expect(
      page.getByRole("button", {
        name: "Stäng meny"
      })
    ).toBeVisible();

    await expect(
      navigation
    ).toHaveClass(/is-open/);

    await expect(
      navigation.getByRole("link", {
        name: "Hem"
      })
    ).toBeVisible();

    await expect(
      navigation.getByRole("link", {
        name: "Om"
      })
    ).toBeVisible();

    await expect(
      navigation.getByRole("link", {
        name: "Så fungerar det"
      })
    ).toBeVisible();

    await page.getByRole("button", {
      name: "Stäng meny"
    }).click();

    await expect(
      page.getByRole("button", {
        name: "Öppna meny"
      })
    ).toBeVisible();

    await expect(
      navigation
    ).not.toHaveClass(/is-open/);
  });
});
;
