import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function PlantDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/plants/${slug}`)
            .then(res => setPlant(res.data))
            .catch(() => navigate("/client/plants")); // redirection si erreur
    }, [slug]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!plant) return <div className="text-center mt-20 text-green-600 font-semibold">Chargement...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
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
            <main className="container mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:flex gap-10">
                    <div className="md:w-1/2">
                        {plant.images.length > 0 ? (
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={20}
                                slidesPerView={1}
                                className="rounded-lg"
                            >
                                {plant.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img.url}
                                            alt={`Image ${index + 1} de ${plant.name}`}
                                            className="w-full h-80 object-cover rounded-xl"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <img
                                src="https://via.placeholder.com/500x400?text=Pas+de+photo"
                                alt="Pas d'image"
                                className="rounded-lg w-full object-cover"
                            />
                        )}
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <h2 className="text-3xl font-bold text-green-800 mb-4">{plant.name}</h2>
                        <p className="text-green-700 text-xl font-semibold mb-2">{plant.price} DH</p>
                        <p className="text-gray-700 leading-relaxed mb-6">{plant.description}</p>
                        <p className="text-sm text-gray-500 mb-4">Catégorie : <span className="font-medium text-green-600">{plant.category.name}</span></p>
                        <button className="bg-green-600 text-white py-2 px-5 rounded-full hover:bg-green-700 text-sm">Ajouter au panier</button>
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
