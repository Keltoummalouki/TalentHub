import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;

export const GET_PORTFOLIO = gql`
  query GetPortfolio {
    getPortfolio {
      profil {
        id
        nom
        prenom
        titre
        biographie
        email
        telephone
        adresse
        photo
        reseauxSociaux { 
          linkedin 
          github 
          twitter 
          website 
        }
      }
      projets {
        id
        titre
        description
        technologies
        lienDemo
        lienGithub
        images
        dateDebut
        dateFin
        statut
        tags
      }
      competences {
        id
        nom
        niveau
        categorie
        icone
      }
      experiences {
        id
        poste
        entreprise
        description
        dateDebut
        dateFin
        enCours
        competences
        lieu
      }
    }
  }
`;

export const GET_PROJETS_PAGINATED = gql`
  query GetProjets($first: Int = 20) {
    getProjets(first: $first) {
      edges {
        node {
          id
          titre
          description
          technologies
          lienDemo
          lienGithub
          images
          tags
          statut
        }
      }
    }
  }
`;

export const GET_PROFIL = gql`
  query GetProfil {
    getProfil {
      id
      nom
      prenom
      titre
      biographie
      email
      reseauxSociaux {
        linkedin
        github
        twitter
      }
      photo
    }
  }
`;

export const GET_PROJETS = gql`
  query GetProjets {
    getProjets {
      id
      titre
      description
      technologies
      lienDemo
      lienGithub
      images
      tags
      statut
    }
  }
`;

export const GET_COMPETENCES = gql`
  query GetCompetences {
    getCompetences {
      id
      nom
      niveau
      categorie
      icone
    }
  }
`;

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      poste
      entreprise
      description
      dateDebut
      dateFin
      enCours
      competences
      lieu
    }
  }
`;
