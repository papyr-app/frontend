import { env } from '$env/dynamic/private';

const backendUrl = env.VITE_BACKEND_URL || 'localhost:5000';

const protocol = env.NODE_ENV === 'development' ? 'http://' : 'https://';
const wsProtocol = env.NODE_ENV === 'development' ? 'ws://' : 'wss://';

export const httpUrl = `${protocol}${backendUrl}`;
export const wsUrl = `${wsProtocol}${backendUrl}`;
