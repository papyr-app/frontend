import type { RequestHandler } from '@sveltejs/kit';
import { httpUrl } from '$lib/config';


export const GET: RequestHandler = async () => {
	const response = await fetch(`${httpUrl}/documents`, {
		method: 'GET'
	});

	if (response.ok) {
		const responseJSON = await response.json();
		console.log(responseJSON);
	}

	return new Response(null, { status: 200 });
};
