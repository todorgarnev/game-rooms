import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError, type PostgrestError } from "@supabase/supabase-js";
import { z, ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, "/login");
	}
}) satisfies PageServerLoad;

const updateUsernameSchema = z.object({
	username: z
		.string()
		.min(4, { message: "Username must be at least 4 characters" })
		.max(15, { message: "Username be less than 16 character" })
		.trim()
});

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			let err: PostgrestError | null;
			updateUsernameSchema.parse(body);

			if (locals.username) {
				const { error } = await locals.sb
					.from("profiles")
					.update({ username: body.username })
					.eq("id", locals.myId);
				err = error;
			} else {
				const { error } = await locals.sb
					.from("profiles")
					.insert({ id: locals.myId, username: body.username });
				err = error;
			}

			if (err) {
				if (err instanceof AuthApiError && err.status === 400) {
					return fail(400, {
						errors: { username: ["Invalid username"] }
					});
				}

				return fail(500, {
					errors: { username: ["Server error. Try again later."] }
				});
			}
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();

			return fail(400, {
				errors
			});
		}

		throw redirect(303, "/");
	}
};
