import express from 'express'
import morgan from 'morgan'
import fs from 'fs' // file system 
import path from 'path' // path helper
import { fileURLToPath } from 'url' 

const app = express()
app.use(express.json()) // read json data from req.body

const __filename = fileURLToPath(import.meta.url); // the file name (with path)
const __dirname = path.dirname(__filename); // the folder name

// create logs folder if not exists (predefined fs function)
const logDir = path.join(__dirname, '../logs');
if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// create a write stream for HTTP request logs
const accessLogStream = fs.createWriteStream(
    path.join(logDir, 'access.log'), // full path of file access.log => (/logs/access.log)
    { flags: 'a'} // append mode => Don’t delete old logs — just keep adding new lines
)

app.use(morgan('dev')); // dev is short for “developer mode” — clean, colorful, easy to read logs in console.
app.use(morgan('combined', { stream: accessLogStream })) // combined full info - detailed format (used in production) || stream : where to send the log.

app.get('/' , (req, res) => {
    res.send('TalentHub API running...')
})

export default app;