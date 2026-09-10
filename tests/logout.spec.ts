import { test, expect } from '../fixtures/auth.fixture';

test.describe('Logout', () => {
  test('logs out successfully', async ({ loggedInPage }) => {
    await loggedInPage.click('a[href="/logout"]');

    await expect(loggedInPage.locator('#flash')).toContainText('You logged out of the secure area');
    await expect(loggedInPage).toHaveURL(/.*login/);
  });
});