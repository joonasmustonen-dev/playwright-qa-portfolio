import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Upload', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
    });

    test('successfully uploads a valid file', async ({ page }) => {
        const filePath = path.join(__dirname, '..', 'test-data', 'sample-upload.txt');

        await page.setInputFiles('#file-upload', filePath);
        await page.click('#file-submit');

        await expect(page.locator('h3')).toContainText('File Uploaded!');
        await expect(page.locator('#uploaded-files')).toContainText('sample-upload.txt');
    });
    test('submitting with no file selected results in a server error', async ({ page }) => {
    // Documents observed behavior: no client-side validation
    // exists, and the server returns an error rather than a 
    // validation message. See bug report in docs/bug-reports.md.
        await page.click('#file-submit');

        await expect(page.locator('body')).toContainText(/Internal Server Error/i);
    });

});
