<!-- @runes -->
<script lang="ts">
	import { onMount } from 'svelte';
	import ArrowRightIcon from '~icons/tabler/arrow-right';
	import CheckIcon from '~icons/tabler/check';
	import CloudOffIcon from '~icons/tabler/cloud-off';
	import MailIcon from '~icons/tabler/mail';

	import AssetSlot from '$lib/components/AssetSlot.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import ThemeToggle, { type ThemePreference } from '$lib/components/ThemeToggle.svelte';
	import {
		contactHref,
		elecrowHref,
		getProductContent,
		resolveLocale,
		type Locale
	} from '$lib/content/product';

	type LiteGraphDemoComponent =
		typeof import('$lib/features/litegraph/LiteGraphDemo.svelte').default;

	let locale = $state<Locale>('pl');
	let themePreference = $state<ThemePreference>('system');
	let resolvedTheme = $state<'light' | 'dark'>('light');
	let showMobileCta = $state(false);
	let demoRootElement: HTMLElement | null = null;
	let LiteGraphDemoComponent = $state<LiteGraphDemoComponent | null>(null);
	let demoLoadError = $state('');
	const content = $derived(getProductContent(locale));
	let demoImportPromise: Promise<void> | null = null;

	function isThemePreference(value: string | null): value is ThemePreference {
		return value === 'system' || value === 'light' || value === 'dark';
	}

	function resolveTheme(preference: ThemePreference): 'light' | 'dark' {
		if (preference === 'dark') {
			return 'dark';
		}
		if (preference === 'light') {
			return 'light';
		}
		return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(preference: ThemePreference) {
		const nextResolvedTheme = resolveTheme(preference);
		themePreference = preference;
		resolvedTheme = nextResolvedTheme;
		document.documentElement.dataset.themeMode = nextResolvedTheme;
		document.documentElement.dataset.themePreference = preference;
		document.documentElement.style.colorScheme = nextResolvedTheme;
	}

	function loadLiteGraphDemo() {
		if (LiteGraphDemoComponent) {
			return Promise.resolve();
		}
		if (demoImportPromise) {
			return demoImportPromise;
		}

		demoImportPromise = import('$lib/features/litegraph/LiteGraphDemo.svelte')
			.then((module) => {
				LiteGraphDemoComponent = module.default;
				demoLoadError = '';
			})
			.catch((error: unknown) => {
				demoLoadError = error instanceof Error ? error.message : String(error);
			})
			.finally(() => {
				demoImportPromise = null;
			});

		return demoImportPromise;
	}

	onMount(() => {
		const savedLocale = window.localStorage.getItem('growclip.locale');
		const savedTheme = window.localStorage.getItem('growclip.theme');
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let revealObserver: IntersectionObserver | null = null;
		let demoObserver: IntersectionObserver | null = null;
		let parallaxFrame = 0;

		locale = resolveLocale(savedLocale);
		document.documentElement.lang = locale;
		applyTheme(isThemePreference(savedTheme) ? savedTheme : 'system');

		const handleSystemThemeChange = () => {
			if (themePreference === 'system') {
				applyTheme('system');
			}
		};

		const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
		if (reduceMotion.matches) {
			for (const element of revealElements) {
				element.classList.add('is-visible');
			}
		} else {
			revealObserver = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							entry.target.classList.add('is-visible');
							revealObserver?.unobserve(entry.target);
						}
					}
				},
				{ rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
			);
			for (const element of revealElements) {
				revealObserver.observe(element);
			}
		}

		if (demoRootElement) {
			demoObserver = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						void loadLiteGraphDemo();
						demoObserver?.disconnect();
					}
				},
				{ rootMargin: '360px 0px', threshold: 0.01 }
			);
			demoObserver.observe(demoRootElement);
		}

		const updateMobileCta = () => {
			if (window.innerWidth >= 640) {
				showMobileCta = false;
				return;
			}

			const hero = document.querySelector<HTMLElement>('.hero-section');
			if (!hero || hero.getBoundingClientRect().bottom > window.innerHeight * 0.15) {
				showMobileCta = false;
				return;
			}

			const blockedSelectors = ['#demo', '.beta-section', '#faq', '.site-footer'];
			showMobileCta = !blockedSelectors.some((selector) => {
				const section = document.querySelector<HTMLElement>(selector);
				if (!section) {
					return false;
				}
				const rect = section.getBoundingClientRect();
				return rect.top < window.innerHeight - 24 && rect.bottom > window.innerHeight * 0.42;
			});
		};

		const updateScrollEffects = () => {
			parallaxFrame = 0;
			if (reduceMotion.matches) {
				document.documentElement.style.setProperty('--hero-parallax', '0px');
			} else {
				const offset = Math.min(window.scrollY * 0.08, 56);
				document.documentElement.style.setProperty('--hero-parallax', `${offset}px`);
			}
			updateMobileCta();
		};

		const requestScrollEffects = () => {
			if (!parallaxFrame) {
				parallaxFrame = window.requestAnimationFrame(updateScrollEffects);
			}
		};

		mediaQuery.addEventListener('change', handleSystemThemeChange);
		window.addEventListener('scroll', requestScrollEffects, { passive: true });
		window.addEventListener('resize', requestScrollEffects);
		updateScrollEffects();

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
			window.removeEventListener('scroll', requestScrollEffects);
			window.removeEventListener('resize', requestScrollEffects);
			revealObserver?.disconnect();
			demoObserver?.disconnect();
			if (parallaxFrame) {
				window.cancelAnimationFrame(parallaxFrame);
			}
		};
	});

	function setLocale(nextLocale: Locale) {
		locale = nextLocale;
		window.localStorage.setItem('growclip.locale', nextLocale);
		document.documentElement.lang = nextLocale;
	}

	function setThemePreference(nextPreference: ThemePreference) {
		window.localStorage.setItem('growclip.theme', nextPreference);
		applyTheme(nextPreference);
	}
