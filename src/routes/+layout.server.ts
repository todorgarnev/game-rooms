import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import { supabaseClient } from "$lib/supabase/supabase";
import type { LayoutServerLoad } from "./$types";

export const load = (async (event) => {
	const session = await getServerSession(event);
	let username: string | null = null;

	if (session?.user) {
		const { data } = await supabaseClient
			.from("profiles")
			.select()
			.eq("id", session?.user.id)
			.limit(1)
			.single();

		if (data) {
			username = data.username;
		}
	}

	return {
		session,
		username
	};
}) satisfies LayoutServerLoad;
