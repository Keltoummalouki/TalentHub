import app from './src/app.js'
import dotenv from 'dotenv'
import logger from './src/logger/logger.js'
import connectDB from './src/config/db.js'

dotenv.config();

const port = process.env.PORT;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            logger.info(`Server started on port ${port}`);
            logger.info(`MongoDB URI: ${process.env.MONGO_URI}`);
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
        console.error(`Failed to start server: `, error);
    }
}

startServer()