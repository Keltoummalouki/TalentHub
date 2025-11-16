import express, { Express } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import helmet from 'helmet';
import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';
import { getUser } from './middleware/auth.js';

const app: Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
);

app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' }));
app.use(cors({ 
  origin: [process.env.FRONTEND_URL || 'http://localhost:8080', 'http://localhost:5173', 'http://localhost:8080'], 
  credentials: true 
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    if (process.env.NODE_ENV === 'production') {
      delete error.extensions?.stacktrace;
    }
    return error;
  },
  introspection: process.env.NODE_ENV !== 'production'
});

export const startApollo = async () => {
  await apollo.start();
  
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apollo, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = getUser(token);
        return { user };
      }
    }) as any
  );
};

app.get('/', (req, res) => {
  res.send('TalentHub API running...');
});

export default app;
