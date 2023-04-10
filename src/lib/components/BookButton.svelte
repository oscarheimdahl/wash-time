<script lang="ts">
	import type { LaundryBooking } from '../../routes/(app)/+page';
	import { userStore } from '../../store/userStore';
	import { deleteDBBooking, insertDBBooking, supabaseStore } from '../../store/supabaseStore';
	import { addBooking, bookingsStore, deleteBooking } from '../../store/bookingsStore';
	import type { SupabaseType } from '../../types/supabase';
	import { dateToYYYYMMDD } from '$lib/helpers/date';
	import Button from './Button.svelte';

	export let part: number;
	export let day: Date;

	const userId = $userStore.id;

	let supabase: SupabaseType | undefined;
	supabaseStore.subscribe((value) => {
		supabase = value;
	});

	let bookedBySelf = false;
	let booked = false;
	let bookings: Map<string, LaundryBooking> = new Map();
	let booking: LaundryBooking | undefined;
	let timeLabel = '08:00 - 12:00';
	if (part === 2) timeLabel = '12:00 - 17:00';
	if (part === 3) timeLabel = '17:00 - 22:00';
	let title = '';
	bookingsStore.subscribe((_bookings) => {
		bookings = _bookings;
		booking = bookings.get(`${dateToYYYYMMDD(day)}P${part}`);
		booked = !!booking;
		bookedBySelf = booking?.user === userId;
		title = bookedBySelf ? 'Avboka' : 'Boka';
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
		const sessionBookedBySelf = bookedBySelf;
		if (booked && !sessionBookedBySelf) return;
		if (!supabase) return;
		const date = dateToYYYYMMDD(day);
		let previousBooking = findPreviousBooking();
		if (previousBooking) {
			deleteBooking(previousBooking, supabase);
		}
		if (sessionBookedBySelf) return;

		addBooking({ date, part, user: userId }, supabase);
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-1 bg-white">
	<span class={`text-sm text-black ${booked && !bookedBySelf ? 'disabled' : ''}`}>{timeLabel}</span>
	<Button {onClick} disabled={booked && !bookedBySelf} destructive={bookedBySelf} class="w-full"
		>{title}</Button
	>
</div>

<style>
</style>
