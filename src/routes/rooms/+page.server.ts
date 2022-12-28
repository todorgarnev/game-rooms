import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, "/login");
	}

	const { data } = await locals.sb
		.from("rooms")
		.select("id, name, rooms_users(user_id(id, username))");
	console.log("data: ", JSON.stringify(data));

	return {
		rooms: data
	};
}) satisfies PageServerLoad;
