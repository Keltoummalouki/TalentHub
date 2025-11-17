import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import Profil from '../../models/Profil.js';
import Projet from '../../models/Projet.js';
import Competence from '../../models/Competence.js';
import Experience from '../../models/Experience.js';
import User from '../../models/User.js';
import { generateToken } from '../../utils/jwt.js';
import { authorize, Context } from '../../middleware/auth.js';
import { projetSchema, competenceSchema, experienceSchema, profilSchema } from '../../validation/schemas.js';

const resolvers = {
  Query: {
    getProfil: async () => {
      return await Profil.findOne();
    },

    getProjets: async (_: unknown, { filters, first = 10, after }: any) => {
      const query: any = {};
      
      if (filters?.tags?.length) {
        query.tags = { $in: filters.tags };
      }
      if (filters?.technologies?.length) {
        query.technologies = { $in: filters.technologies };
      }
      if (filters?.statut) {
        query.statut = filters.statut;
      }

      if (after) {
        query._id = { $gt: after };
      }

      const projets = await Projet.find(query)
        .sort({ dateDebut: -1 })
        .limit(first + 1);

      const hasNextPage = projets.length > first;
      const nodes = hasNextPage ? projets.slice(0, -1) : projets;

      const edges = nodes.map(node => ({
        node,
        cursor: (node._id as any).toString()
      }));

      const totalCount = await Projet.countDocuments(query);

      return {
        edges,
        pageInfo: {
          hasNextPage,
          hasPreviousPage: !!after,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor
        },
        totalCount
      };
    },

    getProjet: async (_: unknown, { id }: { id: string }) => {
      const projet = await Projet.findById(id);
      if (!projet) {
        throw new GraphQLError('Projet non trouvé', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return projet;
    },

    getCompetences: async () => {
      return await Competence.find().sort({ categorie: 1, niveau: -1 });
    },

    getExperiences: async () => {
      return await Experience.find().sort({ dateDebut: -1 });
    },

    getPortfolio: async () => {
      const [profil, projets, competences, experiences] = await Promise.all([
        Profil.findOne(),
        Projet.find().sort({ dateDebut: -1 }),
        Competence.find().sort({ categorie: 1 }),
        Experience.find().sort({ dateDebut: -1 })
      ]);

      return { profil, projets, competences, experiences };
    }
  },

  Mutation: {
    login: async (_: unknown, { username, password }: { username: string; password: string }) => {
      const user = await User.findOne({ 
        $or: [{ username }, { email: username }] 
      });
      
      if (!user) {
        throw new GraphQLError('Identifiants invalides', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const isValid = await bcrypt.compare(password, user.password);
      
      if (!isValid) {
        throw new GraphQLError('Identifiants invalides', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const token = generateToken({
        userId: (user._id as any).toString(),
        username: user.username,
        role: user.role
      });

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      };
    },

    updateProfil: async (_: unknown, { input }: any, context: Context) => {
      authorize(context);
      
      const validated = profilSchema.parse(input);
      
      let profil = await Profil.findOne();
      
      if (!profil) {
        profil = new Profil(validated);
      } else {
        Object.assign(profil, validated);
      }
      
      await profil.save();
      return profil;
    },

    createProjet: async (_: unknown, { input }: any, context: Context) => {
      authorize(context);
      
      const validated = projetSchema.parse(input);
      const projet = new Projet(validated);
      await projet.save();
      return projet;
    },

    updateProjet: async (_: unknown, { id, input }: any, context: Context) => {
      authorize(context);
      
      const validated = projetSchema.parse(input);
      const projet = await Projet.findByIdAndUpdate(id, validated, { new: true });
      
      if (!projet) {
        throw new GraphQLError('Projet non trouvé', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      
      return projet;
    },

    deleteProjet: async (_: unknown, { id }: { id: string }, context: Context) => {
      authorize(context);
      
      const result = await Projet.findByIdAndDelete(id);
      return !!result;
    },

    createCompetence: async (_: unknown, { input }: any, context: Context) => {
      authorize(context);
      
      const validated = competenceSchema.parse(input);
      const competence = new Competence(validated);
      await competence.save();
      return competence;
    },

    updateCompetence: async (_: unknown, { id, input }: any, context: Context) => {
      authorize(context);
      
      const validated = competenceSchema.parse(input);
      const competence = await Competence.findByIdAndUpdate(id, validated, { new: true });
      
      if (!competence) {
        throw new GraphQLError('Compétence non trouvée', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      
      return competence;
    },

    deleteCompetence: async (_: unknown, { id }: { id: string }, context: Context) => {
      authorize(context);
      
      const result = await Competence.findByIdAndDelete(id);
      return !!result;
    },

    createExperience: async (_: unknown, { input }: any, context: Context) => {
      authorize(context);
      
      const validated = experienceSchema.parse(input);
      const experience = new Experience(validated);
      await experience.save();
      return experience;
    },

    updateExperience: async (_: unknown, { id, input }: any, context: Context) => {
      authorize(context);
      
      const validated = experienceSchema.parse(input);
      const experience = await Experience.findByIdAndUpdate(id, validated, { new: true });
      
      if (!experience) {
        throw new GraphQLError('Expérience non trouvée', {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      
      return experience;
    },

    deleteExperience: async (_: unknown, { id }: { id: string }, context: Context) => {
      authorize(context);
      
      const result = await Experience.findByIdAndDelete(id);
      return !!result;
    }
  }
};

export default resolvers;
