import { z } from "zod";

export const roomSchema = z.object({
	name: z
		.string()
		.min(4, { message: "Room name must be at least 4 characters" })
		.max(25, { message: "Room name be less than 26 character" })
		.trim()
});
