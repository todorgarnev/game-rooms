<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { supabaseClient } from "$lib/supabase/supabase";

	export let isLoggedIn: boolean;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		await supabaseClient.auth.signOut();
		cancel();
	};
</script>

<nav>
	{#if isLoggedIn}
		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="">Logout</button>
		</form>
	{:else}
		<a href="/login" class="">Login</a>
		<a href="/register" class="">Register</a>
	{/if}
</nav>

<style lang="postcss">
	nav {
		background-color: var(--secondary-200);
	}
</style>
