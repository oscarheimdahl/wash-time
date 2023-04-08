<script lang="ts">
	import BookRow from '$components/BookRow.svelte';
	import { addDays } from '$lib/helpers/date';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import { bookings } from '../../store/bookings';
	export let data: PageData;
	$: ({ supabase } = data);

	let laundryBookingMap = data.laundryBookingMap;

	bookings.set(laundryBookingMap);

	const today = new Date(new Date().toDateString());

	onMount(() => {
		if (!supabase) return;
		const channel = supabase
			.channel('table-db-changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'washers'
				},
				(payload) => {
					if (payload.eventType === 'INSERT') {
						bookings.update((map) => {
							map.set(`${payload.new.date}P${payload.new.part_of_day}`, {
								booked: true,
								date: payload.new.date,
								part: payload.new.part_of_day,
								user: payload.new.user,
								id: payload.new.id
							});
							const newMap = map;
							return newMap;
						});
					}
					if (payload.eventType === 'DELETE') {
						bookings.update((map) => {
							map.delete(`${payload.old.date}P${payload.old.part_of_day}`);
							return map;
						});
					}
				}
			)
			.subscribe();
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden pt-4">
	<div class="special-col grid w-full gap-4 px-4 text-center">
		<div />
		<h2>08:00 - 12:00</h2>
		<h2>12:00 - 17:00</h2>
		<h2>17:00 - 22:00</h2>
		<div />
	</div>
	<div
		class="special-col grid h-full w-full items-center gap-4 overflow-scroll px-4 pb-2 text-center"
	>
		{#each { length: 100 } as _, i}
			<BookRow day={addDays(today, i)} bookingMap={laundryBookingMap} />
		{/each}
	</div>
</div>

<style>
	.special-col {
		grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
	}
</style>
