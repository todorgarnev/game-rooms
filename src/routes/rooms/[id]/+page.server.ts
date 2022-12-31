import { redirect, type Actions } from "@sveltejs/kit";
import { getRoomUsers } from "$lib/utils/users";
import type { Room, ServerRoom } from "$lib/types/room";
import type { PageServerLoad } from "../$types";

export const load = (async ({ params, locals }) => {
	if (!locals.session) {
		throw redirect(303, "/login");
	}

	const { data } = await locals.sb
		.from("rooms")
		.select("*, rooms_users(user_id(id, username))")
		.eq("id", (params as { id: string }).id)
		.limit(1)
		.single();

	const currentRoom: Room = getRoomUsers(data as ServerRoom);

	return {
		name: currentRoom.name,
		usersIds: currentRoom.usersIds,
		usernames: currentRoom.usernames,
		winner: currentRoom.winner,
		isGameStarted: currentRoom.isGameStarted
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
	},
	start: async ({ locals, params }) => {
		await locals.sb.from("rooms").update({ is_game_started: true }).eq("id", params.id);
	},
	pick: async ({ request, locals, params }) => {
		const { number } = Object.fromEntries(await request.formData());

		const { data: allRounds } = await locals.sb
			.from("rounds")
			.select("id, round_number, moves(*)")
			.eq("room_id", params.id);

		if (allRounds) {
			if (allRounds.length === 0) {
				const { data: newRound } = await locals.sb
					.from("rounds")
					.insert({ room_id: params.id, round_number: 1 })
					.select()
					.limit(1)
					.single();

				await locals.sb.from("moves").insert({
					round_id: newRound?.id,
					user_id: locals.session?.user.id,
					selected_number: number
				});
			} else {
				const lastActiveRound = allRounds[allRounds.length - 1];

				if (lastActiveRound.moves.length === 2) {
					const { data: newRound } = await locals.sb
						.from("rounds")
						.insert({ room_id: params.id, round_number: lastActiveRound.round_number + 1 })
						.select()
						.limit(1)
						.single();

					await locals.sb.from("moves").insert({
						round_id: newRound?.id,
						user_id: locals.session?.user.id,
						selected_number: number
					});
				} else {
					await locals.sb.from("moves").insert({
						round_id: lastActiveRound.id,
						user_id: locals.session?.user.id,
						selected_number: number
					});
				}
			}
		}
	}
};
