<script lang="ts">
	import BookRow from '$components/BookRow.svelte';
	import { addDays } from '$lib/helpers/date';
	import { onMount } from 'svelte';
	import type { SupabaseType } from '../../types/supabase';

	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ supabase } = data);

	let laundryBookingMap = data.laundryBookingMap;

	// if (data?.washDays?.at(0)?.date) console.log(new Date(data?.washDays?.at(0)?.date));

	console.log(laundryBookingMap);
	const today = new Date(new Date().toDateString());

	console.log(today);

	onMount(() => {
		if (!supabase) return;
		const channel = supabase
			.channel('table-db-changes')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'washers'
				},
				(payload) => {
					//TODO
					console.log(payload);
					laundryBookingMap.set(`${payload.new.date}P${payload.new.part_of_day}`, {
						booked: true,
						date: payload.new.date,
						part: payload.new.part_of_day,
						user: 'asd'
					});
					laundryBookingMap = laundryBookingMap;
				}
			)
			.subscribe();
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden pt-4">
	<div class="grid w-full grid-cols-5 gap-4 px-4 text-center">
		<div />
		<h2>08:00 - 12:00</h2>
		<h2>12:00 - 17:00</h2>
		<h2>17:00 - 22:00</h2>
		<div />
	</div>
	<div
		class="grid h-full w-full grid-cols-5 items-center gap-4 overflow-scroll px-4 pb-2 text-center"
	>
		{#each { length: 100 } as _, i}
			<BookRow day={addDays(today, i)} bookingMap={laundryBookingMap} />
		{/each}
	</div>
</div>
