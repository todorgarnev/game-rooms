import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import type { ZodError } from "zod/lib";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, "/");
	}
}) satisfies PageServerLoad;

const registerSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.max(64, { message: "Email must be less than 64 character" })
		.email(),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" })
		.max(32, "Password must be less than 32 character")
		.trim(),
	confirmPassword: z
		.string()
		.min(6, { message: "Confirm password must be at least 6 characters" })
		.max(32, "Confirm password must be less than 32 character")
		.trim()
});

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const results = registerSchema.parse(body);
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();
			const { password, confirmPassword, ...rest } = body;

			return fail(400, {
				data: rest,
				errors
			});
		}

		// const { error: err } = await locals.sb.auth.signUp({
		// 	email: body.email as string,
		// 	password: body.password as string
		// });

		// if (err) {
		// 	if (err instanceof AuthApiError && err.status === 400) {
		// 		return fail(400, {
		// 			error: "Invalid email or password"
		// 		});
		// 	}

		// 	return fail(500, {
		// 		error: "Server error. Please try again later."
		// 	});
		// }

		// throw redirect(303, "/");
	}
};
