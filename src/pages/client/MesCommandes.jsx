// src/pages/client/MesCommandes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function MesCommandes() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/api/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Erreur récupération commandes :", error);
        }
    };

    const cancelOrder = async (id) => {
        const confirm = window.confirm("Confirmer l’annulation de cette commande ?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8000/api/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchOrders();
            alert("Commande annulée !");
        } catch (error) {
            alert("Erreur lors de l’annulation.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-green-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/client/accueil" className="text-2xl font-bold">
                        PéAPInière 🌱
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/client/plants" className="hover:text-green-200">
                            Nos Plantes
                        </Link>
                        <Link to="/client/panier" className="hover:text-green-200">
                            Panier
                        </Link>
                        <Link to="/client/mes-commandes" className="hover:text-green-200">
                            Mes Commandes
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </nav>

            {/* Contenu principal */}
            <main className="flex-grow container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                    📦 Mes Commandes
                </h1>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-600">
                        Aucune commande pour le moment.
                    </p>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-xl shadow p-4 mb-6"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-600">
                                    Commande #{order.id}
                                </span>
                                <span
                                    className={`text-sm font-semibold px-3 py-1 rounded-full ${order.status === "en_attente"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : order.status === "en_preparation"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <ul className="text-sm text-gray-700 mb-4">
                                {order.plants.map((plant) => (
                                    <li key={plant.id}>
                                        {plant.name} × {plant.pivot.quantity}
                                    </li>
                                ))}
                            </ul>

                            {order.status === "en_attente" && (
                                <button
                                    onClick={() => cancelOrder(order.id)}
                                    className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700"
                                >
                                    ❌ Annuler la commande
                                </button>
                            )}
                        </div>
                    ))
                )}
            </main>

            {/* Footer */}
            <footer className="bg-green-800 text-white mt-12">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">PéAPInière 🌱</h3>
                            <p className="text-green-100 mb-4">
                                Votre pépinière en ligne depuis 2020. Nous proposons des
                                plantes de qualité pour tous les espaces.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/client/accueil"
                                        className="text-green-100 hover:text-white"
                                    >
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/client/plants"
                                        className="text-green-100 hover:text-white"
                                    >
                                        Nos plantes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/client/panier"
                                        className="text-green-100 hover:text-white"
                                    >
                                        Panier
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Service client</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/contact"
                                        className="text-green-100 hover:text-white"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="text-green-100 hover:text-white">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-white"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition"
                                >
                                    →
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200 text-sm">
                        <p>© 2025 PéAPInière - Tous droits réservés</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
