<!-- @runes -->
<script lang="ts">
	import { onMount } from 'svelte';
	import RefreshIcon from '~icons/tabler/refresh';

	import {
		mountLiteGraphDemo,
		type DemoExampleId,
		type LiteGraphDemoController
	} from '$lib/features/litegraph/demoRuntime';
	import type { DemoFlowExample } from '$lib/content/product';

	interface Props {
		examples: DemoFlowExample[];
		resetLabel: string;
	}

	let { examples, resetLabel }: Props = $props();

	let canvasElement: HTMLCanvasElement | null = null;
	let activeExample = $state<DemoExampleId>('climate');
	let ready = $state(false);
	let error = $state('');
	const activeExampleBody = $derived(
		examples.find((example) => example.id === activeExample)?.body ?? ''
	);

	let controller: LiteGraphDemoController | null = null;
	let resizeObserver: ResizeObserver | null = null;

	function setError(initializationError: unknown) {
		error =
			initializationError instanceof Error
				? initializationError.message
				: String(initializationError);
	}

	async function initializeDemo() {
		if (!canvasElement) {
			return;
		}

		try {
			controller = await mountLiteGraphDemo(canvasElement, activeExample);
			ready = true;
			error = '';
		} catch (initializationError) {
			setError(initializationError);
		}
	}

	async function resetDemo() {
		try {
			if (!controller) {
				await initializeDemo();
				return;
			}
			controller.reset(activeExample);
			ready = true;
			error = '';
		} catch (resetError) {
			setError(resetError);
		}
	}

	async function selectExample(exampleId: DemoExampleId) {
		activeExample = exampleId;
		try {
			if (!controller) {
				await initializeDemo();
				return;
			}
			controller.setExample(exampleId);
			ready = true;
			error = '';
		} catch (exampleError) {
			setError(exampleError);
		}
	}

	onMount(() => {
		void initializeDemo();

		if (canvasElement && typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				controller?.resize();
			});
			resizeObserver.observe(canvasElement);
		}

		return () => {
			resizeObserver?.disconnect();
			controller?.destroy();
			controller = null;
		};
	});
</script>

<article class="asset-frame device-panel">
	<div class="device-panel-header flex items-center justify-between gap-3 border-b px-4 py-3">
		<div>
			<p class="text-sm font-semibold text-neutral-50">Nodeflow LiteGraph demo</p>
			<p class="mt-1 text-xs text-neutral-400">same node style as the device panel</p>
		</div>
		<button
			type="button"
			class="device-panel-button inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold"
			onclick={resetDemo}
			disabled={!ready && !error}
		>
			<RefreshIcon aria-hidden="true" />
			{resetLabel}
		</button>
	</div>

	<div class="device-panel-controls border-b px-3 py-3">
		<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
			{#each examples as example (example.id)}
				<button
					type="button"
					class={[
						'h-10 rounded-md border px-2 text-center text-[0.72rem] font-semibold leading-tight transition-colors',
						activeExample === example.id ? 'device-tab device-tab-active' : 'device-tab'
					]}
					aria-pressed={activeExample === example.id}
					onclick={() => selectExample(example.id)}
				>
					{example.title}
				</button>
			{/each}
		</div>
		<p class="mt-3 min-h-10 text-xs leading-5 text-neutral-300">
			{activeExampleBody}
		</p>
	</div>

	<div class="device-canvas relative h-[500px] min-h-[500px] lg:h-[520px] lg:min-h-[520px]">
		<canvas bind:this={canvasElement} class="h-full w-full"></canvas>
		{#if error}
			<div class="absolute inset-0 grid place-items-center bg-neutral-950/92 p-6 text-center">
				<p class="max-w-md text-sm leading-6 text-red-200">{error}</p>
			</div>
		{:else if !ready}
			<div
				class="device-canvas absolute inset-0 grid place-items-center text-sm font-semibold text-neutral-300"
			>
				LiteGraph loading
			</div>
		{/if}
	</div>
</article>
