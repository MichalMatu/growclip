import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import {
	contactHref,
	getProductContent,
	productContent,
	resolveLocale
} from '../src/lib/content/product';

function shapeOf(value: unknown): unknown {
	if (Array.isArray(value)) {
		return value.map((entry) => shapeOf(entry));
	}
	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([key, nestedValue]) => [key, shapeOf(nestedValue)])
		);
	}
	return typeof value;
}

function flattenText(value: unknown): string {
	if (Array.isArray(value)) {
		return value.map((entry) => flattenText(entry)).join(' ');
	}
	if (value && typeof value === 'object') {
		return Object.values(value)
			.map((entry) => flattenText(entry))
			.join(' ');
	}
	return typeof value === 'string' ? value : '';
}

describe('product content', () => {
	it('keeps Polish and English content structurally aligned', () => {
		expect(shapeOf(productContent.en)).toEqual(shapeOf(productContent.pl));
	});

	it('falls back to Polish for unsupported locale values', () => {
		expect(resolveLocale('de')).toBe('pl');
		expect(resolveLocale(null)).toBe('pl');
		expect(getProductContent('de')).toBe(productContent.pl);
	});

	it('keeps the required hero copy in both languages', () => {
		expect(productContent.pl.hero.title).toBe('GrowClip');
		expect(productContent.en.hero.title).toBe('GrowClip');
		expect(productContent.pl.hero.headline).toContain('Automatyzacja growboxa');
		expect(productContent.en.hero.headline).toContain('Local growbox automation');
		expect(productContent.pl.hero.copy).toContain('Input -> Processing -> Output');
		expect(productContent.en.hero.copy).toContain('Input -> Processing -> Output');
	});

	it('uses concrete CTA copy for the beta contact path', () => {
		expect(productContent.pl.hero.primaryCta).toBe('Opisz swój growbox');
		expect(productContent.en.hero.primaryCta).toBe('Describe your growbox');
		expect(productContent.pl.beta.primaryCta).toBe('Zapytaj o beta moduł');
		expect(productContent.en.beta.primaryCta).toBe('Ask about the beta module');
		expect(contactHref).toContain('growbox%20setup');
	});

	it('keeps demo flow examples aligned across locales', () => {
		expect(productContent.en.demo.examples.map((example) => example.id)).toEqual(
			productContent.pl.demo.examples.map((example) => example.id)
		);
		expect(productContent.pl.demo.examples.map((example) => example.id)).toEqual([
			'climate',
			'nightHumidity',
			'mqttBridge',
			'safetyAlert'
		]);
	});

	it('keeps the core differentiators visible in both languages', () => {
		for (const content of [productContent.pl, productContent.en]) {
			const text = flattenText(content);
			expect(text).toContain('MQTT');
			expect(text).toContain('GPIO');
			expect(text).toContain('touchRead');
			expect(text).toContain('microSD');
			expect(text).toContain('Automation Timeline');
			expect(text).toContain('Rule Telemetry');
			expect(text).toContain('SCD41');
			expect(text).toContain('DHT22');
			expect(text).toContain('BME680');
			expect(text).toContain('SGP30');
			expect(text).toContain('DS18B20');
			expect(text).toContain('BLE Presence');
			expect(text).toContain('BLE Beacon');
			expect(text).toContain('PVVX');
			expect(text).toContain('Device Webhooks');
			expect(text).toContain('Discord');
			expect(text).toContain('Text to Speech');
		}
	});

	it('keeps the growbox workflow concrete in both languages', () => {
		expect(flattenText(productContent.pl.workflow)).toContain('VPD');
		expect(flattenText(productContent.pl.workflow)).toContain('touchRead');
		expect(flattenText(productContent.en.workflow)).toContain('VPD');
		expect(flattenText(productContent.en.workflow)).toContain('touchRead');
	});

	it('explains positioning and beta scope before the contact path', () => {
		for (const content of [productContent.pl, productContent.en]) {
			expect(content.comparison.items).toHaveLength(3);
			expect(flattenText(content.comparison)).toContain('MQTT');
			expect(content.beta.includes).toHaveLength(4);
			expect(flattenText(content.beta.includes)).toContain('Automation Timeline');
			expect(flattenText(content.beta.includes)).toContain('Rule Telemetry');
		}
	});

	it('keeps the no-starter-flow boundary visible in both languages', () => {
		expect(flattenText(productContent.pl.demo)).toContain('nie katalog gotowych konfiguracji');
		expect(flattenText(productContent.en.demo)).toContain('not a catalogue');
		expect(flattenText(productContent.pl.faq)).toContain('gotowe presety');
		expect(flattenText(productContent.en.faq)).toContain('ready-to-use presets');
	});

	it('points every media slot to an existing static asset', () => {
		for (const content of [productContent.pl, productContent.en]) {
			expect(content.hero.imageSrc).toMatch(/^\/media\/.+\.(jpg|svg|webp)$/);
			expect(existsSync(join(process.cwd(), 'static', content.hero.imageSrc))).toBe(true);
			for (const slot of content.media) {
				expect(slot.src).toMatch(/^\/media\/.+\.(jpg|svg|webp)$/);
				expect(existsSync(join(process.cwd(), 'static', slot.src))).toBe(true);
			}
		}
	});

	it('does not ship placeholder copy in public media slots', () => {
		for (const content of [productContent.pl, productContent.en]) {
			const text = flattenText(content.media);
			expect(text).not.toMatch(/placeholder|replace with|miejsce na/i);
		}
	});
});
