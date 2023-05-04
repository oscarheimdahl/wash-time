<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import LoginErrorMessage from '$lib/components/LoginErrorMessage.svelte';
	import type { LayoutData } from '../../$types';
	export let data: LayoutData;
	$: ({ supabase } = data);

	let email = '';
	let password = '';
	let errorMessage = '';
	let errorMessageIcon = false;
	let loading = false;

	async function login() {
		loading = true;
		const { data: res, error } = await supabase.auth.signUp({
			email,
			password
		});
		loading = false;

		errorMessage = error?.message ?? '';
		if (res.user) {
			errorMessage = 'Registreringen lyckades, se inkorg!';
			errorMessageIcon = true;
		}
	}
</script>

<div class="relative">
	<h2 class=" mb-10 text-center text-xl font-medium">Dags för tvätt</h2>
	<form class="flex flex-col">
		<Input class="mb-4" type="email" label="Email" bind:value={email} id="" />
		<div />
		<Input label="Lösenord" type="password" bind:value={password} id="email" />
		<span class="mt-2 text-center text-sm text-gray-500"
			>För att slutföra registeringen måste du verifiera din mail-address.
		</span>
		<Button class="mt-8 bg-slate-500" onClick={login} {loading}>Registrera</Button>
		<a class="m-2 mx-auto" href="/login/  ">Tillbaka</a>
	</form>
	<LoginErrorMessage {errorMessage} {loading} showIcon={errorMessageIcon} />
</div>

<style>
	/* .bounce {
		animation: bounce 2s ease 1;
	}
	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-15px);
		}
		60% {
			transform: translateY(-10px);
		}
	} */
</style>
