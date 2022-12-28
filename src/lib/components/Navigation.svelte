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
		<a href="/" class="nav-item home">HOME</a>
		<a href="/add-room" class="nav-item">Add room</a>
		<a href="/rooms" class="nav-item">Rooms</a>
		<a href="/profile" class="nav-item">Profile</a>
		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="nav-item">Logout</button>
		</form>
	{:else}
		<a href="/login" class="nav-item">Login</a>
		<a href="/register" class="nav-item">Register</a>
	{/if}
</nav>

<style lang="postcss">
	nav {
		padding: 1rem 2rem;
		display: flex;
		justify-content: flex-end;
		background-color: var(--secondary-200);

		& .nav-item {
			padding: 0;
			color: #fff;
			background-color: transparent;
			border: none;
			font-size: 1.5rem;
			font-weight: bold;

			&:hover {
				text-decoration: underline;
				cursor: pointer;
			}

			&:not(:first-child) {
				margin-left: 2rem;
			}
		}

		& .home {
			margin-right: auto;
		}
	}

	form {
		margin-left: 2rem;
	}
</style>
