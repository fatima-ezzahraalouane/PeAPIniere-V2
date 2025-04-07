# 🌿 PéAPInière API - Connecter la nature au digital

Bienvenue dans **PéAPInière** 🌱, l'API officielle d'une pépinière en pleine croissance qui vise à révolutionner la gestion des plantes, des commandes et des rôles utilisateurs à travers une plateforme robuste, sécurisée et moderne.

---

## 🔍 Contexte du projet

Notre pépinière connaît une belle croissance et nous souhaitons **améliorer notre efficacité, automatiser nos processus** et **offrir une meilleure expérience client**.  
Ce projet a pour but de centraliser la **gestion des stocks, des ventes** et de proposer une interface fluide pour nos clients, nos employés et notre équipe administrative.

---

## 🎯 Objectifs

- 🚀 Développer une API RESTful performante et sécurisée
- 🪴 Gérer les plantes (CRUD + images)
- 🧾 Suivre les commandes des clients
- 👥 Gérer les utilisateurs avec différents rôles (`Client`, `Employé`, `Admin`)
- 📊 Offrir des statistiques avancées pour l’administrateur
- 🧪 Intégrer des tests unitaires & une documentation complète

---

## 🧑‍💻 Technologies utilisées

- ⚙️ **Laravel** 10+ (architecture MVC + Repository Pattern)
- 🐘 **PostgreSQL**
- 🔐 **JWT Authentication** pour une sécurité optimale
- 📂 **Spatie/Sluggable** pour des slugs SEO-friendly
- 🧪 **PHPUnit** pour les tests unitaires
- 📮 **Postman** pour tester l’API
- 🧾 **Swagger** pour documenter chaque endpoint
- 🛠️ **DTO (Data Transfer Objects)** pour structurer les données

---

## 📚 User Stories

### 👤 Clients
- 🔐 S’inscrire / se connecter via JWT
- 🪴 Voir toutes les plantes disponibles (nom, description, prix, images, catégorie)
- 🔎 Voir les détails d’une plante via son **slug**  
  `GET /api/plants/basilic-aromatique`
- 🧺 Passer une commande en choisissant les slugs + quantités
- 🆗 Suivre l’état de la commande : `en attente`, `en préparation`, `livrée`
- ❌ Annuler une commande si elle n’a pas encore été préparée

### 🧑‍🏭 Employés
- 🔐 Se connecter avec des permissions adaptées
- ⌛ Marquer une commande comme **en préparation** ou **livrée**

### 👑 Administrateurs
- 🎍 Gérer les plantes & catégories (CRUD complet)
- 📊 Accéder à des statistiques :
  - Total des commandes
  - Revenu total
  - Plantes les plus commandées
  - Ventes par catégorie

### 💻 Développeurs
- ✅ Écrire des **tests unitaires** 
  <!-- - Authentification
  - Slugs
  - CRUD catégories -->
- 📮 Documenter chaque endpoint avec **Swagger**
- 🚧 Gérer les exceptions avec messages & codes HTTP adaptés
- 📦 Implémenter un **DAO (Data Access Object)** pour une couche data propre
- 🧠 Documenter chaque requête **Query Builder** pour faciliter la compréhension
- 🛡️ Utiliser des **DTO** pour valider les données échangées
- 🖼️ Limiter chaque plante à **4 images maximum**, avec message d’erreur clair :  
  `"Limite de 4 images par plante dépassée."`

---

## 🧪 Tests et documentation

- 🧾 Swagger UI disponible à `/api/documentation`
- ✔️ Tests unitaires via `PHPUnit`
- 🔬 Tester l’API avec Postman grâce à une collection exportable

---

## 📫 Contact

Développé avec ❤️ par **Fatima-Ezzahra Alouane**  

📧 falouane38@gmail.com

🔗 https://www.linkedin.com/in/fatima-ezzahra-alouane/

---

> "L'innovation, c’est rendre les choses complexes accessibles à tous – même la nature 🌱."  
> — *PéAPInière, la tech au service du vivant.*






////////////////////////
# README.md - Application Frontend PéAPinière