</script>

<svelte:head>
	<title>{content.meta.title}</title>
	<meta name="description" content={content.meta.description} />
	<meta name="theme-color" content={resolvedTheme === 'dark' ? '#111827' : '#f6f8f5'} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={content.meta.socialTitle} />
	<meta property="og:description" content={content.meta.socialDescription} />
	<meta property="og:image" content={content.hero.imageSrc} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={content.meta.socialTitle} />
	<meta name="twitter:description" content={content.meta.socialDescription} />
</svelte:head>

<div class="site-shell">
	<header class="site-header sticky top-0 z-30 border-b backdrop-blur">
		<nav
			class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
		>
			<a href="#top" class="flex items-center gap-3 text-neutral-950" aria-label="GrowClip">
				<span class="brand-mark flex h-9 w-9 items-center justify-center rounded-lg">
					<CloudOffIcon />
				</span>
				<span class="text-sm font-semibold tracking-normal">GrowClip</span>
			</a>

			<div class="hidden items-center gap-4 text-sm font-medium lg:gap-6 md:flex">
				<a class="nav-link" href="#demo">{content.nav.demo}</a>
				<a class="nav-link" href="#diagnostics">{content.nav.diagnostics}</a>
				<a class="nav-link" href="#capabilities">{content.nav.capabilities}</a>
				<a class="nav-link" href="#hardware">{content.nav.hardware}</a>
				<a class="nav-link" href="#faq">{content.nav.faq}</a>
			</div>

			<div class="flex items-center gap-2">
				<a class="primary-cta hidden h-11 px-5 text-sm sm:inline-flex" href={contactHref}>
					<MailIcon aria-hidden="true" />
					{content.nav.contact}
				</a>
				<ThemeToggle
					labels={content.nav.theme}
					preference={themePreference}
					onChange={setThemePreference}
				/>
				<LanguageToggle ariaLabel={content.nav.language} {locale} onChange={setLocale} />
			</div>
		</nav>
	</header>

	<main id="top">
		<section class="hero-section">
			<img class="hero-image" src={content.hero.imageSrc} alt={content.hero.imageAlt} />
			<div class="hero-overlay"></div>
			<div class="hero-content">
				<div class="hero-copy" data-reveal>
					<p class="kicker">{content.hero.kicker}</p>
					<h1>{content.hero.title}</h1>
					<p class="hero-headline">{content.hero.headline}</p>
					<p class="hero-body">{content.hero.copy}</p>
					<p class="hero-availability">{content.hero.availability}</p>
					<ul class="hero-highlights">
						{#each content.hero.highlights as highlight (highlight)}
							<li>
								<CheckIcon aria-hidden="true" />
								<span>{highlight}</span>
							</li>
						{/each}
					</ul>

					<div class="hero-actions">
						<a class="primary-cta h-12 px-5 text-sm" href={contactHref}>
							<MailIcon aria-hidden="true" />
							{content.hero.primaryCta}
						</a>
						<a class="secondary-cta h-12 px-5 text-sm" href="#demo">
							{content.hero.secondaryCta}
							<ArrowRightIcon aria-hidden="true" />
						</a>
					</div>
				</div>

				<aside class="hero-proof" data-reveal>
					{#each content.hero.stats as stat (stat.title)}
						<div class="hero-stat">
							<p class="hero-stat-value">{stat.value}</p>
							<h2>{stat.title}</h2>
							<p>{stat.body}</p>
						</div>
					{/each}
				</aside>
			</div>
		</section>

		<section class="proof-strip" aria-label={content.proof.title}>
			<div class="site-section proof-grid">
				<div data-reveal>
					<p class="kicker">{content.proof.kicker}</p>
					<h2 class="section-title">{content.proof.title}</h2>
					<p class="section-copy">{content.proof.copy}</p>
				</div>
				<div class="proof-items" data-reveal>
					{#each content.proof.items as item (item.title)}
						<article class="proof-item">
							<CheckIcon aria-hidden="true" />
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="site-section split-section">
			<div data-reveal>
				<p class="kicker">{content.problem.kicker}</p>
				<h2 class="section-title">{content.problem.title}</h2>
				<p class="section-copy">{content.problem.copy}</p>
			</div>
			<div class="site-grid" data-reveal>
				{#each content.problem.items as item (item.title)}
					<article class="feature-card">
						<h3>{item.title}</h3>
						<p>{item.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="comparison-section">
			<div class="site-section">
				<div class="section-heading" data-reveal>
					<p class="kicker">{content.comparison.kicker}</p>
					<h2 class="section-title">{content.comparison.title}</h2>
					<p class="section-copy">{content.comparison.copy}</p>
				</div>
				<div class="comparison-grid" data-reveal>
					{#each content.comparison.items as item (item.alternative)}
						<article class="comparison-card">
							<h3>{item.alternative}</h3>
							<div>
								<p class="comparison-label">{content.comparison.limitationLabel}</p>
								<p>{item.limitation}</p>
							</div>
							<div>
								<p class="comparison-label">{content.comparison.growclipLabel}</p>
								<p>{item.growclip}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="workflow-band">
			<div class="site-section">
				<div class="section-heading" data-reveal>
					<p class="kicker">{content.workflow.kicker}</p>
					<h2 class="section-title">{content.workflow.title}</h2>
					<p class="section-copy">{content.workflow.copy}</p>
				</div>
				<div class="workflow-grid" data-reveal>
					{#each content.workflow.steps as step (step.label)}
						<article class="workflow-step">
							<span>{step.label}</span>
							<h3>{step.title}</h3>
							<p>{step.body}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="demo" class="site-section demo-section">
			<div class="demo-shell">
				<div class="section-heading" data-reveal>
					<p class="kicker">{content.demo.kicker}</p>
					<h2 class="section-title">{content.demo.title}</h2>
					<p class="section-copy">{content.demo.copy}</p>
				</div>

				<div bind:this={demoRootElement} class="mt-6" data-reveal>
					{#if LiteGraphDemoComponent}
						<LiteGraphDemoComponent
							examples={content.demo.examples}
							resetLabel={content.demo.reset}
						/>
					{:else}
						<article class="asset-frame device-panel demo-loader" aria-busy={!demoLoadError}>
							<div class="device-panel-header border-b px-4 py-3">
								<p class="text-sm font-semibold text-neutral-50">Nodeflow LiteGraph demo</p>
								<p class="mt-1 text-xs text-neutral-400">
									{demoLoadError || content.demo.loading}
								</p>
							</div>
							<div
								class="device-canvas demo-loader-canvas grid h-[500px] min-h-[500px] place-items-center lg:h-[520px] lg:min-h-[520px]"
							>
								<div class="demo-loader-pulse" aria-hidden="true"></div>
							</div>
						</article>
					{/if}
				</div>
			</div>

			<details class="demo-shell mt-6" data-reveal>
				<summary class="details-summary">{content.demo.paletteToggle}</summary>
				<div class="mt-4 grid gap-4 md:grid-cols-2">
					{#each content.demo.points as point (point.title)}
						<article class="compact-card">
							<h3>{point.title}</h3>
							<p>{point.body}</p>
							<dl class="node-list">
								{#each point.items as item (item.name)}
									<div>
										<dt>{item.name}</dt>
										<dd>{item.body}</dd>
									</div>
								{/each}
							</dl>
						</article>
					{/each}
				</div>
			</details>
		</section>

		<section id="diagnostics" class="diagnostics-band">
			<div class="site-section diagnostics-layout">
				<div data-reveal>
					<p class="kicker">{content.diagnostics.kicker}</p>
					<h2 class="section-title">{content.diagnostics.title}</h2>
					<p class="section-copy">{content.diagnostics.copy}</p>
					<div class="diagnostics-list">
						{#each content.diagnostics.items as item (item.title)}
							<article>
								<h3>{item.title}</h3>
								<p>{item.body}</p>
							</article>
						{/each}
					</div>
				</div>
				<div data-reveal>
					<AssetSlot slot={content.media[2]} />
				</div>
			</div>
		</section>

		<section id="capabilities" class="site-section">
			<div class="section-heading" data-reveal>
				<p class="kicker">{content.capabilities.kicker}</p>
				<h2 class="section-title">{content.capabilities.title}</h2>
				<p class="section-copy">{content.capabilities.copy}</p>
			</div>

			<div class="site-grid" data-reveal>
				{#each content.capabilities.items as item (item.title)}
					<article class="feature-card">
						<h3>{item.title}</h3>
						<p>{item.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section id="hardware" class="hardware-band">
			<div class="site-section">
				<div class="section-heading" data-reveal>
					<p class="kicker">{content.hardware.kicker}</p>
					<h2 class="section-title">{content.hardware.title}</h2>
					<p class="section-copy">{content.hardware.copy}</p>
				</div>

				<div class="hardware-layout" data-reveal>
					<article class="compact-card hardware-base">
						<h3>{content.hardware.baseTitle}</h3>
						<ul>
							{#each content.hardware.baseItems as item (item)}
								<li>
									<CheckIcon aria-hidden="true" />
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</article>

					<div>
						<h3 class="hardware-options-title">{content.hardware.optionsTitle}</h3>
						<div class="hardware-options">
							{#each content.hardware.options as option (option.title)}
								<article class="feature-card">
									<div class="option-heading">
										<h4>{option.title}</h4>
										<span class="option-status">{option.status}</span>
									</div>
									<p>{option.body}</p>
								</article>
							{/each}
						</div>
					</div>
				</div>

				<details class="technical-card" data-reveal>
					<summary>{content.hardware.technicalTitle}</summary>
					<p>{content.hardware.technicalBody}</p>
					<a href={elecrowHref} target="_blank" rel="noreferrer">
						{content.hardware.sourceLabel}
						<ArrowRightIcon aria-hidden="true" />
					</a>
				</details>
			</div>
		</section>

		<section class="site-section media-section">
			<div class="section-heading" data-reveal>
				<p class="kicker">{content.showcase.kicker}</p>
				<h2 class="section-title">{content.showcase.title}</h2>
			</div>
			<div class="media-grid" data-reveal>
				{#each content.media as slot (slot.src)}
					<AssetSlot {slot} />
				{/each}
			</div>
		</section>

		<section class="beta-section">
			<div class="site-section beta-layout">
				<div data-reveal>
					<p class="kicker">{content.beta.kicker}</p>
					<h2 class="section-title">{content.beta.title}</h2>
					<p class="section-copy">{content.beta.copy}</p>
					<p class="beta-note">{content.beta.note}</p>
					<div class="beta-includes">
						<h3>{content.beta.includesTitle}</h3>
						{#each content.beta.includes as item (item.title)}
							<article>
								<CheckIcon aria-hidden="true" />
								<div>
									<h4>{item.title}</h4>
									<p>{item.body}</p>
								</div>
							</article>
						{/each}
					</div>
					<a class="primary-cta h-12 px-5 text-sm" href={contactHref}>
						<MailIcon aria-hidden="true" />
						{content.beta.primaryCta}
					</a>
				</div>
				<div class="beta-fit" data-reveal>
					<div>
						<h3>{content.beta.fitTitle}</h3>
						{#each content.beta.fit as item (item.title)}
							<article>
								<CheckIcon aria-hidden="true" />
								<div>
									<h4>{item.title}</h4>
									<p>{item.body}</p>
								</div>
							</article>
						{/each}
					</div>
					<div>
						<h3>{content.beta.notForTitle}</h3>
						{#each content.beta.notFor as item (item.title)}
							<article>
								<span aria-hidden="true">-</span>
								<div>
									<h4>{item.title}</h4>
									<p>{item.body}</p>
								</div>
							</article>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section id="faq" class="site-section faq-section">
			<div class="section-heading" data-reveal>
				<p class="kicker">{content.faq.kicker}</p>
				<h2 class="section-title">{content.faq.title}</h2>
			</div>
			<div class="faq-list" data-reveal>
				{#each content.faq.items as item (item.question)}
					<details class="faq-item">
						<summary>{item.question}</summary>
						<p>{item.answer}</p>
					</details>
				{/each}
			</div>
		</section>
	</main>

	<footer class="site-footer border-t">
		<div
			class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
		>
			<p>{content.footer.tagline}</p>
			<a href={contactHref}>{content.nav.contact}</a>
		</div>
	</footer>

	{#if showMobileCta}
		<div class="mobile-sticky-cta sm:hidden">
			<a class="primary-cta h-11 px-4 text-sm" href={contactHref}>
				<MailIcon aria-hidden="true" />
				{content.hero.primaryCta}
			</a>
		</div>
	{/if}
</div>
