import { expect, test } from "@playwright/test"

// Test for the dashboard title
test("has dashboard title", async ({ page }) => {
  await page.goto("./")
  await expect(page).toHaveTitle(/Panou de control - Optima Solutions Services/)
})

// Test for the login title
test("has login title", async ({ page }) => {
  await page.goto("/login") // Adjust path if necessary
  await expect(page).toHaveTitle(/Login - Optima Solutions Services/)
})

// Test for the clients title
test("has clients title", async ({ page }) => {
  await page.goto("/customers") // Adjust path if necessary
  await expect(page).toHaveTitle(/Clientii - Optima Solutions Services/)
})
