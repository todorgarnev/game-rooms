<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<h1>Register</h1>
<form action="?/register" method="POST" class="auth-form" use:enhance>
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

	{#if form?.error}
		<p class="error">{form?.error}</p>
	{/if}

	<button class="btn btn-primary">Register</button>
</form>
