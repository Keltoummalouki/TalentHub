import Profil from '../models/Profil.js';
import Projet from '../models/Projet.js';
import Competence from '../models/Competence.js';
import Experience from '../models/Experience.js';
import logger from '../logger/logger.js';

export const seedData = async () => {
  try {
    // Vérifier si des données existent déjà
    const profilExists = await Profil.findOne();
    if (profilExists) {
      logger.info('Data already seeded');
      return;
    }

    // Créer le profil
    await Profil.create({
      nom: 'Malouki',
      prenom: 'Keltoum',
      titre: 'Développeuse Full Stack',
      biographie: 'Passionnée par la création d\'expériences web intuitives et accessibles. Je combine créativité visuelle & logique de développement pour créer des applications modernes et interactives.',
      email: 'keltoummalouki@gmail.com',
      telephone: '+212 602693697',
      adresse: 'Casablanca (mobilité)',
      reseauxSociaux: {
        linkedin: 'https://linkedin.com/in/keltoummalouki',
        github: 'https://github.com/keltoummalouki',
        twitter: '',
        website: 'https://keltoummalouki.me'
      },
      photo: ''
    });

    // Créer les projets
    await Projet.insertMany([
      {
        titre: 'Careflow - Application Web',
        description: 'Développement d\'une API REST permettant de : Gérer les utilisateurs (admin, médecins, patients). Planifier et gérer les rendez-vous avec réservation des créneaux et rappels email',
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Redis', 'Mocha', 'Chai'],
        lienDemo: '',
        lienGithub: '',
        images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'],
        dateDebut: new Date('2025-03-01'),
        statut: 'termine',
        tags: ['backend', 'api', 'healthcare']
      },
      {
        titre: 'Réserve-Moi - Application Web',
        description: 'Développement d\'un système permettant aux utilisateurs de : Réserver des services en ligne (coiffure, beauté, réparation, etc.). Consulter les disponibilités et gérer leurs réservations',
        technologies: ['Laravel', 'HTML', 'Tailwind CSS', 'JavaScript', 'UML', 'Git', 'GitHub'],
        lienDemo: '',
        lienGithub: '',
        images: ['https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80'],
        dateDebut: new Date('2025-04-01'),
        statut: 'termine',
        tags: ['fullstack', 'web', 'booking']
      }
    ]);

    // Créer les compétences
    await Competence.insertMany([
      // Frontend
      { nom: 'HTML5', niveau: 'expert', categorie: 'frontend' },
      { nom: 'CSS3', niveau: 'expert', categorie: 'frontend' },
      { nom: 'JavaScript', niveau: 'expert', categorie: 'frontend' },
      { nom: 'TypeScript', niveau: 'avance', categorie: 'frontend' },
      { nom: 'React.js', niveau: 'expert', categorie: 'frontend' },
      { nom: 'Next.js', niveau: 'avance', categorie: 'frontend' },
      { nom: 'Tailwind CSS', niveau: 'expert', categorie: 'frontend' },
      { nom: 'SQL', niveau: 'avance', categorie: 'frontend' },
      { nom: 'NoSQL', niveau: 'avance', categorie: 'frontend' },
      
      // Backend
      { nom: 'Node.js', niveau: 'expert', categorie: 'backend' },
      { nom: 'Express.js', niveau: 'expert', categorie: 'backend' },
      { nom: 'NestJS', niveau: 'avance', categorie: 'backend' },
      { nom: 'PHP', niveau: 'avance', categorie: 'backend' },
      { nom: 'Laravel', niveau: 'avance', categorie: 'backend' },
      { nom: 'GraphQL', niveau: 'avance', categorie: 'backend' },
      { nom: 'Jira', niveau: 'intermediaire', categorie: 'backend' },
      
      // Database
      { nom: 'MongoDB', niveau: 'expert', categorie: 'database' },
      { nom: 'MySQL', niveau: 'expert', categorie: 'database' },
      { nom: 'PostgreSQL', niveau: 'avance', categorie: 'database' },
      
      // DevOps
      { nom: 'Git', niveau: 'expert', categorie: 'devops' },
      { nom: 'GitHub', niveau: 'expert', categorie: 'devops' },
      { nom: 'GitLab', niveau: 'avance', categorie: 'devops' },
      { nom: 'Docker', niveau: 'avance', categorie: 'devops' },
      { nom: 'CI/CD', niveau: 'intermediaire', categorie: 'devops' },
      
      // Design
      { nom: 'Figma', niveau: 'avance', categorie: 'design' },
      { nom: 'Canva', niveau: 'avance', categorie: 'design' },
      { nom: 'Adobe XD', niveau: 'intermediaire', categorie: 'design' },
      { nom: 'UML', niveau: 'avance', categorie: 'design' },
      { nom: 'Merise', niveau: 'avance', categorie: 'design' }
    ]);

    // Créer les expériences
    await Experience.insertMany([
      {
        poste: 'Stagiaire Développeuse Web - Calisse Manager, Robot',
        entreprise: 'Calisse Manager, Robot',
        description: 'Réalisation de maquettes et intégration front-end avec React, Next.js et Tailwind CSS. Développement d\'animations et d\'un site vitrine.',
        dateDebut: new Date('2025-06-01'),
        dateFin: new Date('2025-08-31'),
        enCours: false,
        competences: ['React.js', 'Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Shadcn UI', 'Git', 'GitHub'],
        lieu: 'Maroc'
      },
      {
        poste: 'Formation Développement Full-Stack YouCode - UMEP',
        entreprise: 'YouCode - UMEP',
        description: 'Formation pratique en développement web front-end et back-end',
        dateDebut: new Date('2024-01-01'),
        enCours: true,
        competences: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'MySQL', 'Git'],
        lieu: 'Maroc'
      },
      {
        poste: 'Baccalauréat en Sciences Physiques',
        entreprise: 'Lycée Ouka Ibnou Nafias - Casablanca',
        description: 'Baccalauréat en Sciences Physiques',
        dateDebut: new Date('2024-01-01'),
        dateFin: new Date('2024-12-31'),
        enCours: false,
        competences: [],
        lieu: 'Casablanca'
      }
    ]);

    logger.info('Database seeded successfully with initial data');
  } catch (error) {
    logger.error('Error seeding data:', error);
  }
};
