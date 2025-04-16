import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Plantes() {
    const [plants, setPlants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        fetchCategories();
        fetchPlants();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:8000/api/categories");
        setCategories(response.data);
    };

    const fetchPlants = async (categorySlug = "", page = 1) => {
        let url = `http://localhost:8000/api/plants?page=${page}`;
        if (categorySlug) {
            url += `&category=${categorySlug}`;
        }

        const response = await axios.get(url);
        setPlants(response.data.data);
        setLastPage(response.data.last_page);
        setCurrentPage(response.data.current_page);
    };

    const handleCategoryClick = (slug) => {
        setSelectedCategory(slug);
        fetchPlants(slug, 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) fetchPlants(selectedCategory, currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < lastPage) fetchPlants(selectedCategory, currentPage + 1);
    };

    return (
        <div className="min-h-screen bg-green-50 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
                    🌿 Nos Plantes
                </h1>

                {/* Boutons catégories */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
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

                {/* Cartes plantes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {plants.map((plant) => (
                        <div key={plant.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img
                                src={`http://localhost:8000/storage/${plant.image}`}
                                alt={plant.name}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-green-700 mb-2">{plant.name}</h2>
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
                                        🛒 Ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10 space-x-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                    >
                        ← Précédent
                    </button>

                    <span className="text-green-800 font-semibold px-4 py-2">
                        Page {currentPage} / {lastPage}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === lastPage}
                        className={`px-4 py-2 rounded ${currentPage === lastPage
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                    >
                        Suivant →
                    </button>
                </div>
            </div>
        </div>
    );
}
