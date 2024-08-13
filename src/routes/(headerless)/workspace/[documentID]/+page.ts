import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { getDocument, storeDocument } from '$lib/indexedDB';

export const load: PageLoad = async ({ data, params, fetch }) => {
	const { documentID } = params;
	const { token } = data;

	if (!browser) {
		return {};
	}

	try {
		const cachedDocument = await getDocument(documentID);
		if (cachedDocument) {
			return { document: cachedDocument, documentID: documentID, token: token };
		}

		const response = await fetch(`/api/documents/${documentID}`);
		if (!response.ok) {
			throw new Error('Failed to fetch document');
		}

		const fetchedDocument = await response.blob();

		await storeDocument(documentID, fetchedDocument);

		return { document: fetchedDocument, documentID: documentID, token: token };
	} catch (error) {
		console.error('Error loading document:', error);
		return { error: 'Failed to load document' };
	}
};
