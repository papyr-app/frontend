<script lang="ts">
	import PDFViewer from '$lib/components/PDFViewer.svelte';

	const pdfUrl = 'sample.pdf';
</script>

<PDFViewer url={pdfUrl} />
