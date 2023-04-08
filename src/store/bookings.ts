import { writable } from 'svelte/store';
import type { LaundryBooking } from '../routes/(app)/+page';

export const bookings = writable<Map<string, LaundryBooking>>(new Map());
