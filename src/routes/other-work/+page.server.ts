import { PRIVATE_MODE } from '$env/static/private';
import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { asc } from 'drizzle-orm';

export async function load() {
	const otherWorksList = await db.query.projects.findMany({
		orderBy: asc(projects.position),
		where: ({ type, private: privateMode }, { eq, and }) =>
			PRIVATE_MODE === '1' ? eq(type, 'OTHER') : and(eq(type, 'OTHER'), eq(privateMode, false))
	});

	return {
		projects: otherWorksList
	};
}
