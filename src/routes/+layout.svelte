<script>
	import '../app.css';
	import Header from '$lib/components/header.svelte';
</script>

<main class="min-h-screen flex flex-col">
	<Header></Header>
	<slot />
</main>
