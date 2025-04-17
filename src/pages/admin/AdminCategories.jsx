import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories:", err);
    }
  };

  const createCategory = async () => {
    try {
      await axios.post("http://localhost:8000/api/categories", { name: newName }, { headers });
      setNewName("");
      fetchCategories();
    } catch (err) {
      alert("Erreur ajout catégorie");
    }
  };

  const updateCategory = async (slug) => {
    try {
      await axios.put(`http://localhost:8000/api/categories/${slug}`, { name: editName }, { headers });
      setEditing(null);
      fetchCategories();
    } catch (err) {
      alert("Erreur mise à jour catégorie");
    }
  };

  const deleteCategory = async (slug) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/categories/${slug}`, { headers });
      fetchCategories();
    } catch (err) {
      alert("Erreur suppression catégorie");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-green-800 mb-6">🗂️ Gestion des Catégories</h2>

      {/* Formulaire ajout */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">➕ Nouvelle catégorie</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nom de la catégorie"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded px-4 py-2 flex-1"
          />
          <button
            onClick={createCategory}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-4">📋 Liste des catégories</h3>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center justify-between">
              {editing === cat.slug ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => updateCategory(cat.slug)}
                    className="bg-green-600 text-white px-2 py-1 rounded ml-2 hover:bg-green-700"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="ml-2 text-sm text-gray-600 hover:underline"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <span>{cat.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(cat.slug);
                        setEditName(cat.name);
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.slug)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
