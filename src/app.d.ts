// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedSupabaseClient } from "@supabase/auth-helpers-sveltekit/dist/types";
import type { Session } from "@supabase/supabase-js";

declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			sb: TypedSupabaseClient;
			session: Session | null;
			username: string | null;
			myId: string | null;
		}
		interface PageData {
			session: import("@supabase/supabase-js").Session | null;
			username: string | null;
		}
		// interface Platform {}
	}
}
