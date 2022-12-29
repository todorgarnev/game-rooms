import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import type { ZodError } from "zod";
import { roomSchema } from "$lib/schemas/rooms";
import { getRoomsUsers } from "$lib/utils/users";
import type { Actions, PageServerLoad } from "./$types";
import type { Room, ServerRoom } from "$lib/types/room";

export const load = (async ({ locals }) => {
	const activeRooms: Room[] = [];
	const myRooms: Room[] = [];

	if (!locals.session) {
		throw redirect(303, "/login");
	}

	const { data } = await locals.sb
		.from("rooms")
		.select("id, name, rooms_users(user_id(id, username))");

	if (data) {
		getRoomsUsers(data as ServerRoom[]).forEach((room: Room) => {
			if (room.usersIds.includes(locals.session?.user.id ?? "")) {
				myRooms.push(room);
			} else {
				activeRooms.push(room);
			}
		});
	}

	return {
		activeRooms,
		myRooms
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			roomSchema.parse(body);

			const { data, error: err } = await locals.sb
				.from("rooms")
				.insert({ name: body.name })
				.select();

			if (data && data.length > 0) {
				await locals.sb
					.from("rooms_users")
					.insert({ room_id: data[0].id, user_id: locals.session?.user.id });
			}

			if (err) {
				if (err instanceof AuthApiError && err.status === 400) {
					return fail(400, {
						errors: { name: ["Invalid name"] }
					});
				}

				return fail(500, {
					errors: { name: ["Server error. Try again later."] }
				});
			}
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();

			return fail(400, {
				data: { name: body.name },
				errors
			});
		}
	}
};
