import { test, expect } from "@playwright/test";

test.describe("Maintenance Record Tests", () => {
  test("Should create new maintenance record", async ({ page }) => {
    await page.goto("/maintenance");
    await page.click("text=Add Maintenance Record");
    await page.fill('input[name="equipment"]', "Equipment A");
    await page.fill('input[name="date"]', "2023-01-01");
    await page.fill('input[name="type"]', "Routine");
    await page.fill('input[name="technician"]', "Technician A");
    await page.fill('input[name="hoursSpent"]', "5");
    await page.fill('input[name="description"]', "Routine maintenance");
    await page.fill('input[name="partsReplaced"]', "Part A");
    await page.selectOption('select[name="priority"]', "High");
    await page.selectOption('select[name="completionStatus"]', "Completed");
    await page.click("text=Save");
    await expect(page.locator("text=Routine maintenance")).toHaveText(
      "Routine maintenance"
    );
  });

  test("Should validate maintenance hours (reject negative/over 24)", async ({
    page,
  }) => {
    await page.goto("/maintenance");
    await page.click("text=Add Maintenance Record");
    await page.fill('input[name="hoursSpent"]', "-1");
    await page.click("text=Save");
    await expect(
      page.locator("text=Hours spent must be between 0 and 24")
    ).toHaveText("Hours spent must be between 0 and 24");
    await page.fill('input[name="hoursSpent"]', "25");
    await page.click("text=Save");
    await expect(
      page.locator("text=Hours spent must be between 0 and 24")
    ).toHaveText("Hours spent must be between 0 and 24");
  });

  test("Should show equipment name in maintenance table", async ({ page }) => {
    await page.goto("/maintenance");
    await expect(page.locator("text=Equipment A")).toHaveText("Equipment A");
  });

  test("Should filter maintenance records by date range", async ({ page }) => {
    await page.goto("/maintenance");
    await page.fill('input[placeholder="Start Date"]', "2023-01-01");
    await page.fill('input[placeholder="End Date"]', "2023-12-31");
    await expect(page.locator("text=Routine maintenance")).toContainText(
      "Routine maintenance"
    );
  });
});
