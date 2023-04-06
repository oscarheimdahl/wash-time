<script lang="ts">
	import Input from '../../lib/components/Input.svelte';
	import Button from '../../lib/components/Button.svelte';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let email = '';
	let password = '';
	let errorMessage = '';
	let loading = false;
	let registering = false;

	async function login() {
		loading = true;
		const { data: res, error } = await data.supabase.auth.signInWithPassword({
			email,
			password
		});

		errorMessage = error?.message ?? '';
		loading = false;
	}

	function onRegisterClick() {
		registering = true;
	}
</script>

<div class="grid h-full w-full place-content-center bg-amber-200">
	<div class="flex max-w-2xl flex-col gap-2 p-8">
		<form class="flex flex-col gap-2">
			<label for="email" />
			<label for="password" />
			<span class={`${registering ? 'bounce' : ''} flex flex-col`}>
				<Input label="email" bind:value={email} id="" />
			</span>
			<span class={`${registering ? 'bounce2' : ''} flex flex-col`}>
				<Input
					class={registering ? 'bounce' : ''}
					label="password"
					type="password"
					bind:value={password}
					id="email"
				/>
			</span>
			<div class="mt-2 flex flex-col items-center">
				<Button class="w-min px-6" onClick={login} {loading}>Login</Button>
				<Button textOnly class="" onClick={login}>Register</Button>
			</div>
		</form>
		<div class="shake grid h-4 items-center text-center">
			{#if errorMessage && !loading}
				<span class={`${errorMessage && !loading ? 'shake' : ''}`}>{errorMessage}</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.shake {
		animation: shake 1s ease 1;
		animation-delay: 800ms;
		visibility: visible !important;
	}
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		20%,
		40%,
		60%,
		80% {
			transform: translateX(-5px);
		}
		30%,
		50%,
		70% {
			transform: translateX(5px);
		}
	}
</style>
