import { test, expect } from "@playwright/test";

test.describe("Equipment Management Tests", () => {
  test("Should create new equipment with valid data", async ({ page }) => {
    await page.goto("/equipment");
    await page.click("text=Add Equipment");
    await page.fill('input[name="name"]', "New Equipment");
    await page.fill('input[name="location"]', "Location A");
    await page.fill('input[name="department"]', "Department A");
    await page.fill('input[name="model"]', "Model X");
    await page.fill('input[name="serialNumber"]', "123456");
    await page.fill('input[name="installDate"]', "2023-01-01");
    await page.selectOption('select[name="status"]', "Operational");
    await page.click("text=Save");
    await expect(page.locator("text=New Equipment")).toHaveText(
      "New Equipment"
    );
  });

  test("Should show validation errors for invalid equipment data", async ({
    page,
  }) => {
    await page.goto("/equipment");
    await page.click("text=Add Equipment");
    await page.fill('input[name="name"]', "");
    await page.click("text=Save");
    await expect(page.locator("text=Name is required")).toHaveText(
      "Name is required"
    );
  });

  test("Should edit existing equipment", async ({ page }) => {
    await page.goto("/equipment");
    await page.locator("text=Existing Equipment").click();
    await page.fill('input[name="name"]', "Updated Equipment");
    await page.click("text=Save");
    await expect(page.locator("text=Updated Equipment")).toHaveText(
      "Updated Equipment"
    );
  });

  test("Should filter equipment table", async ({ page }) => {
    await page.goto("/equipment");
    await page.fill('input[placeholder="Filter Name"]', "Equipment A");
    await expect(page.locator("text=Equipment A")).toHaveText("Equipment A");
  });
});
