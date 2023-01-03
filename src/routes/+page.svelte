<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if data.session}
	<p class="welcome">Welcome, {data.username || data.session.user.email}</p>

	{#if !data.username}
		<div class="set-username">
			You should set your username first. <br /> You can do it in <b>Profile</b> page or click
			<a href="/profile">here</a>
		</div>
	{/if}
{:else}
	<p>Let's learn how to register and login users!</p>
{/if}

<style lang="postcss">
	.set-username {
		margin-top: 5rem;
		font-size: 2rem;

		& a,
		& b {
			color: var(--primary-100)
		}
	}
</style>
