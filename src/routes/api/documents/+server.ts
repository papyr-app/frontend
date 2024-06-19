import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const response = await fetch('http://localhost:5000/api/documents', {
		method: 'GET'
	});

	if (response.ok) {
		const responseJSON = await response.json();
		console.log(responseJSON);
	}

	return new Response(null, { status: 200 });
};
