export type ServerMove = {
	id: number;
	round_id: number;
	user_id: {
		id: string;
		username: string;
	};
	user_choice: GameType;
	created_at: string;
};

export type ServerRound = {
	id: number;
	round_number: number;
	round_winner: {
		id: string;
		username: string;
	};
	moves: ServerMove[];
	is_tie: boolean | null;
};

export type Move = {
	username: string;
	userChoice: GameType;
};

export type Round = {
	roundNumber: number;
	roundWinner: string;
	moves: Move[];
};

export type RoundChoices = {
	my: GameType | null;
	opponent: GameType | null;
};

export enum GameType {
	Scissors = "scissors",
	Paper = "paper",
	Rock = "rock",
	Lizard = "lizard",
	Spock = "spock",
	Tie = "tie"
}
