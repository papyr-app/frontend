const backendUrl = import.meta.env.VITE_BACKEND_URL || 'localhost:5000';

const protocol = import.meta.env.NODE_ENV === 'development' ? 'http://' : 'https://';
const wsProtocol = import.meta.env.NODE_ENV === 'development' ? 'ws://' : 'wss://';

export const httpUrl = `${protocol}${backendUrl}`;
export const wsUrl = `${wsProtocol}${backendUrl}`;
