<script lang="ts">
	import { goto } from '$app/navigation';
	export let token: string | null;
	$: loggedIn = token !== null;

	async function handleLogout() {
		const response = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			token = null;
			goto('/');
		}
	}
</script>

<header class="container mx-auto h-20 flex justify-between items-center">
	<a href="/" class="h-3/4">
		<img src="logo.png" class="h-full" alt="The papyr logo." />
	</a>
	<nav>
		{#if loggedIn}
			<div class="flex gap-4">
				<a href="/library" class="hover:underline">Library</a>
				<button class="hover:underline" on:click={handleLogout}>Log out</button>
			</div>
		{:else}
			<a href="/login" class="hover:underline">Log in</a>
		{/if}
	</nav>
</header>
