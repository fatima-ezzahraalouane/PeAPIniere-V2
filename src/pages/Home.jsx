import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-2xl transform transition hover:scale-105">
        <h1 className="text-5xl font-extrabold text-green-800 mb-6">
          Bienvenue sur <span className="text-green-600">PéAPInière</span> 🌱
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Une plateforme moderne pour découvrir, commander et gérer vos plantes favorites. Connectez-vous ou inscrivez-vous pour commencer !
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition transform hover:scale-105"
          >
            Connexion
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-full shadow-md hover:bg-green-50 transition transform hover:scale-105"
          >
            Inscription
          </button>
        </div>
      </div>
    </div>
  );
}
