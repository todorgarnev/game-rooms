import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, "/");
	}
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
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
	}
};
