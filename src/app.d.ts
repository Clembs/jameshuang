import type { users } from '$lib/db/schema';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getUser: () => Promise<typeof users.$inferSelect | null | undefined>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
