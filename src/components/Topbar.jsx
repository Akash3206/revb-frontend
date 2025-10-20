import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("revb_token");
        navigate("/login");
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/dashboard" className="font-bold text-xl text-green-600">
                    revB
                </Link>
                <button
                    onClick={logout}
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
