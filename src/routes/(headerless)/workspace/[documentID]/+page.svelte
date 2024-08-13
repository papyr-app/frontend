<script lang="ts">
	import { io } from 'socket.io-client';
	import { onMount, onDestroy } from 'svelte';
	import { wsUrl } from '$lib/config';
	import PDFDocument from '$lib/components/workspace/PDFDocument.svelte';
	import Chat from '$lib/components/chat/Chat.svelte';

	export let data: PageData;
	const pdfDocument = data.document;
	const pdfDocumentID = data.documentID;
	const token = data.token;
	const error = data.error;
	let socket;

	onMount(() => {
		if (error) {
			console.error('Error loading document:', error);
			return;
		}

		const url = `${wsUrl}?token=${token}&room=${pdfDocumentID}`;

		socket = io(url);

		socket.on('connect', () => {
			console.log('Socket.IO connection established.');
		});

		socket.on('disconnect', (reason) => {
			console.log('Disconnected:', reason);
		});

		socket.on('connect_error', (error) => {
			console.error('Connection error:', error);
		});

		socket.on('error', (error) => {
			console.error('Socket.IO error:', error);
		});
	});

	onDestroy(() => {
		if (socket) {
			socket.disconnect();
		}
	});
</script>

<a class="underline text-blue-500 absolute m-4" href="/library">Back to library</a>

<div class="w-full h-screen flex flex-col items-center">
	{#if data.error}
		<p>Error: {data.error}</p>
	{:else if pdfDocument instanceof Blob && socket}
		<PDFDocument {pdfDocument} />
		<Chat {socket} />
	{:else}
		<p>Loading document...</p>
	{/if}
</div>
