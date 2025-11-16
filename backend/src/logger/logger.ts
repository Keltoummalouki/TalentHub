import { createLogger , format, transports } from "winston"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url); // the file name (with path)
const __dirname = path.dirname(__filename); // the folder name

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // date/time
        format.printf(info=> `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`) // Custom format
    ),
    transports: [
        new transports.Console(), // Log to Console
        new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error'}), // log errors
        new transports.File({ filename: path.join(__dirname, '../../logs/combined.log')})
    ]
})

export default logger;