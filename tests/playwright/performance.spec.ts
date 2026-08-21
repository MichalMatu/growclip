import { expect, test, type Page } from '@playwright/test';

async function resourceNames(page: Page) {
	return page.evaluate(() => performance.getEntriesByType('resource').map((entry) => entry.name));
}

function isLiteGraphResource(url: string) {
	return (
		url.includes('/litegraph/LiteGraphDemo.svelte') ||
		url.includes('/litegraph/demoRuntime.ts') ||
		url.includes('/litegraph/vendor/litegraph.js')
	);
}

test.describe('Marketing runtime sanity', () => {
	test('loads without browser runtime errors and lazy-loads the LiteGraph demo', async ({
		page
	}) => {
		const consoleErrors: string[] = [];
		const pageErrors: string[] = [];

		page.on('console', (message) => {
			if (message.type() === 'error') {
				consoleErrors.push(message.text());
			}
		});
		page.on('pageerror', (error) => pageErrors.push(error.message));

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const resourcesBeforeDemo = await resourceNames(page);
		expect(resourcesBeforeDemo.some(isLiteGraphResource)).toBe(false);

		await page.locator('#demo').scrollIntoViewIfNeeded();
		await expect(page.locator('#demo canvas')).toBeVisible({ timeout: 10_000 });

		await expect
			.poll(
				async () =>
					(await resourceNames(page)).some((url) => url.includes('/litegraph/vendor/litegraph.js')),
				{ timeout: 10_000 }
			)
			.toBe(true);

		const canvasState = await page.locator('#demo canvas').evaluate((canvas: HTMLCanvasElement) => {
			const context = canvas.getContext('2d');
			const width = canvas.width;
			const height = canvas.height;

			if (!context || width === 0 || height === 0) {
				return { width, height, paintedSamples: 0 };
			}

			const sample = context.getImageData(0, 0, width, height).data;
			let paintedSamples = 0;
			const stride = Math.max(4, Math.floor(sample.length / 800));

			for (let index = 0; index < sample.length; index += stride - (stride % 4)) {
				const alpha = sample[index + 3] ?? 0;
				if (alpha > 0) {
					paintedSamples += 1;
				}
			}

			return { width, height, paintedSamples };
		});

		expect(canvasState.width).toBeGreaterThan(100);
		expect(canvasState.height).toBeGreaterThan(100);
		expect(canvasState.paintedSamples).toBeGreaterThan(10);
		expect(pageErrors).toEqual([]);
		expect(consoleErrors).toEqual([]);
	});
});
