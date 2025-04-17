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

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">📦 Mes Commandes</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Aucune commande pour le moment.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="bg-white rounded-xl shadow p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">Commande #{order.id}</span>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                order.status === "en_attente" ? "bg-yellow-100 text-yellow-700"
                : order.status === "en_preparation" ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
              }`}>
                {order.status}
              </span>
            </div>

            <ul className="text-sm text-gray-700 mb-4">
              {order.plants.map(plant => (
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
    </div>
  );
}
