<!-- @runes -->
<script lang="ts">
	import type { MediaSlot } from '$lib/content/product';

	interface Props {
		slot: MediaSlot;
	}

	let { slot }: Props = $props();
	const isRasterPhoto = $derived(/\.(avif|jpe?g|png|webp)$/i.test(slot.src));
</script>

<figure class="asset-frame" class:asset-photo-frame={isRasterPhoto}>
	<img
		src={slot.src}
		alt={slot.alt}
		class={['aspect-[3/2] w-full', isRasterPhoto ? 'object-cover' : 'object-contain']}
		loading="lazy"
		decoding="async"
	/>
	<figcaption class="border-t border-neutral-200 px-4 py-3">
		<p class="text-sm font-semibold text-neutral-950">{slot.title}</p>
		<p class="mt-1 text-xs leading-5 text-neutral-600">{slot.body}</p>
	</figcaption>
</figure>
