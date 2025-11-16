import app, { startApollo } from './src/app.js';
import dotenv from 'dotenv';
import logger from './src/logger/logger.js';
import connectDB from './src/config/db.js';
import { seedAdmin } from './src/utils/seedAdmin.js';
import { seedData } from './src/utils/seedData.js';

dotenv.config();

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();
    await seedData();
    await startApollo();

    app.listen(port, () => {
      logger.info(`Server started on port ${port}`);
      logger.info(`GraphQL endpoint: http://localhost:${port}/graphql`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
