import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ locals: { getUser } }) {
	const user = await getUser();

	if (!user) throw redirect(301, '/login');

	const projects = await db.query.projects.findMany();

	return {
		user,
		projects
	};
}
