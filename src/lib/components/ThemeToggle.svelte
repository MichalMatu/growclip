<!-- @runes -->
<script lang="ts">
	import DeviceDesktopIcon from '~icons/tabler/device-desktop';
	import MoonIcon from '~icons/tabler/moon';
	import SunIcon from '~icons/tabler/sun';

	export type ThemePreference = 'system' | 'light' | 'dark';

	type ThemeLabels = {
		label: string;
		system: string;
		light: string;
		dark: string;
	};

	interface Props {
		labels: ThemeLabels;
		preference: ThemePreference;
		onChange: (preference: ThemePreference) => void;
	}

	let { labels, preference, onChange }: Props = $props();

	const options = [
		{ id: 'system', icon: DeviceDesktopIcon },
		{ id: 'light', icon: SunIcon },
		{ id: 'dark', icon: MoonIcon }
	] as const;

	function labelFor(option: ThemePreference): string {
		return labels[option];
	}
</script>

<div class="theme-toggle" role="group" aria-label={labels.label}>
	{#each options as option (option.id)}
		{@const Icon = option.icon}
		<button
			type="button"
			class:active={preference === option.id}
			aria-label={labelFor(option.id)}
			aria-pressed={preference === option.id}
			title={labelFor(option.id)}
			onclick={() => onChange(option.id)}
		>
			<Icon aria-hidden="true" />
		</button>
	{/each}
</div>
