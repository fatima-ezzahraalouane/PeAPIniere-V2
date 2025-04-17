import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Accueil from "./pages/client/Accueil";
import Plantes from "./pages/client/Plantes";
import PlantDetail from "./pages/client/PlantDetail";
import Panier from "./pages/client/Panier";
import MesCommandes from "./pages/client/MesCommandes";
import CommandesEmploye from "./pages/employee/CommandesEmploye";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminPlantes from "./pages/admin/AdminPlantes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/client/accueil"
          element={
            <PrivateRoute role="client">
              <Accueil />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/plants"
          element={
            <PrivateRoute role="client">
              <Plantes />
            </PrivateRoute>
          }
        />
        <Route
          path="/plants/:slug"
          element={
            <PrivateRoute role="client">
              <PlantDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/panier"
          element={
            <PrivateRoute role="client">
              <Panier />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/mes-commandes"
          element={
            <PrivateRoute role="client">
              <MesCommandes />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/commandes"
          element={
            <PrivateRoute role="employee">
              <CommandesEmploye />
            </PrivateRoute>
          }
        />
        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <PrivateRoute role="admin">
              <AdminCategories />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/plantes"
          element={
            <PrivateRoute role="admin">
              <AdminPlantes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
