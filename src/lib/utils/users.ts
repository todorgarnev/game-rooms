import type { Room, ServerRoom, ServerUser } from "$lib/types";

export const getRoomsInfo = (roomsData: ServerRoom[], myUser: string): Room[] => {
	return roomsData.map((serverRoom: ServerRoom) => ({
		id: serverRoom.id,
		name: serverRoom.name,
		isGameStarted: serverRoom.is_game_started,
		winner: getRoomWinner(serverRoom, myUser),
		usersIds: serverRoom.rooms_users.map((roomServerUser: ServerUser) => roomServerUser.user_id.id),
		usernames: serverRoom.rooms_users.map(
			(roomServerUser: ServerUser) => roomServerUser.user_id.username
		)
	}));
};

export const getRoomInfo = (roomData: ServerRoom, myUser: string): Room => {
	return {
		id: roomData.id,
		name: roomData.name,
		isGameStarted: roomData.is_game_started,
		winner: getRoomWinner(roomData, myUser),
		usersIds: roomData.rooms_users.map((roomServerUser: ServerUser) => roomServerUser.user_id.id),
		usernames: roomData.rooms_users.map(
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

const getRoomWinner = (room: ServerRoom, myUser: string): string | null => {
	if (!room.winner) {
		return null;
	}

	if (room.winner.id === myUser) {
		return "You";
	} else {
		return room.winner.username;
	}
};