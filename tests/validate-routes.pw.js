import { test } from "@playwright/test";

const routes = [
  { name: "songs", path: "/", label: "Songs" },
  { name: "artists", path: "/artists", label: "Artists" },
  { name: "newartists", path: "/newartists", label: "New artists" },
];

test.describe("validate routes", () => {
  for (const route of routes) {
    test(`validates ${route.name}`, async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.getByRole("link", { name: route.label, exact: true }).click();
      await page.waitForURL(route.path);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `test-results/validate-routes/${route.name}.png`,
        fullPage: true,
      });
    });
  }
});
