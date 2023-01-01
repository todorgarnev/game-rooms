import type { Move, Round, ServerMove, ServerRound } from "$lib/types";

export const getRoundWinner = (moves: ServerMove[]): string => {
	return moves[0].selected_number > moves[1].selected_number
		? moves[0].user_id.id
		: moves[1].user_id.id;
};

export const getRoomWinner = (currentRounds: ServerRound[]): string => {
	const winnersMap = new Map<string, number>([]);

	currentRounds.forEach((round: ServerRound) => {
		if (winnersMap.has(round.round_winner.id)) {
			winnersMap.set(round.round_winner.id, (winnersMap.get(round.round_winner.id) as number) + 1);
		} else {
			winnersMap.set(round.round_winner.id, 1);
		}
	});

	const [[firstUser, firstUserRounds], [secondUser, secondUserRounds]] = winnersMap.entries();

	return firstUserRounds > secondUserRounds ? firstUser : secondUser;
};

export const canIMakeMove = (moves: ServerMove[], myUserId: string): boolean => {
	return !moves.some((move: ServerMove) => move.user_id.id === myUserId);
};

export const getRoundsInfo = (roundsData: ServerRound[], myUserId: string): Round[] => {
	return roundsData
		.filter((round: ServerRound) => !!round.round_winner)
		.map((round: ServerRound) => ({
			roundNumber: round.round_number,
			roundWinner: round.round_winner.username,
			moves: sortMoves(round.moves, myUserId)
		}));
};

export const getCurrentScore = (currentRounds: Round[], opponentUsername: string): string => {
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

export const isGameFinished = (currentRounds: ServerRound[]): boolean => {
	const lastRoundNumber: number = currentRounds[currentRounds.length - 1].round_number;
	const isLastRoundFinished: boolean = currentRounds[currentRounds.length - 1].moves.length === 2;

	return lastRoundNumber === 9 && isLastRoundFinished;
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
