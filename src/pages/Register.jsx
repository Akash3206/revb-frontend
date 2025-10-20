import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/api/users/register', { username, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Register
                </button>
            </form>

            <p className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-green-500 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
