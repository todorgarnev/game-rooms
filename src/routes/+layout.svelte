<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import "$lib/styles/global.postcss";

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		const sb = supabaseClient
			.channel("public:rooms")
			.on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, (payload) => {
				console.log("Change received!", payload);
			})
			.subscribe();

		return () => {
			sb.unsubscribe();
			subscription.unsubscribe();
		};
	});
</script>

<main>
	<slot />
</main>

<style lang="postcss">
	main {
		padding: 3.6rem;
		text-align: center;
	}
</style>
