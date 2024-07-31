<script lang="ts">
	import { afterUpdate } from 'svelte';

	export let pageNumber: number;
	export let viewport: PageViewport;
	export let page: PDFPageProxy;

	let pixelRatio = window.devicePixelRatio || 1;
	let canvas: HTMLCanvasElement;

	const renderPage = () => {
		const context = canvas.getContext('2d');
		if (context) {
			const renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			page.render(renderContext);
		}
	};

	afterUpdate(renderPage);
</script>

<canvas
	bind:this={canvas}
	height={viewport.height}
	width={viewport.width}
	class="border-2 border-black"
	style="height: {viewport.height / pixelRatio}px; width: {viewport.width / pixelRatio}px;"
/>
