import React from "react";
import AdminLayout from "../../components/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-green-800 mb-4">📊 Tableau de bord</h2>
      <p>Bienvenue dans l’espace administrateur.</p>
    </AdminLayout>
  );
}
