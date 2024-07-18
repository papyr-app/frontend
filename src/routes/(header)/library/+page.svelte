<script lang="ts">
	import type { PageServerData } from './$types';
	import type { Document } from '$lib/types';

	export let data: PageServerData;
	const documents: Document[] = data.documents;
</script>

{#if documents}
	<div class="flex flex-col gap-4 p-4 m-16">
		{#each documents as document}
			<h1>{document.title}</h1>
			<p>{new Date(document.created_at).toDateString()}</p>
		{/each}
	</div>
{:else}
	<h1>no documents :(</h1>
{/if}
