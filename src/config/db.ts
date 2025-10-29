import mongoose from "mongoose";
import logger from "../logger/logger.js";

const connectDB = async () => {
    try {
        const config = {
            serverSelectionTimeoutMs: 5000, // 5s pour afficher error si mongoDB ne repond pas
            socketTimeoutMs: 45000, // si l'operation prend plus de 4,5s elle est annulee
            maxPoolSize: 10, // nbr connexions simultanées 
            minPoolSize: 2, // nbr connexions à maintenir ouvertes
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, config);

        logger.info(`MongoDB successfully connected: ${conn.connection.host}`);
        logger.info(`Database used: ${conn.connection.name}`);
        logger.info(`MongoDB Port: ${conn.connection.port}`);
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDB;