import { io, Socket } from 'socket.io-client';
import { it, describe, beforeAll, expect } from 'vitest';
import axios from 'axios';
import testLocation from './testLocation.js';

let player1: Socket;
let player2: Socket;
const frontendURL = 'http://localhost:3000';
const apiUrl = 'http://localhost:8080';

describe('Game Integration Test', () => {
    beforeAll(async () => {
        const { gameLocation, settings } = testLocation;
        const response = await axios.post(`${apiUrl}/game/createGame`, { gameLocation, settings });

        expect(response).toBe(201);
    });

    it('should connect multiple players', () => {
        player1 = io(frontendURL);
        player2 = io(frontendURL);
    });
});
