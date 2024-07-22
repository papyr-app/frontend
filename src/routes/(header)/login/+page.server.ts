import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { api } from '$lib/api';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const response = await api.post('/auth/login', { username, password });

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
