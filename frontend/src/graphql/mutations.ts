import { gql } from '@apollo/client';

export const UPDATE_PROFIL = gql`
  mutation UpdateProfil($input: ProfilInput!) {
    updateProfil(input: $input) {
      id
      nom
      prenom
      titre
      biographie
      email
    }
  }
`;

export const CREATE_PROJET = gql`
  mutation CreateProjet($input: ProjetInput!) {
    createProjet(input: $input) {
      id
      titre
      description
      technologies
    }
  }
`;

export const UPDATE_PROJET = gql`
  mutation UpdateProjet($id: ID!, $input: ProjetInput!) {
    updateProjet(id: $id, input: $input) {
      id
      titre
      description
      technologies
    }
  }
`;

export const DELETE_PROJET = gql`
  mutation DeleteProjet($id: ID!) {
    deleteProjet(id: $id)
  }
`;

export const CREATE_COMPETENCE = gql`
  mutation CreateCompetence($input: CompetenceInput!) {
    createCompetence(input: $input) {
      id
      nom
      niveau
      categorie
    }
  }
`;

export const UPDATE_COMPETENCE = gql`
  mutation UpdateCompetence($id: ID!, $input: CompetenceInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      nom
      niveau
      categorie
    }
  }
`;

export const DELETE_COMPETENCE = gql`
  mutation DeleteCompetence($id: ID!) {
    deleteCompetence(id: $id)
  }
`;

export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: ExperienceInput!) {
    createExperience(input: $input) {
      id
      poste
      entreprise
      description
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: ExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      poste
      entreprise
      description
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;
