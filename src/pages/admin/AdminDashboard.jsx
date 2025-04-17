import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    topPlants: [],
    salesByCategory: [],
  });

  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [ordersRes, revenueRes, topPlantsRes, salesCatRes] = await Promise.all([
        axios.get("http://localhost:8000/api/admin/statistics/total-orders", { headers }),
        axios.get("http://localhost:8000/api/admin/statistics/total-revenue", { headers }),
        axios.get("http://localhost:8000/api/admin/statistics/top-plants", { headers }),
        axios.get("http://localhost:8000/api/admin/statistics/sales-by-category", { headers }),
      ]);

      setStats({
        totalOrders: ordersRes.data.total_orders,
        totalRevenue: revenueRes.data.total_revenue,
        topPlants: topPlantsRes.data.top_plants,
        salesByCategory: salesCatRes.data.sales_by_category,
      });
    } catch (error) {
      console.error("Erreur chargement statistiques :", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-green-800 mb-8">📊 Tableau de bord</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Total des commandes</h3>
          <p className="text-2xl font-bold text-green-800">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Chiffre d'affaires</h3>
          <p className="text-2xl font-bold text-green-800">{stats.totalRevenue} DH</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">🌿 Plantes les plus populaires</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            {stats.topPlants.map((plant, index) => (
              <li key={index}>{plant.name} – {plant.total_quantity} commandes</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">📈 Ventes par catégorie</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            {stats.salesByCategory.map((cat, index) => (
              <li key={index}>{cat.category} – {cat.total_sales} DH</li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
