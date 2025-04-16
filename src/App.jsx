// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Accueil from "./pages/client/Accueil";
import Plantes from "./pages/client/Plantes";

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
      </Routes>
    </Router>
  );
}
