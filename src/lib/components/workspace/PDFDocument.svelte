<script lang="ts">
	import { onMount } from 'svelte';
	import * as PDFJS from 'pdfjs-dist';
	import PDFPage from '$lib/components/workspace/PDFPage.svelte';

	PDFJS.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.mjs',
		import.meta.url
	).toString();

	export let pdfDocument: Blob;

	let pageData: Array<{
		pageNumber: number;
		viewport: PDFJS.PageViewport;
		page: PDFJS.PDFPageProxy;
	}> = [];
	let pixelRatio = window.devicePixelRatio || 1;
	let pdf: PDFJS.PDFDocumentProxy;
	let zoom = 1.0;
	let isLoaded = false;

	const loadPDF = async () => {
		const arrayBuffer = await pdfDocument.arrayBuffer();
		pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
		isLoaded = true;
	};

	const renderPages = async (zoomLevel: number) => {
		if (!pdf) return;

		const pageNumbers = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
		const pagePromises = pageNumbers.map((number) => pdf.getPage(number));
		const pages = await Promise.all(pagePromises);

		// Calculate scale using first page
		const firstPage = await pdf.getPage(1);
		const unscaledViewport = firstPage.getViewport({ scale: 1 });
		const scale = zoomLevel * (window.innerHeight / unscaledViewport.height) * pixelRatio;

		console.log('📍');

		pageData = pages.map((page, index) => ({
			pageNumber: index + 1,
			viewport: page.getViewport({ scale }),
			page
		}));
	};

	onMount(loadPDF);

	$: if (isLoaded && zoom) {
		renderPages(zoom);
	}
</script>

<div>
	<button class="absolute left-12 top-56" on:click={() => (zoom *= 1.2)}>Zoom In</button>
	<button class="absolute left-12 top-64" on:click={() => (zoom /= 1.2)}>Zoom Out</button>
	{#each pageData as { pageNumber, viewport, page }}
		<PDFPage {pageNumber} {viewport} {page} />
	{/each}
</div>
