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
	let loading = false;

	async function login() {
		loading = true;
		const { data: res, error } = await supabase.auth.signUp({
			email,
			password
		});

		errorMessage = error?.message ?? '';
		loading = false;
	}
</script>

<div class="relative p-2">
	<form class="flex flex-col gap-2">
		<Input type="email" label="email" bind:value={email} id="" />
		<div />
		<Input label="password" type="password" bind:value={password} id="email" />
		<div class="mt-2 flex flex-col items-center">
			<Button class="w-min bg-slate-400 px-6" onClick={login} {loading}>Register</Button>
			<div class="flex w-80 justify-center gap-2">
				<a class="m-2" href="/login/  "><Button textOnly class="">Back</Button></a>
			</div>
		</div>
	</form>
	<LoginErrorMessage {errorMessage} {loading} />
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
