import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { url: 'sample.pdf' };
};
