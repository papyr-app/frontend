import type { PageServerLoad } from './$types';
import { VITE_APP_VERSION } from '$env/static/private';

export const load: PageServerLoad = async () => {
	return {
		appVersion: VITE_APP_VERSION || 'something'
	};
};
