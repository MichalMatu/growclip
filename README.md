# GrowClip Marketing Site

Static single-page product site for GrowClip. It is intentionally separate from
`interface/`: this project markets the product and contains no ESP32 API proxy,
auth flow, firmware build hooks or Nodeflow device runtime.

## Stack

- SvelteKit 2 with static adapter
- Svelte 5
- Vite 5
- TypeScript
- Tailwind CSS 4 + DaisyUI
- Vitest for content checks
- Playwright + Axe for Chromium smoke, responsive, visual and a11y checks

## Run

```bash
cd marketing-site
npm install
npm run dev
```

Verification:

```bash
npm run check
npm run lint
npm run test
npm run test:e2e
npm run test:e2e:a11y
npm run build
npm run diagnose
```

Playwright notes:

- `npm run test:e2e` starts Vite on `127.0.0.1:4174` and runs Chromium.
- `npm run test:e2e:a11y` reports WCAG 2 A/AA serious/critical rule IDs without failing
  the run. Use `npm run test:e2e:a11y:strict` when the page is ready to enforce zero
  serious/critical violations.
- `npm run test:e2e:visual` attaches desktop and mobile screenshots for the hero, demo
  and final beta CTA to the local HTML report in `playwright-report/`.
- On the current macOS sandbox, Chromium may need to run outside the Codex command sandbox;
  otherwise Playwright can fail with a MachPort permission error.

## Content

All public copy lives in `src/lib/content/product.ts`.

- `Locale` is currently `pl | en`.
- `getProductContent()` falls back to Polish for unsupported locale values.
- `tests/content.test.ts` verifies PL/EN shape parity, fallback, key differentiator
  copy and static media slot existence.
- Contact CTA currently uses `mailto:hello@example.com?subject=GrowClip%20growbox%20setup`.

## Media Slots

The site ships with a generated hero image, a cropped beta-module reference photo
and deterministic SVG mockups for product surfaces:

- `static/media/growclip-hero.webp` - generated commercial hero background for the first viewport.
- `static/media/crowpanel-beta-module.jpg` - cropped reference photo of the e-paper HMI module used for the first beta base.
- `static/media/growclip-device-concept.svg` - product/enclosure concept mockup.
- `static/media/panel-mockup.svg` - web dashboard/status mockup.
- `static/media/flow-mockup.svg` - LiteGraph/Nodeflow flow mockup.
- `static/media/timeline-mockup.svg` - Automation Timeline / microSD decision history mockup.
- `static/media/automation-archive-mockup.svg` - Automation Archive sensor and decision trend mockup.
- `static/media/reference/application_of_2.9inch_e-paper_hmi_display.webp` - reference-only e-paper HMI display image. It is retained as source material and is not currently referenced by rendered site content.

Keep filenames stable if you only want to replace the visuals. If filenames
change, update `media[]` in `src/lib/content/product.ts`.

## LiteGraph Demo

The demo is lazy-loaded when the section nears the viewport. It imports only
`src/lib/features/litegraph/vendor/litegraph.js`, copied from the existing
interface vendor bundle. It registers marketing-only mock nodes and does not
connect to ESP32, save flows, call APIs or reuse the full Nodeflow runtime.
