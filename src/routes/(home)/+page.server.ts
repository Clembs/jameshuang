import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { asc } from 'drizzle-orm';

export async function load() {
	const projectsList = await db.query.projects.findMany({
		orderBy: asc(projects.position),
		where: ({ type }, { eq }) => eq(type, 'PROJECT')
	});

	const status = await db.query.status.findMany();

	return {
		projects: projectsList,
		status
	};
}
