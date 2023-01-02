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

		const roomsUsersSb = supabaseClient
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

		const roomsSb = supabaseClient
			.channel("public:rooms")
			.on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, (payload: any) => {
				// TODO a better notification with precise room information
				// will need additional supabase requests here
				// if (payload.eventType === "INSERT" && payload.new.user_id !== data.session?.user.id) {
				// 	showNewRoom.set(true);
				// }

				invalidateAll();
			})
			.subscribe();

		const roundsSb = supabaseClient
			.channel("public:rounds")
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "rounds" },
				(payload: any) => {
					if (payload.new.round_winner || payload.new.is_tie) {
						invalidateAll();
					}
				}
			)
			.subscribe();

			const movesSb = supabaseClient
			.channel("public:moves")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "moves" },
				(payload: any) => {
						invalidateAll();
				}
			)
			.subscribe();

		return () => {
			subscription.unsubscribe();
			roomsUsersSb.unsubscribe();
			roomsSb.unsubscribe();
			roundsSb.unsubscribe();
			movesSb.unsubscribe();
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
