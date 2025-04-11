import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
    // Tu pourras ici faire un appel axios.post('/api/register', formData)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-4">
        Bienvenue sur <span className="text-green-600">PéAPInière</span> 🌱
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Créez votre compte pour commencer votre aventure verte !
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="ex: Fatima Ezzahra"
              className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-2 px-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ex: fatima@example.com"
              className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-2 px-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-2 px-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Rôle</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-2 px-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="client">Client</option>
              <option value="employee">Employé</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full shadow-lg transform transition hover:scale-105"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-green-600 font-bold hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}