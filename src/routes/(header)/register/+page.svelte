<script lang="ts">
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let form: ActionData;

	onMount(() => {
		if (form?.success) {
			goto('/login');
		}
	});
</script>

<div class="container flex-grow mx-auto flex flex-col items-center justify-center">
	<h1 class="my-4">Register</h1>
	<form method="POST" class="flex flex-col items-center">
		<input
			class="border-black border-2 rounded-md my-2 pl-2"
			type="text"
			name="username"
			placeholder="Username"
			required
		/>
		<input
			class="border-black border-2 rounded-md my-2 pl-2"
			type="email"
			name="email"
			placeholder="Email"
			required
		/>
		<input
			class="border-black border-2 rounded-md my-2 pl-2"
			type="text"
			name="first_name"
			placeholder="First name"
			required
		/>
		<input
			class="border-black border-2 rounded-md my-2 pl-2"
			type="text"
			name="last_name"
			placeholder="Last name"
			required
		/>
		<input
			class="border-black border-2 rounded-md my-2 pl-2"
			type="password"
			name="password"
			placeholder="Password"
			required
		/>
		<button class="border-black border-2 rounded-md my-2 w-16" type="submit">Register</button>
	</form>

	{#if form?.incorrect}
		<p class="text-red-500">Invalid credentials</p>
	{/if}
</div>
