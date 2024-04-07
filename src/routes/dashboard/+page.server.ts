import { db } from '$lib/db';
import { projects, status } from '$lib/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ locals: { getUser } }) {
	const user = await getUser();

	if (!user) throw redirect(301, '/login');

	const projects = await db.query.projects.findMany({
		orderBy: ({ position }, { asc }) => asc(position)
	});
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

		for (const s of newStatus) {
			await db.update(status).set(s).where(eq(status.id, s.id));
		}

		return {
			success: true
		};
	},
	async reorderProjects({ request, locals: { getUser } }) {
		const user = await getUser();

		if (!user) throw redirect(301, '/login');

		const formData = await request.formData();
		const order = formData.get('order')?.toString();

		if (!order) throw error(400, 'Missing order');

		const projectOrder = order.split(',');

		for (const [index, id] of projectOrder.entries()) {
			await db
				.update(projects)
				.set({ position: index + 1 })
				.where(eq(projects.id, id));
		}

		return {
			success: true
		};
	}
};
