import { db } from '$lib/db';
import { status } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ locals: { getUser } }) {
	const user = await getUser();

	if (!user) throw redirect(301, '/login');

	const projects = await db.query.projects.findMany();
	const status = await db.query.status.findMany();

	return {
		user,
		projects,
		status
	};
}

export const actions = {
	async editStatus({ request, locals: { getUser } }) {
		const user = await getUser();

		if (!user) throw redirect(301, '/login');

		const formData = await request.formData();
		const statusTitles = formData.getAll('title');
		const statusImageUrls = formData.getAll('image_url');

		const newStatus = statusTitles.map((title, index) => ({
			id: index + 1,
			title: title.toString(),
			imageUrl: statusImageUrls[index].toString()
		}));

		console.log(newStatus);

		for (const s of newStatus) {
			await db.update(status).set(s).where(eq(status.id, s.id));
		}

		return {
			success: true
		};
	}
};
