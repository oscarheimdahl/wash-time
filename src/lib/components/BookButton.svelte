<script lang="ts">
	import type { LaundryBooking } from '../../routes/(app)/+page';
	import { userStore } from '../../store/userStore';
	import { deleteDBBooking, insertDBBooking, supabaseStore } from '../../store/supabaseStore';
	import { addBooking, bookingsStore, deleteBooking } from '../../store/bookingsStore';
	import type { SupabaseType } from '../../types/supabase';
	import { dateToYYYYMMDD } from '$lib/helpers/date';

	export let part: number;
	export let day: Date;

	const userId = $userStore.id;

	let supabase: SupabaseType | null;
	supabaseStore.subscribe((value) => {
		supabase = value;
	});

	let bookedBySelf = false;
	let booked = false;
	let bookings: Map<string, LaundryBooking> = new Map();
	let booking: LaundryBooking | undefined;
	let title = '8:00-12:00';
	if (part === 2) title = '12:00-17:00';
	if (part === 3) title = '17:00-22:00';
	bookingsStore.subscribe((_bookings) => {
		bookings = _bookings;
		booking = bookings.get(`${dateToYYYYMMDD(day)}P${part}`);
		booked = !!booking;
		bookedBySelf = booking?.user === userId;
		// title = bookedBySelf ? 'Din' : booked ? 'Bokad' : 'Ledig';
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
			deleteDBBooking(supabase, userId, previousBooking.date, previousBooking.part);
			deleteBooking(previousBooking);
		}
		if (sessionBookedBySelf) return;

		addBooking({ date, part, user: userId });
		insertDBBooking(supabase, userId, date, part);
	}
</script>

<button
	on:click={onClick}
	disabled={booked && !bookedBySelf}
	class={`rounded-md border-2 border-black p-4 text-black ${bookedBySelf ? 'booked-by-self' : ''}`}
	>{title}</button
>

<style>
	button {
		transition: transform 500ms;
		background-color: #aaa;
	}
	button:hover {
		transform: scale(0.98);
	}

	button:disabled:hover {
		transform: none;
	}
	button:disabled {
		opacity: 0.2;
	}

	button.booked-by-self {
		outline: 3px solid orangered;
		outline-offset: 3px;
		outline-style: groove;
		border: none;
		background-color: #eee;
	}
</style>
