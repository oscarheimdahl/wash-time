import { writable } from 'svelte/store';
import type { LaundryBooking } from '../routes/(app)/+page';

export function bookingKey(booking: LaundryBooking) {
	return `${booking.date}P${booking.part}`;
}

export function addBooking(newBooking: LaundryBooking) {
	const newBookingKey = bookingKey(newBooking);
	bookingsStore.update((storeMap) => {
		storeMap.set(newBookingKey, { ...newBooking });
		return storeMap;
	});
}

export function deleteBooking(booking: LaundryBooking) {
	const newBookingKey = bookingKey(booking);
	bookingsStore.update((storeMap) => {
		storeMap.delete(newBookingKey);
		return storeMap;
	});
}

export const bookingsStore = writable<Map<string, LaundryBooking>>(new Map());
