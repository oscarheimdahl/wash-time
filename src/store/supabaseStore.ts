import { writable } from 'svelte/store';
import type { SupabaseType } from '../types/supabase';

export async function deleteDBBooking(
	supabase: SupabaseType,
	userId: string,
	date: string,
	part: number
) {
	await supabase
		.from('washers')
		.delete()
		.eq('user', userId)
		.eq('date', date)
		.eq('part_of_day', part);
}
export async function insertDBBooking(
	supabase: SupabaseType,
	userId: string,
	date: string,
	part: number
) {
	await supabase.from('washers').insert({
		date: date,
		part_of_day: part,
		user: userId,
		booked: true
	});
}

export const supabaseStore = writable<undefined | SupabaseType>(undefined);
