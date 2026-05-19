import { test, expect } from "@playwright/test";

test.describe("RFQ flow", () => {
  test("homepage renders and CTA navigates to RFQ", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /commercial/i,
    );
    await page.getByRole("link", { name: /request a quote/i }).first().click();
    await expect(page).toHaveURL(/\/rfq$/);
    await expect(
      page.getByRole("heading", { name: /send us your project/i }),
    ).toBeVisible();
  });

  test("user can complete the four-step RFQ form", async ({ page }) => {
    await page.goto("/rfq");

    // Step 1 - basics
    await page.selectOption('select[id="market"]', "industrial");
    await page.fill('input[id="projectName"]', "Smoke Test Project");
    await page.fill('input[id="city"]', "Alexandria");
    await page.fill('input[id="state"]', "LA");
    await page.selectOption('select[id="targetStart"]', "30-90 days");
    await page.getByRole("button", { name: /continue to scope/i }).click();

    // Step 2 - scope
    await page.getByRole("button", { name: /mass excavation/i }).click();
    await page.fill('input[id="size"]', "42");
    await page.selectOption('select[id="sizeUnit"]', "acres");
    await page.fill(
      'textarea[id="notes"]',
      "Playwright smoke test - please ignore.",
    );
    await page.getByRole("button", { name: /continue to documents/i }).click();

    // Step 3 - documents (skip)
    await page.getByRole("button", { name: /skip for now/i }).click();

    // Step 4 - contact
    await page.fill('input[id="fullName"]', "Test User");
    await page.selectOption('select[id="role"]', "General Contractor");
    await page.fill('input[id="company"]', "Smoke & Mirrors LLC");
    await page.fill('input[id="email"]', "smoke@example.com");
    await page.fill('input[id="phone"]', "(318) 555-0100");
    await page.check('input[type="checkbox"]');
    await page.getByRole("button", { name: /submit request/i }).click();

    await expect(page).toHaveURL(/\/rfq\/thank-you/);
    await expect(page.getByText(/quote request received/i)).toBeVisible();
    await expect(page.getByText(/SWS-/)).toBeVisible();
  });

  test("validation blocks empty contact submit", async ({ page }) => {
    await page.goto("/rfq");
    await page.getByRole("button", { name: /continue to scope/i }).click();
    await expect(page.getByText(/pick a market/i)).toBeVisible();
  });
});
