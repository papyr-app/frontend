<script lang="ts">
	import { onMount } from 'svelte';
	import * as PDFJS from 'pdfjs-dist';

	PDFJS.GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.mjs',
		import.meta.url
	).toString();

	export let pdfDocument: Blob;

	async function loadPDF(parent: HTMLElement, doc: Blob) {
		const arrayBuffer = await doc.arrayBuffer();

		const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
		const pageNumbers = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
		const pagePromises = pageNumbers.map((number) => pdf.getPage(number));

		const pages = await Promise.all(pagePromises);

		// calculate scale using first page
		const firstPage = await pdf.getPage(1);
		const unscaledViewport = firstPage.getViewport({ scale: 1 });
		const pixelRatio = window.devicePixelRatio || 1;
		const scale = (window.innerHeight / unscaledViewport.height) * pixelRatio;

		const canvases = pages.forEach((page) => {
			const viewport = page.getViewport({ scale });

			const canvas = document.createElement('canvas');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			canvas.classList.add('border-2', 'border-black');
			canvas.style.height = `${viewport.height / pixelRatio}px`;
			canvas.style.width = `${viewport.width / pixelRatio}px`;

			const context = canvas.getContext('2d');
			const renderContext = {
				canvasContext: context,
				viewport: viewport
			};

			page.render(renderContext);

			parent.appendChild(canvas);
		});
	}
</script>

<div class="w-full h-screen flex justify-center">
	<div use:loadPDF={pdfDocument}></div>
</div>
