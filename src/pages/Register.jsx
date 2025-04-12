import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Importation de jQuery
import $ from "jquery";
import "parsleyjs";

// Attribuer jQuery à window.$ et window.jQuery pour Parsley
window.$ = window.jQuery = $;

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "client",
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        general: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        
        // Réinitialiser l'erreur pour ce champ quand l'utilisateur commence à taper
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser les erreurs
        setErrors({name: "", email: "", password: "", general: ""});
        
        // Vérification de Parsley
        const parsleyForm = $(formRef.current).parsley();
        const isValid = parsleyForm.isValid();
        
        if (!isValid) return; // Arrête si le formulaire n'est pas valide

        try {
            const response = await axios.post(
                "http://localhost:8000/api/register",
                formData
            );

            setMessage("Inscription réussie 🎉 Redirection vers la page de connexion...");

            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
            
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const data = error.response.data;
                
                if (data.errors) {
                    const newErrors = { name: "", email: "", password: "", general: "" };
                    
                    Object.entries(data.errors).forEach(([field, messages]) => {
                        const errorMessages = Array.isArray(messages) ? messages : [messages];
                        const errorMessage = errorMessages[0];
                        
                        // Traduire les messages d'erreur anglais en français
                        let translatedMessage = errorMessage;
                        if (errorMessage === "The email has already been taken.") {
                            translatedMessage = "Cette adresse email est déjà utilisée.";
                        }
                        
                        if (field in newErrors) {
                            newErrors[field] = translatedMessage;
                        } else {
                            newErrors.general += translatedMessage + " ";
                        }
                    });
                    
                    setErrors(newErrors);
                } else if (data.message) {
                    if (data.message === "The email has already been taken.") {
                        setErrors({...errors, email: "Cette adresse email est déjà utilisée."});
                    } else {
                        setErrors({...errors, general: data.message});
                    }
                } else {
                    setErrors({...errors, general: "Erreur de validation."});
                }
            } else {
                setErrors({
                    ...errors, 
                    general: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
                });
            }
        }
    };

    const formRef = useRef(null);

    useEffect(() => {
        // Initialiser Parsley
        if (formRef.current) {
            $(formRef.current).parsley();
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center text-green-700 mb-4">
                    Bienvenue sur <span className="text-green-600">PéAPInière</span> 🌱
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Créez votre compte pour commencer votre aventure verte !
                </p>

                {message && (
                    <div className="bg-green-100 text-green-700 text-sm px-4 py-2 rounded-md mb-4">
                        {message}
                    </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" data-parsley-validate>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Nom</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            data-parsley-pattern="^[A-Za-zÀ-ÿ\s]+$"
                            data-parsley-pattern-message="Le nom ne doit contenir que des lettres"
                            data-parsley-required-message="Le nom est requis"
                            placeholder="ex: Fatima-Ezzahra"
                            className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-2 px-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            data-parsley-type="email"
                            data-parsley-required-message="L'email est requis"
                            data-parsley-type-message="Veuillez entrer un email valide"
                            placeholder="ex: fatima@example.com"
                            className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-2 px-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            data-parsley-minlength="6"
                            data-parsley-pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$"
                            data-parsley-required-message="Le mot de passe est requis"
                            data-parsley-minlength-message="Le mot de passe doit contenir au moins 6 caractères"
                            data-parsley-pattern-message="Le mot de passe doit contenir lettres, chiffres et symboles"
                            placeholder="********"
                            className="shadow-md appearance-none border border-gray-300 rounded-full w-full py-2 px-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                        {errors.password && (
                            <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                        )}
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
                    
                    {errors.general && (
                        <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded-md mt-2">
                            {errors.general}
                        </div>
                    )}
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