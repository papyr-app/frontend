import type { PageServerLoad } from './$types';
import type { Document } from '$lib/types';
import { api } from '$lib/api';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token') || null;

	if (!token) {
		return { status: 401, error: 'Unauthorized' };
	}

	const response = await api.get('/users/documents', {
		headers: {
			Authorization: token
		}
	});

	if (response.ok) {
		const responseJSON = await response.json();
		const documents: Document[] = responseJSON.data;

		return { documents };
	} else {
		return { documents: [] };
	}
};
