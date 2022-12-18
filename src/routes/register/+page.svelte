<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { goto } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import { AuthApiError } from "@supabase/supabase-js";

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
</script>

<h1>Register</h1>
<form action="?/register" method="POST" class="auth-form" use:enhance={submitRegister}>
	<div class="input-container">
		<label for="email"> Email </label>
		<input type="text" name="email" />
	</div>

	<div class="input-container">
		<label for="password"> Password </label>
		<input type="password" name="password" />
	</div>

	{#if error}
	<p class="error">{error}</p>
{/if}

	<button class="btn btn-primary">Register</button>
</form>
