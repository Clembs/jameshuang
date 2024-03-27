import { db } from '$lib/db';
import { sessions } from '$lib/db/schema';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { cleanSessions } from './cleanSessions';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export async function createSession(userId: string, cookies: RequestEvent['cookies']) {
	const [session] = await db
		.insert(sessions)
		.values({
			expiresAt: new Date(Date.now() + ONE_WEEK),
			userId: userId
		})
		.onConflictDoUpdate({
			set: {
				expiresAt: new Date(Date.now() + ONE_WEEK)
			},
			where: eq(sessions.userId, userId),
			target: [sessions.id]
		})
		.returning();

	await createSessionCookie(session.id, cookies);

	await cleanSessions();
}

export async function createSessionCookie(sessionId: string, cookies: RequestEvent['cookies']) {
	cookies.set('session_id', sessionId, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		priority: 'high',
		path: '/',
		maxAge: ONE_WEEK
	});
}
