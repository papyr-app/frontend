<script lang="ts">
	import loadPDF from './PDF';

	export let url: string;
</script>

<div class="w-full h-screen flex justify-center">
	<canvas class="border-2 border-black" use:loadPDF={{ url }}></canvas>
</div>
