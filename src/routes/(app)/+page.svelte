<script lang="ts">
	import { addDays, formattedDate, formattedDateLongMonth, weekday } from '$lib/helpers/date';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import { addBooking, bookingsStore, deleteBooking } from '../../store/bookingsStore';
	import BookButton from '$components/BookButton.svelte';
	import type { WashersRow } from '../../types/supabase';
	import { userStore } from '../../store/userStore';
	import { dbBookingToBusiness } from '$lib/helpers/db';
	import CurrentBooking from '$components/CurrentBooking.svelte';
	import BookButtonRow from '$components/BookButtonRow.svelte';
	export let data: PageData;
	$: ({ supabase } = data);

	let laundryBookingMap = data.laundryBookingMap;
	bookingsStore.set(laundryBookingMap);

	const userId = $userStore.id;

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
						if (newBooking.user === userId) return;
						addBooking(dbBookingToBusiness(newBooking));
					}
					if (payload.eventType === 'DELETE') {
						const oldBooking = payload.old as WashersRow;
						if (oldBooking.user === userId) return;
						deleteBooking(dbBookingToBusiness(oldBooking));
					}
				}
			)
			.subscribe();
	});
</script>

<div class="flex w-full flex-col items-center gap-4  pt-0">
	<div class="relative mt-4 flex w-full flex-col items-center">
		{#each { length: 31 } as _, i}
			<BookButtonRow {i} />
		{/each}
	</div>
</div>
<CurrentBooking />
