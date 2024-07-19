<script lang="ts">
	import { onMount } from 'svelte';
	import * as PDFJS from 'pdfjs-dist';

	PDFJS.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.mjs',
		import.meta.url
	).toString();

	export let document: Blob;

	async function loadPDF(node: HTMLCanvasElement, doc: Blob) {
		const arrayBuffer = await doc.arrayBuffer();
		const loadingTask = PDFJS.getDocument({ data: arrayBuffer });
		const pdf = await loadingTask.promise;

		const page = await pdf.getPage(1);

		const browserViewportHeight = window.innerHeight;
		const unscaledViewport = page.getViewport({ scale: 1 });
		const scale = browserViewportHeight / unscaledViewport.height;
		const viewport = page.getViewport({ scale });

		const canvas = node;
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		const context = canvas.getContext('2d');
		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};

		await page.render(renderContext);
	}
</script>

<div class="w-full h-screen flex justify-center">
	<canvas class="border-2 border-black" use:loadPDF={document}></canvas>
</div>
