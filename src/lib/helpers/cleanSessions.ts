import { db } from '$lib/db';
import { sessions } from '$lib/db/schema';
import { lt } from 'drizzle-orm';

export async function cleanSessions() {
	await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}
