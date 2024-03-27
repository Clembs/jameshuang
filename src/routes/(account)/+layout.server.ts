import { redirect } from '@sveltejs/kit';

export async function load({ locals: { getUser } }) {
	const user = await getUser();

	if (user) {
		throw redirect(301, '/dashboard');
	}
}
