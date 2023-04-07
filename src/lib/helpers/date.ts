import { default as fns_addDays } from 'date-fns/addDays';

export function formattedDate(date: Date) {
	return `${date.getDate()} / ${date.getMonth() + 1}`;
}

export function addDays(date: Date, days: number) {
	return new Date(fns_addDays(date, days).toDateString());
}

export function dateTo_YYY_MM_DD_String(date: Date) {
	const pad00 = (num: number) => num.toString().padStart(2, '0'); // 1 -> 01, 21 -> 21

	const day = pad00(date.getDate());
	const month = pad00(date.getMonth() + 1);
	const year = date.getFullYear();
	return `${year}-${month}-${day}`;
}
