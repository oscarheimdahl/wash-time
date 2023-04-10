<script>
</script>

<div class="full grid place-content-center">
	<span class="w-96 rounded-md bg-white p-8 shadow-md"> <slot /></span>
</div>

<style>
	.full {
		height: 100dvh;
	}

	@media screen and (max-width: 500px) {
		span {
			width: 20rem;
		}
	}
</style>
