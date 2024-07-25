import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { VITE_APP_VERSION } from '$env/static/private';
import { dev } from '$app/environment';

const backendUrl = PUBLIC_BACKEND_URL || 'localhost:8000';

const protocol = dev ? 'http://' : 'https://';
const wsProtocol = dev ? 'ws://' : 'wss://';

export const httpUrl = `${protocol}${backendUrl}`;
export const wsUrl = `${wsProtocol}${backendUrl}`;

export const appVersion = VITE_APP_VERSION || 'someshit';
