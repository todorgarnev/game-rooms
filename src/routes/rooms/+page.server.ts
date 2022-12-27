import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, "/login");
	}

	const { data } = await locals.sb.from("rooms").select();

	return {
		rooms: data
	};
}) satisfies PageServerLoad;
