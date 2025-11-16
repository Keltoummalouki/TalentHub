# TalentHub - Portfolio Backend API

API GraphQL moderne pour gérer un portfolio professionnel avec authentification JWT et RBAC.

## 🚀 Stack Technique

- **Backend**: Node.js + Express + TypeScript
- **API**: GraphQL (Apollo Server)
- **Base de données**: MongoDB (Mongoose)
- **Authentification**: JWT
- **Validation**: Zod
- **Logging**: Winston + Morgan

## 📋 Fonctionnalités

### Queries Publiques
- `getProfil`: Récupère le profil
- `getProjets`: Liste des projets avec pagination et filtres
- `getProjet(id)`: Détail d'un projet
- `getCompetences`: Liste des compétences
- `getExperiences`: Liste des expériences
- `getPortfolio`: Toutes les données en un appel

### Mutations Protégées (Admin)
- `login`: Authentification
- `updateProfil`: Mise à jour du profil
- CRUD complet pour: Projets, Compétences, Expériences

## 🔧 Installation

```bash
# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.exemple .env

# Générer les types TypeScript
npm run codegen

# Démarrer en développement
npm run dev

# Build pour production
npm run build
npm start
```

## 🔐 Configuration

Créer un fichier `.env` avec:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/talenthub
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## 👤 Utilisateur Admin par Défaut

Au premier démarrage, un admin est créé automatiquement:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ Changez ce mot de passe en production!

## 📝 Exemples de Requêtes

### Login
```graphql
mutation {
  login(username: "admin", password: "admin123") {
    token
    user {
      id
      username
      role
    }
  }
}
```

### Créer un Projet (avec token)
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

### Récupérer le Portfolio
```graphql
query {
  getPortfolio {
    profil {
      nom
      prenom
      titre
    }
    projets {
      titre
      technologies
    }
    competences {
      nom
      niveau
    }
    experiences {
      poste
      entreprise
    }
  }
}
```

## 🔒 Sécurité

- JWT avec expiration configurable
- RBAC (Role-Based Access Control)
- Validation Zod sur toutes les mutations
- Helmet pour les headers HTTP
- CORS configuré
- Rate limiting recommandé en production

## 📁 Structure

```
src/
├── config/          # Configuration DB
├── graphql/
│   ├── resolvers/   # Resolvers GraphQL
│   └── typeDefs/    # Schéma GraphQL
├── middleware/      # Auth middleware
├── models/          # Modèles Mongoose
├── utils/           # Utilitaires (JWT, seed)
├── validation/      # Schémas Zod
└── logger/          # Winston logger
```

## 🧪 Tests

```bash
npm test
```

## 📦 Scripts

- `npm run dev`: Développement avec hot-reload
- `npm run build`: Compilation TypeScript
- `npm start`: Démarrage production
- `npm run codegen`: Génération des types GraphQL

## 🌐 Endpoints

- **API GraphQL**: `http://localhost:4000/graphql`
- **Health Check**: `http://localhost:4000/`

## 📊 Logs

Les logs sont stockés dans `/logs`:
- `access.log`: Logs HTTP
- `error.log`: Erreurs uniquement
- `combined.log`: Tous les logs

## 🚀 Déploiement

1. Configurer les variables d'environnement
2. Build: `npm run build`
3. Démarrer: `npm start`
4. Configurer MongoDB Atlas pour la production
5. Utiliser un reverse proxy (Nginx) recommandé

## 📄 Licence

ISC
