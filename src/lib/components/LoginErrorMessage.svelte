<script>
	import CheckIcon from './CheckIcon.svelte';

	export let errorMessage = '';
	export let loading = false;
	export let showIcon = false;
</script>

<div class="shake absolute -bottom-20 -left-8 grid w-[calc(100%+4rem)] text-center">
	{#if errorMessage && !loading}
		<div class={`flex items-center justify-center ${errorMessage && !loading ? 'shake' : ''}`}>
			<span class="mr-1">{errorMessage}</span>
			{#if showIcon}<CheckIcon />{/if}
		</div>
	{/if}
</div>

<style>
	.shake {
		animation: shake 1s ease 1;
		animation-delay: 800ms;
	}
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		20%,
		40%,
		60%,
		80% {
			transform: translateX(-5px);
		}
		30%,
		50%,
		70% {
			transform: translateX(5px);
		}
	}
</style>
