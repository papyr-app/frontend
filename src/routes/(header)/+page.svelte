<script lang="ts">
	import type PageServerData from './$types';
	export let data: PageServerData;
</script>

<div class="container mx-auto flex-grow flex justify-center items-center">
	<h1>Welcome to Papyr : )</h1>
</div>

<div class="fixed bottom-4 right-4 text-sm">
	<p>v.{data.appVersion}</p>
</div>
