<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { LaundryBooking } from '../../routes/(app)/+page';
	import { user } from '../../store/user';
	import { supabase as supabaseStore } from '../../store/supabase';
	import type { SupabaseType } from '../../types/supabase';
	import { dateTo_YYY_MM_DD_String as dateTo_YYYY_MM_DD_String } from '$lib/helpers/date';
	import { onMount } from 'svelte';
	export let booking: LaundryBooking | undefined;
	export let part: number;
	export let day: Date;

	let userID = '';
	user.subscribe((value) => {
		userID = value.id;
	});

	let channel: any;

	let supabase: SupabaseType | null;
	supabaseStore.subscribe((value) => {
		supabase = value;
	});

	let bookedBySelf = booking?.user === userID;
	let booked = false;
	$: booked = !!booking?.booked;
	const title = booked ? 'Booked' : 'Book';

	async function onClick() {
		const res = await supabase?.from('washers').insert({
			date: dateTo_YYYY_MM_DD_String(day),
			part_of_day: part,
			user: userID,
			booked: true
		});
		console.log(res);
	}
</script>

<Button {onClick} class={bookedBySelf ? 'bg-green-600' : ''} secondary={!booked}>{title}</Button>
