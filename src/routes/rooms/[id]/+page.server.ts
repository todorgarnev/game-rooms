import { redirect, type Actions } from "@sveltejs/kit";
import { getRoomUsers } from "$lib/utils/users";
import type { Room, ServerRoom } from "$lib/types/room";
import type { PageServerLoad } from "../$types";

export const load = (async ({ params, locals }) => {
	const { data } = await locals.sb
		.from("rooms")
		.select("id, name, rooms_users(user_id(id, username))")
		.eq("id", (params as { id: string }).id)
		.limit(1)
		.single();

	const currentRoom: Room = getRoomUsers(data as ServerRoom);

	return {
		name: currentRoom.name,
		usersIds: currentRoom.usersIds,
		usernames: currentRoom.usernames
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	join: async ({ locals, params }) => {
		await locals.sb
			.from("rooms_users")
			.insert({ room_id: params.id, user_id: locals.session?.user.id })
			.select();
	},
	leave: async ({ locals, params }) => {
		const { data } = await locals.sb
			.from("rooms_users")
			.select("id")
			.eq("room_id", params.id)
			.eq("user_id", locals.session?.user.id)
			.limit(1)
			.single();

		if (data) {
			await locals.sb.from("rooms_users").delete().eq("id", data.id);
			throw redirect(303, "/rooms");
		}
	}
};
