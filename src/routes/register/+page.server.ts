import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { z, ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, "/");
	}
}) satisfies PageServerLoad;

const registerSchema = z
	.object({
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
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "Password and Confirm password must match",
				path: ["password"]
			});
			ctx.addIssue({
				code: "custom",
				message: "Password and Confirm password must match",
				path: ["confirmPassword"]
			});
		}
	});

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			registerSchema.parse(body);

			const { error: err } = await locals.sb.auth.signUp({
				email: body.email as string,
				password: body.password as string
			});

			if (err) {
				if (err instanceof AuthApiError && err.status === 400) {
					return fail(400, {
						error: "Invalid email or password"
					});
				}

				return fail(500, {
					error: "Server error. Please try again later."
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
