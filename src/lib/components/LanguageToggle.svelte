<!-- @runes -->
<script lang="ts">
	import LanguageIcon from '~icons/tabler/language';

	import type { Locale } from '$lib/content/product';

	interface Props {
		ariaLabel: string;
		locale: Locale;
		onChange: (locale: Locale) => void;
	}

	let { ariaLabel, locale, onChange }: Props = $props();
</script>

<div
	class="language-toggle inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white/86 p-1 shadow-sm"
	role="group"
	aria-label={ariaLabel}
>
	<span class="flex h-8 w-8 items-center justify-center text-neutral-600" aria-hidden="true">
		<LanguageIcon />
	</span>
	{#each ['pl', 'en'] as option (option)}
		<button
			type="button"
			class={[
				'h-8 rounded-md px-3 text-xs font-semibold transition-colors',
				locale === option ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
			]}
			aria-pressed={locale === option}
			onclick={() => onChange(option as Locale)}
		>
			{option.toUpperCase()}
		</button>
	{/each}
</div>
