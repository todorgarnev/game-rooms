import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { z, ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, "/");
	}
}) satisfies PageServerLoad;

const loginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, { message: "Email is required" })
		.max(64, { message: "Email must be less than 64 character" })
		.email(),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, { message: "Password must be at least 6 characters" })
		.max(32, "Password must be less than 32 character")
		.trim()
});

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const results = loginSchema.parse(body);
			const { error: err } = await locals.sb.auth.signInWithPassword({
				email: body.email as string,
				password: body.password as string
			});

			if (err) {
				if (err instanceof AuthApiError && err.status === 400) {
					return fail(400, {
						error: "Wrong credentials"
					});
				}

				return fail(500, {
					error: "Server error. Try again later."
				});
			}

			throw redirect(303, "/");
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();

			return fail(400, {
				data: { email: body.email },
				errors
			});
		}
	}
};
