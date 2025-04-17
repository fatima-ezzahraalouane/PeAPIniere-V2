import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import axios from "axios";

export default function AdminPlantes() {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    images: [""],
  });
  const [editingSlug, setEditingSlug] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    const plantRes = await axios.get("http://localhost:8000/api/plants");
    const catRes = await axios.get("http://localhost:8000/api/categories");
    setPlants(plantRes.data);
    setCategories(catRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (index, value) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm({ ...form, images: updated });
  };

  const addImageField = () => {
    if (form.images.length < 4) setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index) => {
    const updated = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updated });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category_id: "",
      images: [""],
    });
    setEditingSlug(null);
  };

  const submitForm = async () => {
    try {
      const endpoint = editingSlug
        ? `http://localhost:8000/api/plants/${editingSlug}`
        : "http://localhost:8000/api/plants";
      const method = editingSlug ? "put" : "post";

      await axios[method](endpoint, form, { headers });
      resetForm();
      fetchData();
    } catch (error) {
      alert("Erreur : " + (error.response?.data?.message || "Inconnue"));
    }
  };

  const editPlant = (plant) => {
    setEditingSlug(plant.slug);
    setForm({
      name: plant.name,
      description: plant.description || "",
      price: plant.price,
      category_id: plant.category.id,
      images: [],
    });
  };

  const deletePlant = async (slug) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    await axios.delete(`http://localhost:8000/api/plants/${slug}`, { headers });
    fetchData();
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-green-800 mb-6">🪴 Gestion des Plantes</h2>

      {/* Formulaire plante */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingSlug ? "✏️ Modifier la plante" : "➕ Nouvelle plante"}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="border p-2 rounded" />
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Prix" className="border p-2 rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-2" />
          <select name="category_id" value={form.category_id} onChange={handleChange} className="border p-2 rounded col-span-2">
            <option value="">-- Catégorie --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Images */}
          <div className="col-span-2">
            <label className="block font-medium mb-2">Images (max 4)</label>
            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(i, e.target.value)}
                  placeholder={`Image ${i + 1}`}
                  className="border p-2 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(i)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            ))}
            {form.images.length < 4 && (
              <button
                type="button"
                onClick={addImageField}
                className="text-sm text-green-600 hover:underline"
              >
                ➕ Ajouter une image
              </button>
            )}
          </div>

          <div className="col-span-2 flex gap-4">
            <button
              onClick={submitForm}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingSlug ? "Mettre à jour" : "Créer"}
            </button>
            {editingSlug && (
              <button
                onClick={resetForm}
                className="text-gray-600 underline"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Liste des plantes */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-4">📋 Liste des Plantes</h3>
        <ul className="space-y-6">
          {plants.map(plant => (
            <li key={plant.id} className="flex gap-6 items-start border-b pb-4">
              <img
                src={plant.images[0]?.url || "https://via.placeholder.com/100"}
                alt={plant.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-green-700">{plant.name}</h4>
                <p className="text-sm text-gray-600">{plant.description}</p>
                <p className="text-sm">💰 {plant.price} DH | Catégorie : <strong>{plant.category.name}</strong></p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => editPlant(plant)} className="text-blue-600 hover:underline text-sm">Modifier</button>
                <button onClick={() => deletePlant(plant.slug)} className="text-red-600 hover:underline text-sm">Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
