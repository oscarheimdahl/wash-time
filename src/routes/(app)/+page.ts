// src/routes/+layout.server.ts
import type { PageLoad } from './$types';

export interface LaundryBooking {
	part: number;
	date: string;
	user: string;
	booked: boolean;
	id: number;
}

export const load: PageLoad = async ({ parent }) => {
	const { supabase } = await parent();
	const { data: bookings, error } = await supabase.from('washers').select('*');

	const laundryBookingMap = new Map<string, LaundryBooking>();
	bookings?.forEach((booking) =>
		laundryBookingMap.set(`${booking.date}P${booking.part_of_day}`, {
			date: booking.date,
			part: booking.part_of_day,
			user: booking.user,
			booked: booking.booked,
			id: booking.id
		})
	);

	return {
		laundryBookingMap,
		error
	};
};
