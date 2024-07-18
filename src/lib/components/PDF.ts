import * as PDFJS from 'pdfjs-dist';

PDFJS.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url
).toString();

export default async function loadPDF(node: HTMLCanvasElement, data: { url: string }) {
	const loadingTask = PDFJS.getDocument(data.url);
	const pdf = await loadingTask.promise;
	const page = await pdf.getPage(1);

	const browserViewportHeight = window.innerHeight;
	const unscaledViewport = page.getViewport({ scale: 1 });
	const scale = browserViewportHeight / unscaledViewport.height;

	const viewport = page.getViewport({ scale });
	console.log(viewport);
	console.log(scale);

	const canvas = node;
	const context = canvas.getContext('2d');

	canvas.height = viewport.height;
	canvas.width = viewport.width;

	const renderContext = {
		canvasContext: context,
		viewport: viewport
	};

	await page.render(renderContext);
}
