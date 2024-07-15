import type { PageServerLoad } from './$types';
import { httpUrl } from '$lib/config';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token') || null;

	if (!token) {
		return { status: 401, error: 'Unauthorized' };
	}

	const response = await fetch(`${httpUrl}/users/documents`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	});

	if (response.ok) {
		const responseJSON = await response.json();
		const documents = responseJSON.data;

		return { documents };
	} else {
		return { documents: [] };
	}
};
