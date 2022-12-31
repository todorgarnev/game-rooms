export type ServerMove = {
	id: number;
	round_id: number;
	user_id: string;
	selected_number: number;
	created_at: string;
};

export type ServerRound = {
	id: number;
	round_number: number;
	round_winner: string;
	moves: ServerMove[];
};
