import { expect, test, type Page } from '@playwright/test';

const viewports = [
	{ name: 'desktop', width: 1440, height: 920 },
	{ name: 'mobile', width: 390, height: 844 }
] as const;

async function expectNoHorizontalOverflow(page: Page) {
	const overflow = await page.evaluate(() => ({
		clientWidth: document.documentElement.clientWidth,
		scrollWidth: document.documentElement.scrollWidth
	}));

	expect(overflow.scrollWidth - overflow.clientWidth).toBeLessThanOrEqual(1);
}

async function expectVisibleTextWithinViewport(page: Page) {
	const offenders = await page
		.locator('h1, h2, h3, p, a, button, summary')
		.evaluateAll((elements) => {
			const viewportWidth = document.documentElement.clientWidth;

			return elements
				.map((element) => {
					const style = window.getComputedStyle(element);
					const rect = element.getBoundingClientRect();
					const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
					const isVisible =
						style.visibility !== 'hidden' &&
						style.display !== 'none' &&
						rect.width > 1 &&
						rect.height > 1;

					return {
						text,
						left: rect.left,
						right: rect.right,
						isVisible
					};
				})
				.filter(
					(item) =>
						item.isVisible &&
						item.text.length > 0 &&
						(item.left < -1 || item.right > viewportWidth + 1)
				);
		});

	expect(offenders).toEqual([]);
}

test.describe('Marketing responsive layout', () => {
	for (const viewport of viewports) {
		test(`${viewport.name} has no horizontal overflow or clipped visible text`, async ({
			page
		}) => {
			await page.setViewportSize(viewport);
			await page.goto('/');
			await page.waitForLoadState('networkidle');

			await expectNoHorizontalOverflow(page);
			await expectVisibleTextWithinViewport(page);
			await expect(page.getByRole('link', { name: /Opisz swój growbox/i }).first()).toBeVisible();

			await page.locator('#demo').scrollIntoViewIfNeeded();
			await expectNoHorizontalOverflow(page);
			await expect(page.locator('#demo canvas')).toBeVisible();

			await page.locator('#faq').scrollIntoViewIfNeeded();
			await expectNoHorizontalOverflow(page);
		});
	}
});
