<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let socket;

	const messages = writable([]);
	let messageInput = '';

	onMount(() => {
		socket.on('new_message', (message) => {
			messages.update((msgs) => [...msgs, message]);
		});
	});

	function sendMessage() {
		if (messageInput.trim() !== '') {
			socket.emit('send_message', { message: messageInput });
			messageInput = '';
		}
	}
</script>

<div
	class="fixed right-4 bottom-4 w-80 max-h-[80vh] bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col"
>
	<div class="messages flex-1 overflow-y-auto mb-4 space-y-2">
		{#each $messages as msg}
			<div class="p-2 rounded-lg bg-white shadow-sm">
				<span class="font-semibold text-blue-500">{msg.username}:</span>
				{msg.message}
			</div>
		{/each}
	</div>
	<div class="input-container flex">
		<input
			type="text"
			bind:value={messageInput}
			placeholder="Type a message..."
			on:keydown={(e) => e.key === 'Enter' && sendMessage()}
			class="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
		<button
			on:click={sendMessage}
			disabled={messageInput.trim() === ''}
			class="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 disabled:bg-gray-400 focus:outline-none"
		>
			Send
		</button>
	</div>
</div>
