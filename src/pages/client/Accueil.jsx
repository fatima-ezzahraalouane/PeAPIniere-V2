import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Accueil() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur chargement catégories:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold">
              PéAPInière 🌱
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/plants" className="hover:text-green-200 transition">
                Nos Plantes
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/panier" className="hover:text-green-200 transition">
              🛒 Panier
            </Link>
            {/* <Link to="/profil" className="hover:text-green-200 transition">
              👤 Mon compte
            </Link> */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="flex-grow">
        {/* Section Hero */}
        <section className="bg-gradient-to-br from-green-50 to-green-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6">
                Bienvenue sur <span className="text-green-600">PéAPInière</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Découvrez notre sélection de plantes d'exception et transformez votre espace en un véritable havre de verdure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/plants"
                  className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 shadow-md transition"
                >
                  🌿 Explorer les plantes
                </Link>
                <Link
                  to="/orders"
                  className="bg-white text-green-700 border-2 border-green-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-50 shadow-md transition"
                >
                  🛒 Voir mes commandes
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section Catégories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
              Nos Catégories de Plantes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center">
                  <div className="text-4xl mb-4">🌿</div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{cat.name}</h3>
                  <p className="text-gray-600 mb-4">{cat.description || "Découvrez nos magnifiques plantes."}</p>
                  <Link to={`/categories/${cat.slug}`} className="text-green-600 hover:text-green-800 font-medium">
                    Découvrir →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Promotions */}
        <section className="bg-green-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold text-green-800 mb-4">
                  Offres exclusives
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Profitez de nos promotions et offres spéciales pour embellir votre espace vert à petit prix.
                </p>
                <Link
                  to="/promos"
                  className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Voir toutes les offres
                </Link>
              </div>
              <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center border-b border-gray-100 pb-4">
                    <div className="text-2xl mr-4">🌺</div>
                    <div>
                      <h3 className="font-semibold text-green-700">Pack de 3 plantes fleuries</h3>
                      <p className="text-gray-600">-15% avec le code FLEURS15</p>
                    </div>
                  </div>
                  <div className="flex items-center border-b border-gray-100 pb-4">
                    <div className="text-2xl mr-4">🌱</div>
                    <div>
                      <h3 className="font-semibold text-green-700">Livraison gratuite</h3>
                      <p className="text-gray-600">Pour toute commande supérieure à 50€</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">🪴</div>
                    <div>
                      <h3 className="font-semibold text-green-700">Pack débutant</h3>
                      <p className="text-gray-600">Plantes + pots + terreau à 39,90€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                      <li><Link to="/" className="text-green-100 hover:text-white">Accueil</Link></li>
                      <li><Link to="/plants" className="text-green-100 hover:text-white">Nos plantes</Link></li>
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
                        className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-800"
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