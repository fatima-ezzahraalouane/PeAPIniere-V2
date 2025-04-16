import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Plantes() {
    const navigate = useNavigate();

    const [plants, setPlants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchCategories();
        fetchPlants();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:8000/api/categories");
        setCategories(response.data);
    };

    const fetchPlants = async (categorySlug = "") => {
        const url = categorySlug
            ? `http://localhost:8000/api/plants?category=${categorySlug}`
            : "http://localhost:8000/api/plants";
        const response = await axios.get(url);
        setPlants(response.data);
    };

    const handleCategoryClick = (slug) => {
        setSelectedCategory(slug);
        fetchPlants(slug);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-green-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link to="/client/accueil" className="text-2xl font-bold">
                            PéAPInière 🌱
                        </Link>
                        <div className="hidden md:flex space-x-6">
                            <Link to="/client/plants" className="hover:text-green-200 transition">
                                Nos Plantes
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/client/panier" className="hover:text-green-200 transition">
                            🛒 Panier
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm transition"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </nav>

            {/* Contenu */}
            <main className="flex-grow bg-green-50 py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
                        🌿 Nos Plantes
                    </h1>

                    {/* Boutons de filtre par catégorie */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        <button
                            onClick={() => handleCategoryClick("")}
                            className={`px-4 py-2 rounded-full border ${selectedCategory === ""
                                    ? "bg-green-600 text-white"
                                    : "border-green-600 text-green-700 hover:bg-green-100"
                                }`}
                        >
                            Toutes
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.slug)}
                                className={`px-4 py-2 rounded-full border ${selectedCategory === cat.slug
                                        ? "bg-green-600 text-white"
                                        : "border-green-600 text-green-700 hover:bg-green-100"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Grille de plantes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {plants.map((plant) => (
                            <div
                                key={plant.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <img
                                    src={plant.images.length > 0 ? plant.images[0].url : "https://via.placeholder.com/400x300?text=Pas+de+photo"}
                                    alt={plant.name}
                                    className="h-58 w-full object-cover"
                                />
                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-green-700 mb-1">
                                        {plant.name}
                                    </h2>
                                    <p className="text-green-800 font-semibold mb-2">
                                        {plant.price} DH
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {plant.description.slice(0, 90)}...
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/plants/${plant.slug}`}
                                            className="text-sm text-green-600 hover:underline font-semibold"
                                        >
                                            Voir plus →
                                        </Link>
                                        <button className="bg-green-600 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700">
                                            Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
