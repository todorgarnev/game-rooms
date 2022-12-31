import type { ServerMove } from "$lib/types";

export const getRoundWinner = (moves: ServerMove[]): string => {
	return moves[0].selected_number > moves[1].selected_number ? moves[0].user_id : moves[1].user_id;
};

export const canIMakeMove = (moves: ServerMove[], myUserId: string): boolean => {
	return !moves.some((move: ServerMove) => move.user_id === myUserId);
};
