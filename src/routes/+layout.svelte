<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase/supabase";
	import { showNewRoom } from "$lib/stores/notification";
	import Notification from "$lib/components/Notification.svelte";
	import Navigation from "$lib/components/Navigation.svelte";
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
			.channel("public:rooms_users")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "rooms_users" },
				(payload: any) => {
					// TODO a better notification with precise room information
					// will need additional supabase requests here
					if (payload.eventType === "INSERT" && payload.new.user_id !== data.session?.user.id) {
						showNewRoom.set(true);
					}

					invalidateAll();
				}
			)
			.subscribe();

		return () => {
			sb.unsubscribe();
			subscription.unsubscribe();
		};
	});
</script>

<Navigation isLoggedIn={!!data.session?.user} />

<main>
	<slot />
	<Notification />
</main>

<style lang="postcss">
	main {
		padding: 3.6rem;
		text-align: center;
	}
</style>
