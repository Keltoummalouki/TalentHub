# TalentHub - Portfolio Full Stack

Application full stack moderne pour portfolio professionnel avec backend GraphQL et frontend React.

## 🚀 Stack Technique

### Backend
- Node.js + Express + TypeScript
- GraphQL (Apollo Server)
- MongoDB (Mongoose)
- JWT Authentication

### Frontend
- React + TypeScript + Vite
- Apollo Client (GraphQL)
- TailwindCSS + shadcn/ui
- React Router

## 📋 Prérequis

- Node.js >= 18
- MongoDB >= 6.0
- npm ou yarn

## 🔧 Installation

### 1. Cloner et installer les dépendances

```bash
# À la racine du projet
npm install
npm run install:all
```

### 2. Configuration Backend

Créer `backend/.env` :
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/talenthub
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:8080
```

### 3. Configuration Frontend

Créer `frontend/.env` :
```env
VITE_API_URL=http://localhost:4000/graphql
```

### 4. Démarrer MongoDB

```bash
# Ubuntu/Debian
sudo systemctl start mongodb

# macOS (avec Homebrew)
brew services start mongodb-community

# Windows
net start MongoDB
```

## 🎯 Démarrage

### Développement (Backend + Frontend simultanément)

```bash
npm run dev
```

### Ou séparément

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:8080
- **Backend GraphQL**: http://localhost:4000/graphql
- **Admin Dashboard**: http://localhost:8080/admin/login

## 🔐 Credentials Admin

- **Email/Username**: `keltoummalouki@gmail.com` ou `keltoummalouki`
- **Password**: `password1234`

### Créer/Réinitialiser l'admin

```bash
cd backend
npm run create-admin
```

⚠️ **Changez ces identifiants en production !**

## 📝 Exemples de requêtes GraphQL

### Query - Récupérer le portfolio complet

```graphql
query {
  getPortfolio {
    profil {
      nom
      prenom
      titre
      biographie
    }
    projets {
      id
      titre
      description
      technologies
    }
    competences {
      id
      nom
      niveau
      categorie
    }
    experiences {
      id
      poste
      entreprise
      description
    }
  }
}
```

### Mutation - Login

```graphql
mutation {
  login(username: "keltoummalouki@gmail.com", password: "password1234") {
    token
    user {
      id
      username
      role
    }
  }
}
```

### Mutation - Créer un projet (avec token)

```graphql
mutation {
  createProjet(input: {
    titre: "Mon Projet"
    description: "Description du projet"
    technologies: ["React", "Node.js"]
    dateDebut: "2024-01-01"
    statut: en_cours
    tags: ["web", "fullstack"]
  }) {
    id
    titre
  }
}
```

## 📦 Build pour production

```bash
# Build backend + frontend
npm run build

# Démarrer en production
npm start
```

## 📁 Structure du projet

```
TalentHub/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration DB
│   │   ├── graphql/
│   │   │   ├── resolvers/   # Resolvers GraphQL
│   │   │   └── typeDefs/    # Schéma GraphQL
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Modèles Mongoose
│   │   ├── utils/           # Utilitaires (JWT, seed)
│   │   └── validation/      # Schémas Zod
│   ├── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── context/         # Context API (Auth)
│   │   ├── graphql/         # Queries & Mutations
│   │   ├── lib/             # Apollo Client config
│   │   ├── pages/           # Pages de l'app
│   │   └── App.tsx
│   └── package.json
└── package.json             # Scripts racine
```

## 🔒 Sécurité

- JWT avec expiration configurable
- RBAC (Role-Based Access Control)
- Validation Zod sur toutes les mutations
- Helmet pour les headers HTTP
- CORS configuré

## 🐳 Docker

### Démarrage avec Docker

```bash
# Build et démarrer tous les services
npm run docker:up

# Voir les logs
npm run docker:logs

# Arrêter les services
npm run docker:down
```

URLs avec Docker :
- Frontend: http://localhost:8080
- Backend: http://localhost:4000/graphql
- MongoDB: localhost:27017

## 🧪 Tests

### Backend (Jest)
```bash
cd backend
npm test                # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend (Vitest)
```bash
cd frontend
npm test                # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Tous les tests
```bash
npm run test:all
```

## 🚀 CI/CD

Le projet utilise GitHub Actions pour :
- ✅ Tests automatiques (backend + frontend)
- ✅ Lint et audit de sécurité
- ✅ Build Docker images
- ✅ Déploiement automatique (main branch)

### Configuration requise

Ajouter ces secrets dans GitHub :
- `DOCKER_USERNAME`: Votre username Docker Hub
- `DOCKER_PASSWORD`: Votre token Docker Hub

### Workflows

- **CI/CD Pipeline** : Tests + Build + Deploy (push sur main)
- **Tests** : Lint + Security audit (pull requests)

## 📄 Licence

ISC
