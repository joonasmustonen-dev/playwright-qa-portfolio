import { test, expect } from '@playwright/test';


test.describe('Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
  });

  test('default option is selected on page load', async ({ page }) => {
    await expect(page.locator('#dropdown')).toHaveValue('');
  });

  test('selecting Option 1 updates the selected value', async ({ page }) => {
    await page.selectOption('#dropdown', '1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
  });

  test('selecting Option 2 updates the selected value', async ({ page }) => {
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
  });
});