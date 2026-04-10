// Central API URL config.
// In production, set REACT_APP_API_URL to your Railway backend URL.
// Example: https://jeevan-raksha-backend.up.railway.app/api
// Locally it falls back to localhost.
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

export default API_URL;
