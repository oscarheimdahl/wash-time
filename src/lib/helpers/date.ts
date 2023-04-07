import { default as fns_addDays } from 'date-fns/addDays';

export function formattedDate(dateNum: number) {
	const date = new Date(dateNum);
	return `${date.getDate()} / ${date.getMonth() + 1}`;
}

export function addDays(date: number, days: number) {
	return fns_addDays(new Date(date), days).getTime();
}
