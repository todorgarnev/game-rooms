<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { supabaseClient } from "$lib/supabase";
	import type { PageData } from "./$types";

	export let data: PageData;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();

		if (error) {
			console.log("error >>", error);
		}

		cancel();
	};
</script>

<h1>SvelteKit & Supabase Auth</h1>
{#if data.session}
	<p class="welcome">Welcome, {data.session.user.email}</p>
	<form action="/logout" method="POST" use:enhance={submitLogout}>
		<button type="submit" class="btn btn-primary">Logout</button>
	</form>
{:else}
	<p>Let's learn how to register and login users!</p>
	<div class="auth-buttons">
		<a href="/login" class="btn btn-primary">Login</a>
		<a href="/register" class="btn btn-secondary">Register</a>
	</div>
{/if}

<style lang="postcss">
	.welcome {
		margin-bottom: 3rem;
	}

	.auth-buttons {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.8rem;
	}
</style>
