import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Panier() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(saved);
    }, []);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const increaseQty = (id) => {
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updated);
    };

    const decreaseQty = (id) => {
        const updated = cart.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        updateCart(updated);
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        updateCart(updated);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    const handleOrder = async () => {
        try {
            const token = localStorage.getItem("token");

            const orderData = {
                plants: cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                }))
            };

            await axios.post("http://localhost:8000/api/orders", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Commande passée avec succès !");
            setCart([]);
            localStorage.removeItem("cart");
            navigate("/client/accueil");
        } catch (error) {
            console.error("Erreur détaillée :", error.response?.data || error.message);
            alert("Erreur lors de l'envoi de la commande.");
          }          
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-green-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/client/accueil" className="text-2xl font-bold">PéAPInière 🌱</Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/client/plants" className="hover:text-green-200">Nos Plantes</Link>
                        <Link to="/client/panier" className="hover:text-green-200">🛒 Panier</Link>
                        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm">Déconnexion</button>
                    </div>
                </div>
            </nav>

            {/* Contenu */}
            <main className="flex-grow container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">🛒 Mon Panier</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-600">Votre panier est vide.</p>
                ) : (
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                                <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-green-700">{item.price} DH</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline ml-4">
                                    Supprimer
                                </button>
                            </div>
                        ))}
                        <div className="text-right text-lg font-bold text-green-700">Total : {total} DH</div>

                        <div className="text-right mt-4">
                            <button
                                onClick={handleOrder}
                                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700"
                            >
                                ✅ Commander
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-green-800 text-white mt-12">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">PéAPInière 🌱</h3>
                            <p className="text-green-100 mb-4">
                                Votre pépinière en ligne depuis 2020. Nous proposons des plantes de qualité pour tous les espaces.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                            <ul className="space-y-2">
                                <li><Link to="/client/accueil" className="text-green-100 hover:text-white">Accueil</Link></li>
                                <li><Link to="/client/plants" className="text-green-100 hover:text-white">Nos plantes</Link></li>
                                <li><Link to="/client/panier" className="text-green-100 hover:text-white">Panier</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Service client</h3>
                            <ul className="space-y-2">
                                <li><Link to="/contact" className="text-green-100 hover:text-white">Contact</Link></li>
                                <li><Link to="/faq" className="text-green-100 hover:text-white">FAQ</Link></li>
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
