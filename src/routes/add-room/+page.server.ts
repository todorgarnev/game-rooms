import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { z, ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, "/login");
	}
}) satisfies PageServerLoad;

const addRoomSchema = z.object({
	name: z
		.string()
		.min(4, { message: "Room name must be at least 4 characters" })
		.max(15, { message: "Room name be less than 16 character" })
		.trim()
});

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			addRoomSchema.parse(body);

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

		throw redirect(303, "/");
	}
};
