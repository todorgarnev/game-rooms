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

<main>
	<h1>Register</h1>
	<form action="?/register" method="POST" class="auth-form" use:enhance={submitRegister}>
		<label for=""> Email </label>
		<input type="text" name="email" />
		<label for=""> Password </label>
		<input type="password" name="password" />
		<button class="btn btn-primary">Register</button>
	</form>
</main>
