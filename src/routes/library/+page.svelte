<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const documents = data.documents;
</script>

{#if documents}
	<div class="flex gap-4 p-4 m-16">
		{#each documents as document}
			<h1>{document.title}</h1>
		{/each}
	</div>
{:else}
	<h1>no documents :(</h1>
{/if}
