import express from "express";
const app = express();
import * as http from "node:http";
const server = http.createServer(app);
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
const port = process.env.PORT || 8080;
import gameLocationsRouter from './src/routes/game-locations.js';
import gameRouter from './src/routes/game.js';
const frontendPath = process.env.FRONTEND_PATH || "../hradni-hlidka/dist";
import initializeSocket from './src/controllers/socketIo.js'
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}
));
app.use(express.json());
initializeSocket(server);
app.use('/api/game-locations', gameLocationsRouter);
app.use('/api/game', (req: Request, res: Response, next: NextFunction) => {
    req.app.set('io', server.io);
    gameRouter(req, res, next);
});
app.use(express.static(path.join(__dirname, frontendPath)));

server.listen(port, '0.0.0.0', () => {
    console.log("Server listening on the port", port, "...");
});