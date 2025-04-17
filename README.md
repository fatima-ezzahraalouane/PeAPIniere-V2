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

## 💚 Merci & Crédit

Projet réalisé dans le cadre d'une formation full-stack.
Développeuse : **Fatima-Ezzahra ALOUANE**

---

❤️ PéAPinière - Votre jardin, notre code !

