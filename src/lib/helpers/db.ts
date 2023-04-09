import type { LaundryBooking } from '../../routes/(app)/proxy+page';
import type { WashersRow } from '../../types/supabase';

export function dbBookingToBusiness(dbBooking: WashersRow) {
	const laundryBooking: LaundryBooking = {
		date: dbBooking.date,
		id: dbBooking.id,
		part: dbBooking.part_of_day,
		user: dbBooking.user
	};
	return laundryBooking;
}
