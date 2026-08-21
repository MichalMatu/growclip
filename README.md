# GrowClip Marketing Site

Public marketing/demo site for **GrowClip**, a private ESP32-S3 local automation platform.

The firmware, device authentication, API implementation and full Nodeflow runtime remain private. This repository contains the standalone public-facing site, marketing-only LiteGraph demo and public mockups.

**Live site:** https://michalmatu.github.io/growclip/

## Stack

- SvelteKit 2 + static adapter
- Svelte 5
- Vite 5
- TypeScript
- Tailwind CSS 4 + DaisyUI
- Vitest content checks
- Playwright + Axe smoke, responsive, visual and accessibility tests

## Run locally

```bash
npm ci
npm run dev
```

Verification:

```bash
npm run check
npm run test
npm run build
```

Additional browser checks are available through the Playwright scripts in `package.json`.

## GitHub Pages

Production builds use the `/growclip` base path. `.github/workflows/pages.yml` builds the static SvelteKit output and deploys the `build/` directory to GitHub Pages.

## Content

The original public product copy is kept in `src/lib/content/product-base.ts`. `src/lib/content/product.ts` is a small public-site adapter that adds the GitHub Pages asset prefix and the public contact address.

The site supports Polish and English and includes the original light/dark theme behavior.

## Media

Public media lives in `static/media/`, including the hero artwork, product concept, web panel, Nodeflow flow, timeline and archive mockups.

## LiteGraph demo

The demo under `src/lib/features/litegraph/` is marketing-only. It does not connect to an ESP32, save device flows, call private APIs or expose the full private Nodeflow runtime.
