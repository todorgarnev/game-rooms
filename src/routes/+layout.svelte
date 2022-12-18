<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<main>
	<slot />
</main>

<style lang="scss">
	:global(label) {
		font-size: 1.2rem;
	}

	:global(.btn) {
		padding: 1rem 2rem;
		color: var(--dark-300);
		border: none;
		border-radius: 0.5rem;
		font-size: 1.6rem;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			text-decoration: none;
		}
	}

	:global(.btn-primary) {
		background-color: var(--primary-200);
		color: var(--dark-300);

		&:hover {
			background-color: var(--primary-300);
		}
	}

	:global(.btn-secondary) {
		background-color: var(--secondary-200);
		color: var(--dark-300);

		&:hover {
			background-color: var(--secondary-300);
		}
	}

	:global(.auth-form) {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 40rem;
		min-width: 40rem;

		label {
			padding-bottom: 0.2rem;
			text-align: left;
			font-size: 1.6rem;
		}
	}

	:global(input) {
		padding: 1rem 2rem;
		background-color: var(--dark-100);
		border: var(--gray) 0.2rem solid;
		border-radius: 0.5rem;
		color: #fff;
		font-size: 1.6rem;

		&:focus {
			outline: var(--primary-300) 0.2rem solid;
		}
	}

	:global(h1) {
		margin-bottom: 3rem;
		font-size: 3rem;
	}

	:global(p) {
		font-size: 1.6rem;
	}

	:global(label) {
		margin-bottom: 0.5rem;
		font-size: 1.4rem;
	}

	:global(.input-container:not(:last-child)) {
		margin-bottom: 2.5rem;
		display: flex;
		flex-direction: column;
	}

	:global(.error) {
		margin-bottom: 2rem;
		font-size: 1.2rem;
		color: red;
	}

	main {
		padding: 3.6rem;
		text-align: center;
	}
</style>
