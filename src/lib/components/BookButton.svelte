<script lang="ts">
	import type { LaundryBooking } from '../../routes/(app)/+page';
	import { userStore } from '../../store/userStore';
	import { deleteDBBooking, insertDBBooking, supabaseStore } from '../../store/supabaseStore';
	import { addBooking, bookingsStore, deleteBooking } from '../../store/bookingsStore';
	import type { SupabaseType } from '../../types/supabase';
	import { dateTo_YYY_MM_DD_String as dateTo_YYYY_MM_DD_String } from '$lib/helpers/date';

	export let part: number;
	export let day: Date;

	const userId = $userStore.id;

	let supabase: SupabaseType | null;
	supabaseStore.subscribe((value) => {
		supabase = value;
	});

	let styles = '';
	let bookedBySelf = false;
	let booked = false;
	let title = '';
	let bookings: Map<string, LaundryBooking> = new Map();
	let booking: LaundryBooking | undefined;
	bookingsStore.subscribe((value) => {
		bookings = value;

		booking = bookings.get(`${dateTo_YYYY_MM_DD_String(day)}P${part}`);
		booked = !!booking;
		styles = 'bg-slate-200';
		bookedBySelf = booking?.user === userId;
		if (booked) styles = 'bg-red-400';
		if (bookedBySelf) styles = 'bg-green-400';
		title = booked ? 'Booked' : 'Book';
	});

	function findPreviousBooking() {
		let foundBooking: LaundryBooking | undefined;
		bookings.forEach((booking) => {
			if (booking.user === userId) {
				foundBooking = booking;
			}
		});
		return foundBooking;
	}

	async function onClick() {
		if (!supabase) return;
		const date = dateTo_YYYY_MM_DD_String(day);
		let previousBooking = findPreviousBooking();
		if (previousBooking) {
			deleteDBBooking(supabase, userId, previousBooking.date, previousBooking.part);
			deleteBooking(previousBooking);
		}

		if (booked) return;
		addBooking({ date, part, user: userId });
		insertDBBooking(supabase, userId, date, part);
	}
</script>

<button on:click={onClick} class={`${styles} rounded-md border-2 border-black px-6 py-2`}
	>{title}</button
>
