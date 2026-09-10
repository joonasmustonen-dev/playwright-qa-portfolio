import { test, expect } from '@playwright/test';

test.describe('Dynamic Loading', () => {
    test('Example 1: element becomes visible after loading', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

        await page.click('button');

        await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });
        await expect(page.locator('#finish')).toContainText('Hello World!');
    })
})

test('Example 2: element is added to the DOM after loading', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

  await page.click('button');

  // wait for the element to exist in the DOM at all
  await expect(page.locator('#finish')).toBeAttached({ timeout: 10000 });

  // now that it exists, we can also confirm it's visible and has the right text
  await expect(page.locator('#finish')).toBeVisible();
  await expect(page.locator('#finish')).toContainText('Hello World!');
});