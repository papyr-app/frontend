import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { api } from '$lib/api';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const token = cookies.get('token');
	if (!token) {
		throw error(401, 'Unauthorized');
	}

	const { documentID } = params;
	const response = await api.get(`/documents/${documentID}/download`, {
		headers: {
			Authorization: token
		}
	});

	if (!response.ok) {
		throw error(404, 'Document not found');
	}

	return new Response(await response.blob(), {
		headers: {
			'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream'
		}
	});
};
