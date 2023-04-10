import { default as fns_addDays } from 'date-fns/addDays';

export function formattedDate(date: Date) {
	return `${date.getDate()} / ${date.getMonth() + 1}`;
}
export function formattedDateShortMonth(date: Date) {
	const swedishMonths = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'Maj',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Okt',
		'Nov',
		'Dec'
	];
	return `${date.getDate()} ${swedishMonths[date.getMonth()]}`;
}
export function formattedDateLongMonth(date: Date) {
	const swedishMonths = [
		'Januari',
		'Februari',
		'Mars',
		'April',
		'Maj',
		'Juni',
		'Juli',
		'Augusti',
		'September',
		'Oktober',
		'November',
		'December'
	];
	return `${date.getDate()} ${swedishMonths[date.getMonth()]}`;
}

export function weekday(date: Date) {
	const swedishWeekDays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
	return swedishWeekDays[date.getDay()];
}

export function formatPartOfDay(part: number) {
	if (part === 1) return '08:00 - 12:00';
	if (part === 2) return '12:00 - 17:00';
	if (part === 3) return '17:00 - 22:00';
	return '';
}

export function addDays(date: Date, days: number) {
	return new Date(fns_addDays(date, days).toDateString());
}

export function dateToYYYYMMDD(date: Date) {
	const pad00 = (num: number) => num.toString().padStart(2, '0'); // 1 -> 01, 21 -> 21

	const day = pad00(date.getDate());
	const month = pad00(date.getMonth() + 1);
	const year = date.getFullYear();
	return `${year}-${month}-${day}`;
}
