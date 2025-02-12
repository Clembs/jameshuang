import { PRIVATE_MODE } from '$env/static/private';
import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { asc } from 'drizzle-orm';

export async function load() {
	const projectsList = await db.query.projects.findMany({
		orderBy: asc(projects.position),
		where: ({ type, private: privateMode }, { eq, and }) =>
			PRIVATE_MODE === '1' ? eq(type, 'PROJECT') : and(eq(type, 'PROJECT'), eq(privateMode, false))
	});

	const status = await db.query.status.findMany();

	return {
		projects: projectsList,
		status,
		privateMode: PRIVATE_MODE === '1'
	};
}
