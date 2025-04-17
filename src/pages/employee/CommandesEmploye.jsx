import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function CommandesEmploye() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Erreur chargement commandes :", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // Refresh list
      alert("Statut mis à jour !");
    } catch (error) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/employee/dashboard" className="text-2xl font-bold">
            📋 Espace Employé
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Contenu */}
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          📦 Toutes les Commandes
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">Aucune commande.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-4 mb-6"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">
                  Commande #{order.id} - {order.user.name}
                </span>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="en_attente">En attente</option>
                  <option value="en_preparation">En préparation</option>
                  <option value="livrée">Livrée</option>
                </select>
              </div>

              <ul className="text-sm text-gray-700">
                {order.plants.map((plant) => (
                  <li key={plant.id}>
                    {plant.name} × {plant.pivot.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
