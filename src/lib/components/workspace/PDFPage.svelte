<script lang="ts">
	import { onMount } from 'svelte';
	import type { PDFPageProxy, PageViewport } from 'pdfjs-dist';

	export let page: PDFPageProxy;
	export let scale: number;

	let viewport: PageViewport;
	let canvas: HTMLCanvasElement;
	let textItems: any[] = [];
	let pixelRatio = window.devicePixelRatio || 1;

	const renderPage = async () => {
		viewport = page.getViewport({ scale });
		canvas.height = viewport.height;
		canvas.width = viewport.width;
		const canvasContext = canvas.getContext('2d');

		if (!canvasContext) return;

		await page.render({
			canvasContext,
			viewport
		}).promise;

		const textContent = await page.getTextContent();
		textItems = textContent.items.map((item: any) => {
			const tx =
				viewport.transform[0] * item.transform[4] +
				viewport.transform[2] * item.transform[5] +
				viewport.transform[4];
			const ty =
				viewport.transform[1] * item.transform[4] +
				viewport.transform[3] * item.transform[5] +
				viewport.transform[5];
			const fontHeight = Math.sqrt(
				item.transform[2] * item.transform[2] + item.transform[3] * item.transform[3]
			);
			const fontSize = (fontHeight * viewport.scale) / pixelRatio;

			const angle = Math.atan2(item.transform[1], item.transform[0]);
			const degrees = angle * (180 / Math.PI);

			return {
				text: item.str,
				left: tx / pixelRatio,
				top: ty / pixelRatio - fontSize,
				rotation: -degrees,
				fontSize,
				fontFamily: item.fontName
			};
		});
	};

	onMount(() => {
		renderPage();
	});
</script>

<div
	class="border-2 border-black relative overflow-hidden"
	style="width: {viewport?.width / pixelRatio}px; height: {viewport?.height / pixelRatio}px;"
>
	<canvas
		bind:this={canvas}
		class="absolute top-0 left-0"
		style="width: {viewport?.width / pixelRatio}px; height: {viewport?.height / pixelRatio}px;"
	></canvas>
	<div class="absolute inset-0 overflow-hidden opacity-20">
		{#each textItems as item}
			<span
				class="absolute whitespace-pre cursor-text origin-top-left text-transparent"
				style="left: {item.left}px; top: {item.top}px; font-size: {item.fontSize}px; font-family: {item.fontFamily}; transform: rotate({item.rotation}deg"
				>{item.text}</span
			>
		{/each}
	</div>
</div>
