<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
	import("../app.css");

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

<slot />
