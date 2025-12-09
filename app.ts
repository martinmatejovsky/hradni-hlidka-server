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
// const key = fs.readFileSync('./certificates/192.168.1.104-key.pem');
// const cert = fs.readFileSync('./certificates/192.168.1.104.pem');
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
        // origin: process.env.CORS_ORIGIN || 'https://192.168.1.104:3000',
        // origin: process.env.CORS_ORIGIN || 'https://192.168.1.101:3000',
        origin: process.env.CORS_ORIGIN || 'https://localhost:3000', // when just on one own computer
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

// To see IP of localhost computer run IPCONFIG and instead of 0.0.0.0 put local ipv4 address.
// To run server on PROD environment I probably have to use hostname '0.0.0.0'
// When just on one own computer, use 'localhost'
server.listen(port, 'localhost', () => {
    const address = server.address();

    if (typeof address === 'string') {
        console.log(`HTTPS backend running at ${address}`);
    } else if (address && typeof address === 'object') {
        console.log(`HTTPS backend running at https://${address.address}:${address.port}`);
    } else {
        console.log('HTTPS backend running (address unknown)');
    }
});
