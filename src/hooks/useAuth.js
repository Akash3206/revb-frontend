import { useState } from 'react';

export default function useAuth() {
    const [token, setToken] = useState(() => localStorage.getItem('revb_token'));
    const login = (t) => { localStorage.setItem('revb_token', t); setToken(t); };
    const logout = () => { localStorage.removeItem('revb_token'); setToken(null); };
    return { token, login, logout };
}
