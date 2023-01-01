export type ServerUser = {
	user_id: {
		id: string;
		username: string;
	};
};

export type ServerRoom = {
	id: number;
	name: string;
	is_game_started: boolean;
	created_at: string;
	winner: {
		id: string;
		username: string;
	} | null;
	rooms_users: ServerUser[];
};

export type Room = {
	id: number;
	name: string;
	isGameStarted: boolean;
	winner: string | null;
	usersIds: string[];
	usernames: string[];
};
