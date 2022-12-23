<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { goto } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import { AuthApiError } from "@supabase/supabase-js";
	import type { ActionData } from "./$types";

	export let form: ActionData;
	export let error: string = "";

	const submitRegister: SubmitFunction = async ({ data, cancel }) => {
		const body = Object.fromEntries(data);
		const { error: err } = await supabaseClient.auth.signUp({
			email: body.email as string,
			password: body.password as string
		});

		cancel();

		if (err) {
			error =
				err instanceof AuthApiError && err.status === 400
					? "Invalid email or password"
					: "Server error. Try again later.";
		} else {
			goto("/login");
		}
	};

	$: error = form?.error ?? "";
</script>

<h1>Register</h1>
<form action="?/register" method="POST" class="auth-form">
	<div class="input-container">
		<label for="email">Email</label>

		<input
			class={form?.errors?.email ? "input-error" : ""}
			type="text"
			name="email"
			value={form?.data?.email ?? ""}
		/>

		{#if form?.errors?.email}
			<span class="error">{form.errors.email[0]}</span>
		{/if}
	</div>

	<div class="input-container">
		<label for="password">Password</label>

		<input class={form?.errors?.password ? "input-error" : ""} type="password" name="password" />

		{#if form?.errors?.password}
			<span class="error">{form.errors.password[0]}</span>
		{/if}
	</div>

	<div class="input-container">
		<label for="confirmPassword">Confirm Password</label>

		<input
			class={form?.errors?.confirmPassword ? "input-error" : ""}
			type="password"
			name="confirmPassword"
		/>

		{#if form?.errors?.confirmPassword}
			<span class="error">{form.errors.confirmPassword[0]}</span>
		{/if}
	</div>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<button class="btn btn-primary">Register</button>
</form>
