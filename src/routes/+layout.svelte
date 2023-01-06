<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase/supabase";
	import { notificationText } from "$lib/stores/notification";
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

		const roomsSb = supabaseClient
			.channel("public:rooms")
			.on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, () => {
				invalidateAll();
			})
			.subscribe();

		const roomsUsersSb = supabaseClient
			.channel("public:rooms_users")
			.on("postgres_changes", { event: "*", schema: "public", table: "rooms_users" }, (payload) => {
				if (payload.eventType === "INSERT" && payload.new.user_id !== data.session?.user.id) {
					notificationText.set("New room has been added or player joined a room");
				}

				invalidateAll();
			})
			.subscribe();

		const roundsSb = supabaseClient
			.channel("public:rounds")
			.on("postgres_changes", { event: "UPDATE", schema: "public", table: "rounds" }, (payload) => {
				if (payload.new.round_winner || payload.new.is_tie) {
					invalidateAll();
				}
			})
			.subscribe();

		const movesSb = supabaseClient
			.channel("public:moves")
			.on("postgres_changes", { event: "INSERT", schema: "public", table: "moves" }, (payload) => {
				if (payload.eventType === "INSERT" && payload.new.user_id !== data.session?.user.id) {
					notificationText.set("Player chose a hand in one of your rooms");
				}

				invalidateAll();
			})
			.subscribe();

		return () => {
			subscription.unsubscribe();
			roomsSb.unsubscribe();
			roomsUsersSb.unsubscribe();
			roundsSb.unsubscribe();
			movesSb.unsubscribe();
		};
	});
</script>

<Navigation isLoggedIn={!!data.session?.user} pageData={data} />

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
