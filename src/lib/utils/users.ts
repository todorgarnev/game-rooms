import type { Room, ServerRoom, ServerUser } from "$lib/types";

export const getRoomsInfo = (roomsData: ServerRoom[]): Room[] => {
	return roomsData.map((serverRoom: ServerRoom) => ({
		id: serverRoom.id,
		name: serverRoom.name,
		isGameStarted: serverRoom.is_game_started,
		winner: serverRoom.winner,
		usersIds: serverRoom.rooms_users.map((roomServerUser: ServerUser) => roomServerUser.user_id.id),
		usernames: serverRoom.rooms_users.map(
			(roomServerUser: ServerUser) => roomServerUser.user_id.username
		)
	}));
};

export const getRoomInfo = (roomsData: ServerRoom): Room => {
	return {
		id: roomsData.id,
		name: roomsData.name,
		isGameStarted: roomsData.is_game_started,
		winner: roomsData.winner,
		usersIds: roomsData.rooms_users.map((roomServerUser: ServerUser) => roomServerUser.user_id.id),
		usernames: roomsData.rooms_users.map(
			(roomServerUser: ServerUser) => roomServerUser.user_id.username
		)
	};
};

export const getOpponentUsername = (currentRoom: ServerRoom, myUserId: string): string => {
	const opponentUser: ServerUser | undefined = currentRoom.rooms_users.find(
		(user: ServerUser) => user.user_id.id !== myUserId
	);

	return opponentUser ? opponentUser.user_id.username : "no user";
};