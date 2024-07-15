<script lang="ts">
	import loadPDF from './PDF';

	export let url: string;
</script>

<canvas use:loadPDF={{ url }}></canvas>
