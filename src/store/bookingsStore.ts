import { writable } from 'svelte/store';
import type { LaundryBooking } from '../routes/(app)/+page';
import { deleteDBBooking, insertDBBooking } from './supabaseStore';
import type { SupabaseType } from '../types/supabase';

export function bookingKey(booking: LaundryBooking) {
	return `${booking.date}P${booking.part}`;
}

export function addBooking(newBooking: LaundryBooking, supabase: SupabaseType) {
	insertDBBooking(supabase, newBooking.user, newBooking.date, newBooking.part);

	const newBookingKey = bookingKey(newBooking);
	bookingsStore.update((storeMap) => {
		storeMap.set(newBookingKey, { ...newBooking });
		return storeMap;
	});
}

export function deleteBooking(booking: LaundryBooking, supabase: SupabaseType) {
	deleteDBBooking(supabase, booking.user, booking.date, booking.part);
	const newBookingKey = bookingKey(booking);
	bookingsStore.update((storeMap) => {
		storeMap.delete(newBookingKey);
		return storeMap;
	});
}

export const bookingsStore = writable<Map<string, LaundryBooking>>(new Map());
