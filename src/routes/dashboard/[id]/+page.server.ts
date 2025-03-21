import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import type { Project } from '$lib/db/types';
import { uploadFiles } from '$lib/helpers/uploadFile';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params, url, locals: { getUser } }) {
	const user = await getUser();

	if (!user) throw error(401, 'Unauthorized');

	if (params.id === 'new') {
		const type = url.searchParams.get('type') as Project['type'];

		if (!type) throw error(400, 'Missing type');

		return {
			isNewProject: true,
			project: {
				id: '',
				title: '',
				year: new Date().getFullYear(),
				article: '',
				bannerUrl: '',
				bannerThumbUrl: '',
				bannerWidth: 0,
				bannerHeight: 0,
				mediums: [],
				roles: '',
				tools: [],
				timeline: '',
				type,
				private: false
			} satisfies Partial<Project>
		};
	}

	const project = await db.query.projects.findFirst({
		where: ({ id }, { eq }) => eq(id, params.id)
	});

	if (!project) throw error(404);

	return {
		project
	};
}

export const actions = {
	async editMetadata({ params, url, locals: { getUser }, request }) {
		const user = await getUser();

		if (!user) throw error(401, 'Unauthorized');

		const formData = await request.formData();
		const {
			title,
			'banner-blob': bannerFileRaw,
			year,
			timeline,
			roles
		} = Object.fromEntries(formData);
		const mediums = formData.getAll('medium').map((medium) => medium.toString());
		const tools = formData.getAll('tool').map((tool) => tool.toString());
		const isPrivate = formData.get('private')?.toString() === 'on';
		const bannerFile = bannerFileRaw as File;

		const banner = {
			highQuality: '',
			thumbnail: '',
			height: 0,
			width: 0
		};

		if (bannerFile && bannerFile.size) {
			let files;

			try {
				files = await uploadFiles(`projects/${params.id}`, bannerFile);
			} catch (err) {
				return fail(500, { message: String(err) });
			}

			const name = bannerFile.name.split('.').slice(0, -1).join('.');
			const bannerHq = files.get(`${name}-hq.webp`);
			const bannerThumb = files.get(`${name}-thumb.webp`);

			if (!bannerHq || !bannerThumb) {
				throw error(500, 'Failed to upload banner');
			}

			banner.highQuality = bannerHq.url || '';
			banner.thumbnail = bannerThumb.url || '';
			banner.height = bannerHq.height || 0;
			banner.width = bannerHq.width || 0;
		}

		const type = url.searchParams.get('type')?.toUpperCase() as Project['type'];
		let workUrl;

		if (type === 'OTHER') {
			const file = formData.get('file') as File;

			if (file && file.size) {
				let files;

				try {
					files = await uploadFiles(`other/${params.id}`, file);
				} catch (err) {
					return fail(500, { message: String(err) });
				}

				workUrl = Array.from(files)[0][1].url;
			}
		}

		const updatedProject = {
			title: title.toString(),
			...(banner.height && {
				bannerUrl: banner.highQuality,
				bannerThumbUrl: banner.thumbnail,
				bannerWidth: banner.width,
				bannerHeight: banner.height
			}),
			year: Number(year.toString()),
			timeline: timeline.toString(),
			roles: roles.toString(),
			mediums,
			tools,
			url: workUrl,
			private: isPrivate
		};

		if (params.id === 'new' && banner) {
			const slug = formData.get('slug')?.toString();

			if (!slug) throw error(400, 'Missing slug');
			if (!type) throw error(400, 'Missing type');

			const project = {
				id: slug,
				article: '',
				type,
				...updatedProject,
				bannerUrl: banner.highQuality
			};

			const [newProject] = await db.insert(projects).values(project).returning();

			throw redirect(301, `/dashboard/${newProject.id}`);
		} else {
			await db.update(projects).set(updatedProject).where(eq(projects.id, params.id));

			return {
				success: true
			};
		}
	},
	async editContent({ params, locals: { getUser }, request }) {
		const user = await getUser();

		if (!user) throw error(401, 'Unauthorized');

		const data = await request.formData();
		const content = data.get('content')?.toString();

		await db.update(projects).set({ article: content }).where(eq(projects.id, params.id));

		return {
			success: true
		};
	}
};
