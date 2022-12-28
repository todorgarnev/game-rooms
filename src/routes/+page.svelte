<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1>SvelteKit & Supabase Auth</h1>
{#if data.session}
	<p class="welcome">Welcome, {data.session.user.email}</p>
{:else}
	<p>Let's learn how to register and login users!</p>
{/if}