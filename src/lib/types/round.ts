export type ServerMove = {
	id: number;
	round_id: number;
	user_id: {
		id: string;
		username: string;
	};
	selected_number: number;
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
};

export type Move = {
	username: string;
	selectedNumber: number;
};

export type Round = {
	roundNumber: number;
	roundWinner: string;
	moves: Move[];
};
