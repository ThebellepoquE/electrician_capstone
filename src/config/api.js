// API Configuration
const API_BASE_URL = import.meta.env.MODE === 'production'
    ? 'https://electrician-capstone.onrender.com'
    : 'http://localhost:3001';

export default API_BASE_URL;
