# 🌿 PéAPInière - Gestion de Plantes en Ligne

Bienvenue sur le projet **PéAPInière**, une plateforme complète de gestion de plantes, conçue pour les clients, employés et administrateurs. Ce projet inclut une API Laravel (backend) et une interface utilisateur en React.js (frontend).

---

## 🚀 Fonctionnalités

### Côté Client
- 🔐 Authentification JWT (register/login)
- 🪴 Consultation de toutes les plantes (avec filtres par catégorie)
- 🛒 Panier avec ajout, suppression, modification de quantité
- ✅ Passage de commande
- 📦 Historique des commandes (avec annulation possible)

### Côté Employé
- 👀 Visualisation de toutes les commandes
- 🔄 Modification du statut d'une commande (en attente / en préparation / livrée)

### Côté Admin
- 📊 Tableau de bord
- 🗂️ Gestion des catégories (CRUD)
- 🌱 Gestion des plantes (CRUD + images (max 4))
- 📈 Statistiques dynamiques (requêtes SQL optimisées)

---

## 🧰 Technologies Utilisées

### Backend (Laravel 10)
- Sanctum pour auth API
- Repositories + Form Request
- PostgreSQL comme base de données
- Sluggable (Spatie)
- OpenAPI (Swagger)

### Frontend (React + Tailwind CSS)
- React Router DOM pour navigation
- Axios pour les requêtes HTTP
- Gestion des routes privées (PrivateRoute)
- AdminLayout pour une UI cohérente

---

## 🔐 Authentification
- Chaque utilisateur reçoit un token JWT à la connexion
- Ce token est stocké dans `localStorage` et envoyé dans les headers pour toutes les routes protégées

---

## 🛣️ Routes principales

### API Laravel
- `POST /api/login`, `POST /api/register`
- `GET /api/plants` (filtrage possible par catégorie)
- `POST /api/orders` (client)
- `GET /api/orders` (client)
- `DELETE /api/orders/{id}` (client)
- `GET /api/admin/orders` (employé)
- `PUT /api/admin/orders/{id}/status` (employé)
- `POST/PUT/DELETE /api/categories` (admin)
- `POST/PUT/DELETE /api/plants` (admin)
- `GET /api/admin/statistics/*` (admin)

### Frontend React
- `/login`, `/register`, `/client/accueil`, `/client/plants`, `/client/panier`, `/client/mes-commandes`
- `/employee/commandes`
- `/admin/dashboard`, `/admin/categories`, `/admin/plantes`

---

## 💚 Merci & Crédit

Projet réalisé dans le cadre d'une formation full-stack.
Développeuse : **Fatima-Ezzahra ALOUANE**

---

❤️ PéAPinière - Votre jardin, notre code !

---

