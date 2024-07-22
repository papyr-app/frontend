const DB_NAME = 'DocumentStorage';
const STORE_NAME = 'documents';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			db.createObjectStore(STORE_NAME, { keyPath: 'id' });
		};
	});
}

export async function storeDocument(id: string, document: Blob): Promise<void> {
	const db = await openDB();
	const transaction = db.transaction([STORE_NAME], 'readwrite');
	const store = transaction.objectStore(STORE_NAME);

	await store.put({ id, document });
}

export async function getDocument(id: string): Promise<Blob | null> {
	const db = await openDB();
	const transaction = db.transaction([STORE_NAME], 'readonly');
	const store = transaction.objectStore(STORE_NAME);
	const result = await store.get(id);

	return result?.document || null;
}
