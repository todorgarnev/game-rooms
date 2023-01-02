import { WIN_ROUNDS } from "$lib/constants";
import {
	GameType,
	type Move,
	type Round,
	type RoundChoices,
	type ServerMove,
	type ServerRound
} from "$lib/types";

export const getRoundWinner = (moves: ServerMove[]): string | null => {
	const myChoice: GameType = moves[0].user_choice;
	const myId: string = moves[0].user_id.id;
	const opponentChoice: GameType = moves[1].user_choice;
	const opponentId: string = moves[1].user_id.id;

	if (myChoice === opponentChoice) {
		return null;
	} else if (myChoice === GameType.Scissors) {
		if (opponentChoice === GameType.Paper || opponentChoice === GameType.Lizard) {
			return myId;
		} else {
			return opponentId;
		}
	} else if (myChoice === GameType.Paper) {
		if (opponentChoice === GameType.Rock || opponentChoice === GameType.Spock) {
			return myId;
		} else {
			return opponentId;
		}
	} else if (myChoice === GameType.Rock) {
		if (opponentChoice === GameType.Lizard || opponentChoice === GameType.Scissors) {
			return myId;
		} else {
			return opponentId;
		}
	} else if (myChoice === GameType.Lizard) {
		if (opponentChoice === GameType.Paper || opponentChoice === GameType.Spock) {
			return myId;
		} else {
			return opponentId;
		}
	} else if (myChoice === GameType.Spock) {
		if (opponentChoice === GameType.Scissors || opponentChoice === GameType.Rock) {
			return myId;
		} else {
			return opponentId;
		}
	}

	return "";
};

export const getRoomWinner = (currentRounds: ServerRound[]): string | null => {
	const winnersMap = new Map<string, number>([]);

	currentRounds.forEach((round: ServerRound) => {
		if (round.round_winner) {
			if (winnersMap.has(round.round_winner.id)) {
				winnersMap.set(
					round.round_winner.id,
					(winnersMap.get(round.round_winner.id) as number) + 1
				);
			} else {
				winnersMap.set(round.round_winner.id, 1);
			}
		}
	});

	console.log("winnersMap.size: ", winnersMap.entries());
	if (winnersMap.size > 0) {
		const [[firstUser, firstUserRounds], ...rest] = winnersMap.entries();
		console.log("rest: ", rest);

		if (firstUserRounds === WIN_ROUNDS) {
			return firstUser;
		}

		if (rest.length > 0) {
			const [[secondUser, secondUserRounds]] = rest;

			if (secondUserRounds === WIN_ROUNDS) {
				return secondUser;
			}
		}
	}

	return null;
};

export const canIMakeMove = (moves: ServerMove[], myUserId: string): boolean => {
	return !moves.some((move: ServerMove) => move.user_id.id === myUserId);
};

export const getRoundsInfo = (roundsData: ServerRound[], myUserId: string): Round[] => {
	return roundsData
		.filter((round: ServerRound) => !!round.round_winner || !!round.is_tie)
		.map((round: ServerRound) => ({
			roundNumber: round.round_number,
			roundWinner: round.round_winner ? round.round_winner.username : "tie",
			moves: sortMoves(round.moves, myUserId)
		}));
};

export const getCurrentScore = (currentRounds: Round[], opponentUsername: string): string => {
	let myRounds = 0;
	let opponentRounds = 0;

	currentRounds.forEach((round: Round) => {
		if (round.roundWinner !== GameType.Tie) {
			if (round.roundWinner === opponentUsername) {
				opponentRounds += 1;
			} else {
				myRounds += 1;
			}
		}
	});

	return currentRounds.length > 0 ? `${myRounds}:${opponentRounds}` : "0:0";
};

export const getRoundChoices = (currentRound: ServerRound, myUser: string): RoundChoices => {
	let myChoice: GameType | null = null;
	let opponentChoice: GameType | null = null;

	if (!currentRound) {
		return {
			my: myChoice,
			opponent: opponentChoice
		};
	}

	currentRound.moves.forEach((move: ServerMove) => {
		if (move.user_id.id === myUser) {
			myChoice = move.user_choice;
		} else {
			opponentChoice = move.user_choice;
		}
	});

	return {
		my: myChoice,
		opponent: opponentChoice
	};
};

const sortMoves = (moves: ServerMove[], myUserId: string): Move[] => {
	const sortedMoves: Move[] = [];

	moves.forEach((move: ServerMove) => {
		if (move.user_id.id === myUserId) {
			sortedMoves[0] = {
				username: move.user_id.username,
				userChoice: move.user_choice
			};
		} else {
			sortedMoves[1] = {
				username: move.user_id.username,
				userChoice: move.user_choice
			};
		}
	});

	return sortedMoves;
};
