import { writable } from "svelte/store";

export const notificationText = writable<string | null>(null);
