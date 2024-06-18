<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Header from '$lib/components/header.svelte';

	export let data: LayoutData;
	let token = data.token;
</script>

<main class="min-h-screen flex flex-col">
	<Header {token}></Header>
	<slot />
</main>
