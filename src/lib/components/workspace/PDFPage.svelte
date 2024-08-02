<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { TextLayer } from 'pdfjs-dist';

	export let page: PDFPageProxy;
	export let scale: number;

	let pixelRatio = window.devicePixelRatio || 1;
	let viewport;

	let canvas: HTMLCanvasElement;

	let textLayerDiv: HTMLElement;

	const renderPage = async () => {
		viewport = page.getViewport({ scale });

		canvas.height = viewport.height;
		canvas.width = viewport.width;
		const canvasContext = canvas.getContext('2d');

		await page.render({
			canvasContext,
			viewport
		}).promise;

		const textLayer = new TextLayer({
			textContentSource: page.streamTextContent({
				includeMarkedContent: true,
				disableNormalization: true
			}),
			container: textLayerDiv,
			viewport
		});

		await textLayer.render();
	};

	afterUpdate(renderPage);
</script>

<div
	class="relative"
	style="height: {viewport?.height / pixelRatio}px; width: {viewport?.width / pixelRatio}px;"
>
	<canvas class="border-2 border-black" bind:this={canvas} style="width: 100%; height: 100%;"
	></canvas>
	<div
		bind:this={textLayerDiv}
		class="absolute inset-0 overflow-hidden opacity-20 leading-none"
	></div>
</div>
