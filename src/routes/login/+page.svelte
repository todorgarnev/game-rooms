<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<h1>Login</h1>
<form action="?/login" method="POST" class="auth-form" use:enhance>
	<div class="input-container">
		<label for="email">Email</label>

		<input
		class={form?.errors?.email ? "input-error" : ""}
		type="text"
		name="email"
		/>

		{#if form?.errors?.email}
			<span class="error">{form.errors.email[0]}</span>
		{/if}
	</div>

	<div class="input-container">
		<label for="password">Passwords</label>

		<input
		 class={form?.errors?.password ? "input-error" : ""}
		 type="password"
		 name="password"
		/>

		{#if form?.errors?.password}
			<span class="error">{form.errors.password[0]}</span>
		{/if}
	</div>

	{#if form?.error}
		<p class="error">{form?.error}</p>
	{/if}

	<button type="submit" class="btn btn-primary">Login</button>
</form>
