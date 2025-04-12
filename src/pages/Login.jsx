import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion...");
    console.log("Souvenir de moi:", rememberMe);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md transform transition hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Bienvenue sur <span className="text-green-600">PéAPInière</span> 🌱
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Connectez-vous pour accéder à votre espace personnel et gérer vos plantes favorites.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              required
              placeholder="ex: fatima@example.com"
              className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
            <input
              type="password"
              required
              placeholder="********"
              className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-3 px-6 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-600 text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              Souvenir de moi
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full w-full shadow-lg transform transition hover:scale-105"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Pas de compte ?{" "}
          <Link to="/register" className="text-green-600 font-bold hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}