import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
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

		if (response.ok) {
			const responseJSON = await response.json();
			const token = responseJSON.data;

			cookies.set('token', token, { path: '/' });

			return { success: true, token };
		} else {
			return fail(401, { username, incorrect: true });
		}
	}
} satisfies Actions;
