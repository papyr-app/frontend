<script lang="ts">
	import type { PageServerData } from './$types';
	import type { Document } from '$lib/types';

	export let data: PageServerData;
	const documents: Document[] | undefined = data.documents;
</script>

{#if documents}
	<div class="flex flex-col gap-4 p-4 m-16">
		{#each documents as document}
			<h1>{document.title}</h1>
			<p>{document.description}</p>
			<p class="text-gray-500">Created at: {new Date(document.created_at).toDateString()}</p>
			<a class="text-blue-500 underline" href={`workspace/${document.id}`}>Open document</a>
		{/each}
	</div>
{:else}
	<h1>no documents :(</h1>
{/if}
