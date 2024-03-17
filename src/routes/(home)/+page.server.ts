import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { desc } from 'drizzle-orm';

export async function load() {
	const projectsList = await db.query.projects.findMany({
		orderBy: desc(projects.createdAt)
	});

	return {
		projects: projectsList
	};
}
