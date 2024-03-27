import { db } from '$lib/db';
import { sessions } from '$lib/db/schema';
import { cleanSessions } from '$lib/helpers/cleanSessions';
import { createSessionCookie } from '$lib/helpers/createSession';
import { eq } from 'drizzle-orm';

export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get('session_id');

	event.locals.getUser = async () => {
		if (!sessionId) return null;

		const session = await db.query.sessions.findFirst({
			where: ({ id }, { eq }) => eq(id, sessionId),
			with: {
				user: true
			}
		});

		if (!session) return null;
		if (!session.user) return null;

		if (Date.now() >= session.expiresAt.getTime()) {
			await cleanSessions();
			return null;
		}

		if (Date.now() - session.expiresAt.getTime() <= 10 * 60 * 60 * 1000) {
			await db
				.update(sessions)
				.set({
					expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
				})
				.where(eq(sessions.id, session.id))
				.returning();

			await createSessionCookie(session.id, event.cookies);
		}

		return session.user;
	};
	return resolve(event);
}
