import { db } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const project = await db.query.projects.findFirst({
		where: ({ id }, { eq }) => eq(id, params.id)
	});

	if (!project) {
		throw error(404);
	}

	return project;
}
