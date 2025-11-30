import express from 'express';
const app = express();
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import gameLocationsRouter from './src/routes/game-locations.js';
import gameRouter from './src/routes/game.js';

// const key = fs.readFileSync('./certificates/192.168.1.101-key.pem');
// const cert = fs.readFileSync('./certificates/192.168.1.101.pem');
const key = fs.readFileSync('./certificates/localhost+2-key.pem');
const cert = fs.readFileSync('./certificates/localhost+2.pem');
const server = https.createServer({ key, cert }, app);
const port = process.env.PORT || 8080;
const frontendPath = process.env.FRONTEND_PATH || '../hradni-hlidka/dist';
import initializeSocket from './src/controllers/socketIo.js';
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
    cors({
        // origin: process.env.CORS_ORIGIN || 'https://192.168.1.101:3000',
        origin: process.env.CORS_ORIGIN || 'https://localhost:3000',
    }),
);
app.use(express.json());
initializeSocket(server);
app.use('/api/game-locations', gameLocationsRouter);
app.use('/api/game', (req: Request, res: Response, next: NextFunction) => {
    req.app.set('io', server.io);
    gameRouter(req, res, next);
});
app.use(express.static(path.join(__dirname, frontendPath)));

// to see IP of localhost computer run IPCONFIG and instead of 0.0.0.0 put local ipv4 address
// to run server on PROD environment I probably have to use hostname '0.0.0.0'
server.listen(8080, '0.0.0.0', () => {
    console.log('HTTPS Backend running...');
});
