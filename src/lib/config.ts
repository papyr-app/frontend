import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { dev } from '$app/environment';

const backendUrl = PUBLIC_BACKEND_URL || 'localhost:8000';

const protocol = dev ? 'http://' : 'https://';
const wsProtocol = dev ? 'ws://' : 'wss://';

export const httpUrl = `${protocol}${backendUrl}`;
export const wsUrl = `${wsProtocol}${backendUrl}`;
