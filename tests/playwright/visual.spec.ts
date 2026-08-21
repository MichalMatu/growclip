import { expect, test, type Locator, type Page, type TestInfo } from '@playwright/test';

const screenshotViewports = [
	{ name: 'desktop', width: 1440, height: 920 },
	{ name: 'mobile', width: 390, height: 844 }
] as const;

async function attachScreenshot(testInfo: TestInfo, name: string, locator: Locator) {
	await locator.scrollIntoViewIfNeeded();
	const image = await locator.screenshot({ animations: 'disabled' });

	expect(image.byteLength).toBeGreaterThan(10_000);
	await testInfo.attach(`${name}.png`, {
		body: image,
		contentType: 'image/png'
	});
}

async function betaSection(page: Page) {
	return page
		.getByRole('link', { name: /Zapytaj o beta moduł/i })
		.locator('xpath=ancestor::section[1]');
}

async function ensureDemoReady(page: Page) {
	await page.locator('#demo').scrollIntoViewIfNeeded();
	await expect(page.locator('#demo canvas')).toBeVisible({ timeout: 10_000 });
}

test.describe('Marketing visual captures', () => {
	for (const viewport of screenshotViewports) {
		test(`${viewport.name} hero, demo and final CTA screenshots`, async ({ page }, testInfo) => {
			await page.setViewportSize(viewport);
			await page.goto('/');
			await page.waitForLoadState('networkidle');

			await attachScreenshot(
				testInfo,
				`${viewport.name}-hero`,
				page.locator('main > section').first()
			);
			await ensureDemoReady(page);
			await attachScreenshot(testInfo, `${viewport.name}-demo`, page.locator('#demo'));
			await attachScreenshot(testInfo, `${viewport.name}-final-cta`, await betaSection(page));
		});
	}
});
