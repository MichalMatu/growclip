const { defineConfig, devices } = require('@playwright/test');

if (process.env.FORCE_COLOR && process.env.NO_COLOR) {
	delete process.env.NO_COLOR;
}

const devHost = process.env.E2E_DEV_HOST || '127.0.0.1';
const devPort = Number(process.env.E2E_DEV_PORT || 4174);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://${devHost}:${devPort}`;

module.exports = defineConfig({
	testDir: './tests/playwright',
	timeout: 30_000,
	retries: 0,
	reporter: [['list'], ['html', { open: 'never' }]],
	use: {
		baseURL,
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	],
	webServer: {
		command: `npm run dev -- --host ${devHost} --port ${devPort}`,
		port: devPort,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
