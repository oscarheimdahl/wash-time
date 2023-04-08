<script lang="ts">
	import type { LaundryBooking } from '../../routes/(app)/+page';
	import { user } from '../../store/user';
	import { supabase as supabaseStore } from '../../store/supabase';
	import { bookings as bookingsStore } from '../../store/bookings';
	import type { SupabaseType } from '../../types/supabase';
	import { dateTo_YYY_MM_DD_String as dateTo_YYYY_MM_DD_String } from '$lib/helpers/date';
	// export let booking: LaundryBooking | undefined;
	export let part: number;
	export let day: Date;

	let userID = '';
	user.subscribe((value) => {
		userID = value.id;
	});

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
		booked = !!booking?.booked;
		styles = 'bg-slate-200';
		bookedBySelf = booking?.user === userID;
		if (booked) styles = 'bg-red-400';
		if (bookedBySelf) styles = 'bg-green-400';
		title = booked ? 'Booked' : 'Book';
	});

	async function onClick() {
		if (bookedBySelf) {
			await supabase?.from('washers').delete().eq('id', booking?.id);
			return;
		}
		if (booked) return;
		let previousBooking: LaundryBooking | undefined;
		bookings.forEach((b) => {
			if (b.user === userID) {
				previousBooking = b;
			}
		});
		if (previousBooking) {
			bookingsStore.update((map) => {
				map.delete(`${previousBooking?.date}P${previousBooking?.part}}`);
				return map;
			});
			await supabase?.from('washers').delete().eq('id', previousBooking?.id);
		}

		await supabase?.from('washers').insert({
			date: dateTo_YYYY_MM_DD_String(day),
			part_of_day: part,
			user: userID,
			booked: true
		});
	}
</script>

<button on:click={onClick} class={`${styles} rounded-md border-2 border-black px-6 py-2`}
	>{title}</button
>
