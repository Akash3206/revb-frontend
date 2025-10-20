import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SubtopicPage from "./pages/SubtopicPage.jsx";
import Topbar from "./components/Topbar.jsx";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Topbar />
            <main className="max-w-6xl mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/subtopics/:subjectId" element={<PrivateRoute><SubtopicPage /></PrivateRoute>} />
                </Routes>
            </main>
        </div>
    );
}

function PrivateRoute({ children }) {
    const token = localStorage.getItem("revb_token");
    if (!token) return <Navigate to="/login" replace />;
    return children;
}
