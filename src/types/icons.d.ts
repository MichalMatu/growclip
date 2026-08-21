declare module '~icons/*' {
	import type { SvelteComponentTyped } from 'svelte';

	export default class Icon extends SvelteComponentTyped<Record<string, unknown>> {}
}

declare module '~icons/tabler/*' {
	import type { SvelteComponentTyped } from 'svelte';

	export default class Icon extends SvelteComponentTyped<Record<string, unknown>> {}
}
