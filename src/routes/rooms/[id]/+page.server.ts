import type { PageServerLoad } from "../$types";

export const load = (async ({ params, locals }) => {
	const { data } = await locals.sb
		.from("rooms")
		.select("name, rooms_users(user_id(username))")
		.eq("id", params.id);
	console.log("roomData: ", JSON.stringify(data));

	return {
		room: {
			name: data && data.length > 0 ? data[0].name : "no name",
			username:
				data && data.length > 0 && data[0].rooms_users && data[0].rooms_users.user_id
					? data[0].rooms_users.user_id.username
					: "no username"
		}
	};
}) satisfies PageServerLoad;
