const backendUrl = process.env.VITE_BACKEND_URL || 'localhost:5000';

const protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
const wsProtocol = process.env.NODE_ENV === 'development' ? 'ws://' : 'wss://';

export const httpUrl = `${protocol}${backendUrl}`;
export const wsUrl = `${wsProtocol}${backendUrl}`;
