<script lang="ts">
	import { onMount } from 'svelte';
	import * as PDFJS from 'pdfjs-dist';
	import type { PDFPageProxy } from 'pdfjs-dist';
	import PDFPage from '$lib/components/workspace/PDFPage.svelte';

	PDFJS.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.mjs',
		import.meta.url
	).toString();

	export let pdfDocument: Blob;

	let pdf: PDFJS.PDFDocumentProxy;
	let pages: PDFPageProxy[] = [];

	let pixelRatio = window.devicePixelRatio || 1;
	let pdfLoaded = false;
	let zoom = 1.0;
	let scale: number;

	async function loadPDF() {
		const arrayBuffer = await pdfDocument.arrayBuffer();
		pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
		pdfLoaded = true;
	}

	async function renderPages(zoomLevel: number) {
		if (!pdf) return;

		// Calculate scale using first page
		const firstPage = await pdf.getPage(1);
		const unscaledViewport = firstPage.getViewport({ scale: 1 });
		scale = zoomLevel * (window.innerHeight / unscaledViewport.height) * pixelRatio;

		pages = await Promise.all(Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1)));
	}

	onMount(loadPDF);

	$: if (pdfLoaded && zoom) {
		renderPages(zoom);
	}
</script>

<div>
	<button class="absolute left-12 top-56" on:click={() => (zoom *= 1.2)}>Zoom In</button>
	<button class="absolute left-12 top-64" on:click={() => (zoom /= 1.2)}>Zoom Out</button>
	{#each pages as page (page.pageNumber)}
		<PDFPage {page} {scale} />
	{/each}
</div>
