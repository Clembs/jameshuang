import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { asc } from 'drizzle-orm';

export async function load() {
	const projectsList = await db.query.projects.findMany({
		orderBy: asc(projects.position)
	});

	return {
		projects: projectsList
	};
}
