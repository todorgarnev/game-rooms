<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase/supabase";
	import { roomName } from "$lib/stores/notification";
	import Notification from "$lib/components/Notification.svelte";
	import type { PageData } from "./$types";
	import "$lib/styles/global.postcss";

	export let data: PageData;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		const sb = supabaseClient
			.channel("public:rooms")
			.on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, (payload: any) => {
				if (!payload.new?.users?.includes(data.session?.user.id) ) {
					roomName.set(payload.new.name || "");
				}
			})
			.subscribe();

		return () => {
			sb.unsubscribe();
			subscription.unsubscribe();
		};
	});
</script>

<main>
	<Notification />
	<slot />
</main>

<style lang="postcss">
	main {
		padding: 3.6rem;
		text-align: center;
	}
</style>
