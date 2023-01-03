import "$lib/supabase/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event);

	event.locals.sb = supabaseClient;
	event.locals.session = session;
	event.locals.myId = session ? session.user.id : null;

	if (session?.user.id) {
		const { data } = await supabaseClient
			.from("profiles")
			.select()
			.eq("id", session.user.id)
			.limit(1)
			.single();

		event.locals.username = data ? data.username : null;
	}

	return resolve(event);
};
