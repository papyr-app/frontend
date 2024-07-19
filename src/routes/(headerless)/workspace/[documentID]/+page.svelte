<script lang="ts">
	import type { PageData } from './$types';
	import PDFViewer from '$lib/components/PDFViewer.svelte';

	export let data: PageData;
	const document = data.document;
</script>

<div>
	<a class="underline text-blue-500 absolute m-4" href="/library">Back to library</a>

	{#if data.error}
		<p>Error: {data.error}</p>
	{:else if document instanceof Blob}
		<PDFViewer {document} />
	{:else}
		<p>Loading document...</p>
	{/if}
</div>