## 🌱 Présentation du projet

Suite à la réussite de l'API RESTful **PéAPinière**, cette application frontend permet aux utilisateurs de gérer leurs plantes de manière conviviale. Elle est construite avec **React.js** et consomme l'API PéAPinière V2 (Laravel).

---

## 🚀 Objectif principal

Développer une application frontend intuitive qui permet aux utilisateurs de :
- Suivre et visualiser les plantes disponibles
- Passer des commandes
- Suivre l’état des commandes
- Accéder à leurs informations personnelles

---

## 👤 Utilisateurs & Rôles

| Rôle        | Permissions principales |
|--------------|--------------------------|
| Client       | Consulter, commander, annuler, voir l'état |
| Employé     | Gérer les commandes       |
| Administrateur | CRUD sur plantes et catégories, voir les statistiques |

---

## 📊 User Stories principales

### Client
- 🔐 Je peux **m’inscrire** et **me connecter** avec JWT.
- 🌿 Je peux **consulter les plantes** (liste + détails via `/api/plants/:slug`).
- 🛂 Je peux **passer une commande** avec quantités.
- ✅ Je peux **suivre l’état de ma commande**.
- ❌ Je peux **annuler ma commande** si elle est encore en attente.

### Employé
- 🛌 Je peux **me connecter** pour accéder aux commandes.
- ⏳ Je peux **mettre à jour le statut** d’une commande (en préparation, livrée).

### Administrateur
- 📊 Je peux **consulter les statistiques** (ventes, catégories, top plantes).
- 🌾 Je peux **créer, modifier, supprimer** des plantes et catégories.

---

## 📅 Fonctionnalités développeur

- ✅ **Tests unitaires** pour l'authentification, la gestion des catégories et la récupération des plantes par slug (Spatie Sluggable).
- 🎓 **Tests API** via **Postman**.
- 🖋️ **Documentation Swagger** pour l'API.
- ❌ **Gestion des erreurs** avec codes HTTP et messages explicites.
- 💪 **DAO** pour isoler la logique d'accès aux données.

---

## 🔒 Extras & Conventions

- 🔒 Limitation à **4 images maximum** par plante avec message d'erreur personnalisé.
- 🚧 **DTOs** utilisés pour valider et structurer les données.
- 🔧 Architecture claire avec Repository, Services, Controllers.

---

## 🎓 Technologies utilisées

- **React.js** : frontend principal
- **React Router DOM** : gestion de la navigation
- **Axios** : requêtes HTTP vers l'API Laravel
- **JWT Auth** : authentification via token
- **Tailwind CSS** : design moderne et réactif
- **Laravel API** : backend existant pour la logique métier

---

## ⚖️ Installation & Démarrage

```bash
# 1. Cloner le repo
git clone https://github.com/votre-utilisateur/peapinier-frontend.git

# 2. Installer les dépendances
cd peapinier-frontend
npm install

# 3. Lancer le projet
npm run dev
```

---

## 🌐 API PéAPInière (Laravel)
L’API est déployée et documentée via Swagger à l’adresse :

```
http://localhost:8000/api/documentation
```

---

## 🚩 Routes principales

| Route              | Description                        |
|--------------------|------------------------------------|
| `/login`           | Connexion                          |
| `/register`        | Inscription                        |
| `/plants`          | Liste des plantes                  |
| `/plants/:slug`    | Détails d'une plante              |
| `/orders`          | Passer une commande                |
| `/my-orders`       | Voir mes commandes                |
| `/statistics`      | Statistiques admin (protégées)     |

---

## 📒 Structure du projet React (proposée)

```
src/
|-- components/
|-- pages/
|-- services/
|-- dto/
|-- utils/
|-- App.jsx
|-- main.jsx
```

---

## 📈 Contribution

Les contributions sont les bienvenues. Merci de créer une branche claire et de documenter vos PR 😊

---

## 💚 Merci & Crédit

Projet réalisé dans le cadre d'une formation full-stack.
Développeuse : **Fatima-Ezzahra ALOUANE**

---

❤️ PéAPinière - Votre jardin, notre code !

