import type { Move, Round, ServerMove, ServerRound } from "$lib/types";

export const getRoundWinner = (moves: ServerMove[]): string => {
	return moves[0].selected_number > moves[1].selected_number
		? moves[0].user_id.id
		: moves[1].user_id.id;
};

export const canIMakeMove = (moves: ServerMove[], myUserId: string): boolean => {
	return !moves.some((move: ServerMove) => move.user_id.id === myUserId);
};

export const getRoundsInfo = (roundsData: ServerRound[], myUserId: string): Round[] => {
	return roundsData.map((round: ServerRound) => ({
		roundNumber: round.round_number,
		roundWinner: round.round_winner.username,
		moves: sortMoves(round.moves, myUserId)
	}));
};

export const getCurrentScore = (currentRounds: Round[], opponentUsername: string): string => {
	console.log("currentRounds: ", currentRounds);
	let myRounds = 0;
	let opponentRounds = 0;

	currentRounds.forEach((round: Round) => {
		if (round.roundWinner === opponentUsername) {
			opponentRounds += 1;
		} else {
			myRounds += 1;
		}
	});

	return currentRounds.length > 0 ? `${myRounds}:${opponentRounds}` : "0:0";
};

const sortMoves = (moves: ServerMove[], myUserId: string): Move[] => {
	const sortedMoves: Move[] = [];

	moves.forEach((move: ServerMove) => {
		if (move.user_id.id === myUserId) {
			sortedMoves[0] = {
				username: move.user_id.username,
				selectedNumber: move.selected_number
			};
		} else {
			sortedMoves[1] = {
				username: move.user_id.username,
				selectedNumber: move.selected_number
			};
		}
	});

	return sortedMoves;
};
