<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1>SvelteKit & Supabase Auth</h1>
	{#if data.session}
		<p>Welcome, {data.session.user.email}</p>
		<form action="/logout" method="POST">
			<button type="submit" class="btn btn-primary">Logout</button>
		</form>
	{:else}
		<p>Let's learn how to register and login users!</p>
		<div class="auth-buttons">
			<a href="/login" class="btn btn-primary">Login</a>
			<a href="/register" class="btn btn-secondary">Register</a>
		</div>
	{/if}
</main>
