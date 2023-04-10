<script>
	import { addDays, formattedDateLongMonth, weekday } from '$lib/helpers/date';
	import BookButton from './BookButton.svelte';
	export let i = 0;
	const today = new Date(new Date().toDateString());
</script>

<div class="row mb-4 flex w-fit gap-20 rounded-md bg-white p-4 pr-8 shadow-md">
	<div class="flex flex-col items-center justify-center text-center">
		<span class="text-lg font-semibold text-black">
			{formattedDateLongMonth(addDays(today, i))}
		</span>
		<span class="text-sm">{weekday(addDays(today, i))}</span>
	</div>
	<BookButton day={addDays(today, i)} part={1} />
	<BookButton day={addDays(today, i)} part={2} />
	<BookButton day={addDays(today, i)} part={3} />
</div>

<style>
	span {
		width: 4rem;
		text-align: left;
	}

	@media screen and (max-width: 800px) {
		.row {
			gap: 2rem;
		}
	}

	@media screen and (max-width: 500px) {
		.row {
			gap: 0.5rem;
			width: 100%;
			padding-left: 0.5rem;
			padding-right: 0.5rem;
			border-radius: 0;
			justify-content: center;
		}
	}
</style>
