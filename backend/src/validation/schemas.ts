import { z } from 'zod';

export const projetSchema = z.object({
  titre: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  technologies: z.array(z.string()).min(1, 'Au moins une technologie requise'),
  lienDemo: z.string().url('URL invalide').optional().or(z.literal('')),
  lienGithub: z.string().url('URL invalide').optional().or(z.literal('')),
  images: z.array(z.string()).optional(),
  dateDebut: z.string(),
  dateFin: z.string().optional(),
  statut: z.enum(['en_cours', 'termine', 'pause']).optional(),
  tags: z.array(z.string()).optional()
});

export const competenceSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  niveau: z.enum(['debutant', 'intermediaire', 'avance', 'expert']),
  categorie: z.enum(['frontend', 'backend', 'database', 'devops', 'design', 'autre']),
  icone: z.string().optional()
});

export const experienceSchema = z.object({
  poste: z.string().min(3, 'Le poste doit contenir au moins 3 caractères'),
  entreprise: z.string().min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  dateDebut: z.string(),
  dateFin: z.string().optional(),
  enCours: z.boolean().optional(),
  competences: z.array(z.string()).optional(),
  lieu: z.string().optional()
});

export const profilSchema = z.object({
  nom: z.string().min(2).optional(),
  prenom: z.string().min(2).optional(),
  titre: z.string().min(3).optional(),
  biographie: z.string().min(10).optional(),
  email: z.string().email('Email invalide').optional(),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  reseauxSociaux: z.object({
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal(''))
  }).optional(),
  photo: z.string().optional()
});
