import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const STRICT = process.env.A11Y_STRICT === '1';

const pagesUnderTest = [
	{ name: 'home', path: '/' },
	{ name: 'demo', path: '/#demo' },
	{ name: 'hardware', path: '/#hardware' },
	{ name: 'faq', path: '/#faq' }
] as const;

test.describe('Accessibility smoke (WCAG 2 A/AA)', () => {
	for (const { name, path } of pagesUnderTest) {
		test(`${name} scan`, async ({ page }) => {
			await page.goto(path);
			await page.waitForLoadState('networkidle');

			const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
			const blocking = results.violations.filter(
				(violation) => violation.impact === 'critical' || violation.impact === 'serious'
			);
			const ruleIds = Array.from(new Set(blocking.map((violation) => violation.id))).sort();

			console.log(
				`[a11y] ${name}: ${ruleIds.length} distinct serious/critical rule(s): ${JSON.stringify(ruleIds)}`
			);

			if (STRICT) {
				expect(blocking).toEqual([]);
			}
		});
	}
});
