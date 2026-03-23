import 'dotenv/config'; // must be the very first line
import express from 'express';
const app = express();
import fs from 'fs';
import * as http from 'node:http';
import https from 'https';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import gameLocationsRouter from './src/routes/game-locations.js';

import gameRouter from './src/routes/game.js';

let server;

if (process.env.CERT_PATH && process.env.CERT_PATH_KEY) {
    const key = fs.readFileSync(process.env.CERT_PATH_KEY);
    const cert = fs.readFileSync(process.env.CERT_PATH);
    server = https.createServer({ key, cert }, app);
} else {
    server = http.createServer(app);
}

const port = process.env.PORT || 3000;
const frontendPath = process.env.FRONTEND_PATH as string;
import initializeSocket from './src/controllers/socketIo.js';
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
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

// To see IP of localhost computer run IPCONFIG and instead of second parameter put local ipv4 address.
// To run server on PROD environment I probably have to use hostname '0.0.0.0'
// When just on one own computer, use 'localhost'
server.listen(port, process.env.SERVER_HOST, () => {
    const address = server.address();

    if (typeof address === 'string') {
        console.log(`HTTPS backend running at ${address}`);
    } else if (address && typeof address === 'object') {
        console.log(`HTTPS backend running at https://${address.address}:${address.port}`);
    } else {
        console.log('HTTPS backend running (address unknown)');
    }
});
