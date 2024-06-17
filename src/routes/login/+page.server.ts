import type { Actions } from './$types';
import { error } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const response = await fetch('http://localhost:5000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (!response.ok) {
			const err = await response.json();
			console.log(err);
			error(400, err.error);
		}

		// const data = await response.json();
	}
} satisfies Actions;
