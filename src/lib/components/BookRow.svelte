<script lang="ts">
	import { dateTo_YYY_MM_DD_String, formattedDate } from '$lib/helpers/date';
	import type { LaundryBooking } from '../../routes/(app)/+page';
	import BookButton from './BookButton.svelte';
	export let day: Date;
	export let bookingMap: Map<string, LaundryBooking>;

	const dateString = dateTo_YYY_MM_DD_String(day);
</script>

<h2 class="text-right">{formattedDate(day)}</h2>
<BookButton {day} part={1} />
<BookButton {day} part={2} />
<BookButton {day} part={3} />
<div />
