import { DISCORD_JAMES_DM_ID, DISCORD_TOKEN, PRIVATE_MODE } from '$env/static/private';
import { db } from '$lib/db';
import { projects } from '$lib/db/schema';
import { error, fail } from '@sveltejs/kit';
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

export const actions = {
	async contact({ request, fetch }) {
		const reasons = {
			general: 'General inquiry',
			advertising: 'Advertising/Sponsorships',
			media: 'Media',
			feedback: 'Feedback/Suggestions',
			fanmail: 'Fanmail'
		};

		const formData = await request.formData();
		const fullName = formData.get('full-name')?.toString();
		const email = formData.get('email')?.toString();
		const reason = formData.get('reason')?.toString() as keyof typeof reasons | null;
		const message = formData.get('message')?.toString();

		if (!fullName || !email || !reason || !message) {
			return fail(400, {
				fullName: !fullName ? 'Full name is required' : '',
				email: !email ? 'Email is required' : '',
				reason: !reason ? 'Reason is required' : '',
				message: !message ? 'Message is required' : ''
			});
		}

		if (!reasons[reason]) {
			return fail(400, {
				reason: 'Invalid reason'
			});
		}

		const req = await fetch(
			`https://discord.com/api/v10/channels/${DISCORD_JAMES_DM_ID}/messages`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bot ${DISCORD_TOKEN}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					embeds: [
						{
							title: `${email} sent you a message`,
							description: message,
							fields: [
								{
									name: 'Email',
									value: email
								},
								{
									name: 'Display name',
									value: fullName
								},
								{
									name: 'Reason for inquiry',
									value: reasons[reason]
								}
							]
						}
					]
				})
			}
		);

		if (req.ok) {
			return {
				success: true
			};
		} else {
			throw error(req.status, await req.text());
		}
	}
};
