import type { Room, ServerRoom, ServerUser } from "$lib/types";

export const getRoomsUsers = (roomsData: ServerRoom[]): Room[] => {
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

export const getRoomUsers = (roomsData: ServerRoom): Room => {
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
