<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { goto } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import { AuthApiError } from "@supabase/supabase-js";

	export let error: string = "";

	const submitLogin: SubmitFunction = async ({ data, cancel }) => {
		const body = Object.fromEntries(data);
		const { error: err } = await supabaseClient.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});

		cancel();

		if (err) {
			error =
				err instanceof AuthApiError && err.status === 400
					? "Wrong credentials"
					: "Server error. Try again later.";
		} else {
			goto("/");
		}
	};
</script>

<h1>Login</h1>
<form action="?/login" method="POST" class="auth-form">
	<div class="input-container">
		<label for="email">Email</label>
		<input type="text" name="email" />
	</div>

	<div class="input-container">
		<label for="password">Passwords</label>
		<input type="password" name="password" />
	</div>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<button type="submit" class="btn btn-primary">Login</button>
</form>
