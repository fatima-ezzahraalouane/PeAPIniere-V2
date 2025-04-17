import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-green-800 text-white flex flex-col p-6 space-y-4">
                <h1 className="text-2xl font-bold mb-6">🌿 Admin Panel</h1>
                <nav className="flex flex-col space-y-2 text-sm font-medium">
                    <Link to="/admin/dashboard" className="hover:text-green-200">📊 Dashboard</Link>
                    <Link to="/admin/categories" className="hover:text-green-200">🗂️ Catégories</Link>
                    <Link to="/admin/plantes" className="hover:text-green-200">🪴 Plantes</Link>
                </nav>
                <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm"
                >
                    🔓 Déconnexion
                </button>
            </aside>

            {/* Contenu principal */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
