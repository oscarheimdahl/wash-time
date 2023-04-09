<script lang="ts">
	import { addDays, formattedDate } from '$lib/helpers/date';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import { addBooking, bookingsStore, deleteBooking } from '../../store/bookingsStore';
	import BookButton from '$components/BookButton.svelte';
	import type { WashersRow } from '../../types/supabase';
	import { userStore } from '../../store/userStore';
	import { dbBookingToBusiness } from '$lib/helpers/db';
	export let data: PageData;
	$: ({ supabase } = data);

	let laundryBookingMap = data.laundryBookingMap;
	bookingsStore.set(laundryBookingMap);

	const userId = $userStore.id;

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
						const newBooking = payload.new as WashersRow;
						// if (newBooking.user === userId) return;
						addBooking(dbBookingToBusiness(newBooking));
					}
					if (payload.eventType === 'DELETE') {
						const oldBooking = payload.old as WashersRow;
						// if (oldBooking.user === userId) return;
						deleteBooking(dbBookingToBusiness(oldBooking));
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
			<h2 class="text-right">{formattedDate(addDays(today, i))}</h2>
			<BookButton day={addDays(today, i)} part={1} />
			<BookButton day={addDays(today, i)} part={2} />
			<BookButton day={addDays(today, i)} part={3} />
			<div />
		{/each}
	</div>
</div>

<style>
	.special-col {
		grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
	}
</style>
