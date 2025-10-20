import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/api/users/login', { username, password });
            localStorage.setItem('revb_token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || 'Invalid credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700"
                />
                <button
                    type="submit"
                    className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                    Login
                </button>
            </form>

            <p className="mt-4 text-center text-sm">
                Don’t have an account?{' '}
                <Link to="/register" className="text-green-500 hover:underline">
                    Register
                </Link>
            </p>
        </div>
    );
}
