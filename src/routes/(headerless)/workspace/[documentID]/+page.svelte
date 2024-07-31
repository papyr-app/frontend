<script lang="ts">
	import type { PageData } from './$types';
	import PDFDocument from '$lib/components/workspace/PDFDocument.svelte';

	export let data: PageData;
	const pdfDocument = data.document;
</script>

<a class="underline text-blue-500 absolute m-4" href="/library">Back to library</a>

<div class="w-full h-screen flex flex-col items-center">
	{#if data.error}
		<p>Error: {data.error}</p>
	{:else if pdfDocument instanceof Blob}
		<PDFDocument {pdfDocument} />
	{:else}
		<p>Loading document...</p>
	{/if}
</div>
