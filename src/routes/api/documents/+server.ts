import type { RequestHandler } from '@sveltejs/kit';
import { api } from '$lib/api';

export const GET: RequestHandler = async () => {
	const response = await api.get('/documents');

	if (response.ok) {
		const responseJSON = await response.json();
		console.log(responseJSON);
	}

	return new Response(null, { status: 200 });
};
