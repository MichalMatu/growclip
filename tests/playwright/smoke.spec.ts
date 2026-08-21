import { expect, test } from '@playwright/test';

test.describe('GrowClip marketing smoke', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
	});

	test('renders the core sales path and primary CTAs', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'GrowClip', exact: true })).toBeVisible();
		await expect(page.getByText(/Automatyzacja growboxa, która działa lokalnie/i)).toBeVisible();
		await expect(page.getByText(/Limitowana beta/i)).toBeVisible();

		const primaryCtas = page.getByRole('link', { name: /Opisz swój growbox/i });
		await expect(primaryCtas.first()).toBeVisible();
		await expect(primaryCtas.first()).toHaveAttribute('href', /^mailto:/);

		await page.getByRole('link', { name: /Zobacz demo flow/i }).click();
		await expect(page.getByRole('heading', { name: /Zobacz język flow/i })).toBeVisible();
		await expect(page.locator('#demo canvas')).toBeVisible();

		await expect(
			page.getByRole('heading', { name: /Krótko, bez obietnic ponad stan/i })
		).toBeVisible();
	});

	test('supports language and theme controls', async ({ page }) => {
		await page.getByRole('button', { name: 'Ciemny' }).click();
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');

		await page.getByRole('button', { name: 'Jasny' }).click();
		await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'light');

		await page.getByRole('button', { name: 'EN', exact: true }).click();
		await expect(page.getByRole('heading', { name: 'GrowClip', exact: true })).toBeVisible();
		await expect(
			page.getByText(/Local growbox automation that shows the rule as a flow/i)
		).toBeVisible();
		await expect(page.getByRole('link', { name: /Describe your growbox/i }).first()).toBeVisible();

		await page.getByRole('button', { name: 'PL', exact: true }).click();
		await expect(page.getByRole('heading', { name: 'GrowClip', exact: true })).toBeVisible();
	});
});
