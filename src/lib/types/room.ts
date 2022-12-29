export type ServerUser = {
	user_id: {
		id: string;
		username: string;
	};
};

export type ServerRoom = {
	id: number;
	name: string;
	rooms_users: ServerUser[];
};

export type Room = {
	id: number;
	name: string;
	usersIds: string[];
	usernames: string[];
};
