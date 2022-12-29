import type { Room, ServerUser, ServerRoom } from "$lib/types/room";

export const getRoomUsers = (roomsData: ServerRoom[]): Room[] => {
	return roomsData.map((serverRoom: ServerRoom) => ({
		id: serverRoom.id,
		name: serverRoom.name,
		usersIds: serverRoom.rooms_users.map((roomServerUser: ServerUser) => roomServerUser.user_id.id),
		usernames: serverRoom.rooms_users.map(
			(roomServerUser: ServerUser) => roomServerUser.user_id.username
		)
	}));
};
