import { test as base, expect } from '@playwright/test';

// Extend base test with fixture "loggedInPage"
export const test = base.extend<{ loggedInPage: import('@playwright/test').Page }>({
    loggedInPage: async ({ page }, use) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'SuperSecretPassword!');
        await page.click('button[type="submit"]');   

        await expect(page.locator('#flash')).toContainText('You logged into a secure area');
        await expect(page).toHaveURL(/.*secure/);

        await use(page);
    }
});

export { expect }