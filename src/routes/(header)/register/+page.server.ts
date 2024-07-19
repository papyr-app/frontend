import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { httpUrl } from '$lib/config';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const email = formData.get('email');
		const first_name = formData.get('first_name');
		const last_name = formData.get('last_name');
		const password = formData.get('password');

		const response = await fetch(`${httpUrl}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, first_name, last_name, password })
		});

		if (response.ok) {
			return { success: true };
		} else {
			return fail(response.status, { username, incorrect: true });
		}
	}
} satisfies Actions;
