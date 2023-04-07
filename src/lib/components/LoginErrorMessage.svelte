<script>
	export let errorMessage = '';
	export let loading = false;
</script>

<div class="shake absolute -bottom-20 -left-8 grid h-16 w-[calc(100%+4rem)] text-center">
	{#if errorMessage && !loading}
		<span class={`${errorMessage && !loading ? 'shake' : ''}`}>{errorMessage}</span>
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
