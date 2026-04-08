// Central API URL config.
// In production (Vercel), set the env var REACT_APP_API_URL to your Render backend URL.
// Locally it falls back to localhost.
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

export default API_URL;
