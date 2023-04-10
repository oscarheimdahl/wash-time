<script lang="ts">
	import type { LaundryBooking } from '../../routes/(app)/proxy+page';
	import { bookingsStore, deleteBooking } from '../../store/bookingsStore';
	import { supabaseStore } from '../../store/supabaseStore';
	import { userStore } from '../../store/userStore';
	import type { SupabaseType } from '../../types/supabase';
	import Button from './Button.svelte';

	let userId: string | undefined;
	let booking: LaundryBooking | undefined;
	let supabase: SupabaseType | undefined;
	supabaseStore.subscribe((_supabase) => (supabase = _supabase));
	userStore.subscribe((user) => (userId = user.id));
	bookingsStore.subscribe((_bookings) => {
		booking = undefined;
		_bookings.forEach((_booking) => {
			if (_booking.user === userId) booking = _booking;
		});
	});

	function onClick() {
		if (!booking || !supabase) return;
		deleteBooking(booking, supabase);
	}
</script>

<div
	class={`fixed bottom-0 flex w-full justify-center transition-transform ${
		booking ? '' : 'translate-y-full'
	}`}
>
	<div
		class="shadow-time flex w-full max-w-2xl items-center justify-between rounded-md bg-white p-4 shadow"
	>
		<div class="info-text flex gap-2">
			<span>Din bokning:</span>
			{#if booking}
				<span class="font-semibold">{booking?.date} {booking?.part}</span>
			{/if}
		</div>
		<Button {onClick} destructive>Avboka</Button>
	</div>
</div>

<style>
	.shadow-time {
		box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1);
	}

	@media screen and (max-width: 42rem) {
		div {
			border-radius: 0;
		}
	}

	@media screen and (max-width: 500px) {
		.info-text {
			flex-direction: column;
			gap: 0;
			font-size: 0.875rem /* 14px */;
			line-height: 1.25rem /* 20px */;
		}
	}
</style>
