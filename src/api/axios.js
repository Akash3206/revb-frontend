import axios from 'axios';

// Change this to match your backend port
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

const api = axios.create({
    baseURL,
    timeout: 12000,
});

// Automatically attach JWT token if logged in
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('revb_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});

export default api;
