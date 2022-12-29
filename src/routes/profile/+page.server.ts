import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { AuthApiError, type PostgrestError } from "@supabase/supabase-js";
import { z, ZodError } from "zod";
import { username } from "$lib/stores/user";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, "/login");
	}

	const { data } = await locals.sb.from("profiles").select().eq("id", locals.session?.user.id);

	return {
		username: data && data?.length > 0 ? data[0].username : ""
	};
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

			if (get(username)) {
				const { error } = await locals.sb
					.from("profiles")
					.update({ username: body.username })
					.eq("id", locals.session?.user.id);
				err = error;
			} else {
				const { error } = await locals.sb
					.from("profiles")
					.insert({ id: locals.session?.user.id, username: body.username });
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
				data: { username: body.username },
				errors
			});
		}

		throw redirect(303, "/");
	}
};
