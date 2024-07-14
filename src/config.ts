const backendUrl = process.env.REACT_APP_BACKEND_URL || 'localhost:5000/api';

const protocol =
  process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
const wsProtocol = process.env.NODE_ENV === 'development' ? 'ws://' : 'wss://';

export const httpUrl = `${protocol}${backendUrl}`;
export const wsUrl = `${wsProtocol}${backendUrl}`;
