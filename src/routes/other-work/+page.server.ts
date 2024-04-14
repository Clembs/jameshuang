import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { asc } from 'drizzle-orm';

export async function load() {
	const otherWorksList = await db.query.projects.findMany({
		orderBy: asc(projects.position),
		where: ({ type }, { eq }) => eq(type, 'OTHER')
	});

	return {
		projects: otherWorksList
	};
}
