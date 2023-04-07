<script lang="ts">
	import BookRow from '$components/BookRow.svelte';
	import { addDays } from '$lib/helpers/date';
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ supabase } = data);

	console.log(data.data);

	const today = Date.now();
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden pt-4">
	<div class="grid w-full max-w-2xl grid-cols-4 gap-4 px-4 text-center">
		<div />
		<h2>08:00 - 12:00</h2>
		<h2>12:00 - 17:00</h2>
		<h2>17:00 - 22:00</h2>
	</div>
	<div
		class="grid h-full w-full max-w-2xl grid-cols-4 items-center gap-4 overflow-scroll px-4 pb-2 text-center"
	>
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
		<BookRow day={today} />
		<BookRow day={addDays(today, 1)} />
		<BookRow day={addDays(today, 2)} />
		<BookRow day={addDays(today, 3)} />
		<BookRow day={addDays(today, 4)} />
		<BookRow day={addDays(today, 5)} />
	</div>
</div>
