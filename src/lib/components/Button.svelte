<script lang="ts">
	import Loader from './Loader.svelte';
	export let onClick = () => {};
	export let label = '';
	export let secondary = false;
	export let destructive = false;
	export let textOnly = false;
	export let loading = false;
	export let disabled = false;
	let variantStyle = '';
	$: {
		variantStyle = 'bg-blue-500 text-white';
		if (secondary) variantStyle = 'bg-stone-100';
		if (destructive) variantStyle = 'bg-red-600 text-white';
		if (textOnly) variantStyle = 'border-none p-0 underline shadow-none';
	}
</script>

<button
	aria-label={label}
	{disabled}
	class={`${variantStyle} rounded-md px-4 py-2 shadow-md transition-transform ${$$props.class} active:scale-95 disabled:opacity-50`}
	on:click={onClick}
>
	<div class="stack">
		<div class={loading ? 'opacity-0' : ''}><slot /></div>
		<div class={`${loading ? '' : 'hidden'} translate-y-1`}><Loader /></div>
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
