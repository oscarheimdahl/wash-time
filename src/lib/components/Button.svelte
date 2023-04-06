<script lang="ts">
	import Loader from './Loader.svelte';
	export let onClick = () => {};
	export let label = '';
	export let secondary = false;
	export let textOnly = false;
	export let loading = false;
	let variantStyle = '';
	$: {
		variantStyle = 'bg-red-400 text-white';
		if (secondary) variantStyle = 'bg-white';
		if (textOnly) variantStyle = 'border-none p-1';
	}
</script>

<button
	aria-label="label"
	class={` ${variantStyle} grow rounded-md border-2 border-black p-2 transition-colors ${$$props.class}`}
	on:click={onClick}
>
	<div class="stack">
		<div class={loading ? 'opacity-0' : ''}><slot /></div>
		<div class={`${loading ? '' : 'opacity-0'} translate-y-1`}><Loader /></div>
	</div>
</button>

<style>
	.stack {
		display: grid;
		place-items: center;
	}
	.stack > * {
		grid-area: 1 / 1 / 2 / 2;
	}
</style>
