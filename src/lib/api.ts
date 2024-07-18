import { browser } from '$app/environment';
import { httpUrl } from '$lib/config';

type FetchOptions = RequestInit & {
	params?: Record<string, string>;
};

function apiFetch(path: string, options: FetchOptions = {}) {
	const { params, ...fetchOptions } = options;

	const url = new URL(path, httpUrl);

	if (params) {
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
	}

	const headers = new Headers(fetchOptions.headers);
	headers.set('Content-Type', 'application/json');

	if (browser) {
		fetchOptions.credentials = 'include';
	}

	return fetch(url.toString(), {
		...fetchOptions,
		headers
	});
}

export const api = {
	get: (path: string, options?: FetchOptions) => apiFetch(path, { ...options, method: 'GET' }),
	post: (path: string, body: any, options?: FetchOptions) =>
		apiFetch(path, { ...options, method: 'POST', body: JSON.stringify(body) })
	// Add other methods as needed (PUT, DELETE, etc.)
};
