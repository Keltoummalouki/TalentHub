import { GraphQLError } from 'graphql';
import { verifyToken } from '../utils/jwt.js';

export interface Context {
  user?: {
    userId: string;
    username: string;
    role: string;
  };
}

export const authenticate = (context: Context) => {
  if (!context.user) {
    throw new GraphQLError('Non authentifié', {
      extensions: { code: 'UNAUTHENTICATED' }
    });
  }
  return context.user;
};

export const authorize = (context: Context, allowedRoles: string[] = ['admin']) => {
  const user = authenticate(context);
  
  if (!allowedRoles.includes(user.role)) {
    throw new GraphQLError('Non autorisé', {
      extensions: { code: 'FORBIDDEN' }
    });
  }
  
  return user;
};

export const getUser = (token?: string) => {
  if (!token) return null;
  
  try {
    const decoded = verifyToken(token);
    return {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
  } catch {
    return null;
  }
};
