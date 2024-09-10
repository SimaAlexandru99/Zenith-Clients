import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("./")

  await expect(page).toHaveTitle(/Overview - Optima Solutions Services/)
  await expect(page).toHaveTitle(/Login - Optima Solutions Services/)
  await expect(page).toHaveTitle(/Customers - Optima Solutions Services/)
})
