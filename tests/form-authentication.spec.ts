import { test, expect } from '@playwright/test';

test.describe('Form Authentication', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('https://the-internet.herokuapp.com/login');
    });

    test('successful login with valid credentials', async ({ page }) => {
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'SuperSecretPassword!');
        await page.click('button[type="submit"]');

        await expect(page.locator('#flash')).toContainText('You logged into a secure area');
        await expect(page).toHaveURL(/.*secure/);
    })

    test('shows error with invalid username', async ({ page }) => {
        await page.fill('#username', 'wronguser');
        await page.fill('#password', 'SuperSecretPassword!');
        await page.click('button[type="submit"]');

        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    })

    test('shows error with invalid password', async ({ page }) => {
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'wrongpassword');
        await page.click('button[type="submit"]');

        await expect(page.locator('#flash')).toContainText('Your password is invalid!');
    });

    test('shows error when fields are empty', async ({ page }) => {
        await page.click('button[type="submit"]');
        
        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    })

    test('logs out successfully', async ({ page }) => {
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'SuperSecretPassword!');
        await page.click('button[type="submit"]');

        await expect(page.locator('#flash')).toContainText('You logged into a secure area');
        await expect(page).toHaveURL(/.*secure/);

        await page.click('a[href="/logout"]');

        await expect(page.locator('#flash')).toContainText('You logged out of the secure area');
        await expect(page).toHaveURL(/.*login/);
});



})