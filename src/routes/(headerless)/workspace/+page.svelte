<script lang="ts">
	import type { PageServerData } from './$types';
	import PDFViewer from '$lib/components/PDFViewer.svelte';

	export let data: PageServerData;
	const url = data.url;
</script>

<PDFViewer {url} />
