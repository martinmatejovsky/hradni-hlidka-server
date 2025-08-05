import { io, Socket } from 'socket.io-client';
import { it, describe, afterAll, expect } from 'vitest';
import axios from 'axios';
import testLocation from './testLocation';
import playerMockData from './mockPlayers.js';
import { GameInstance, PlayerData } from '../src/constants/customTypes.js';

let player1Socket: Socket;
let playerSword1: PlayerData = playerMockData.playerSword1;
const apiUrl = 'http://127.0.0.1:8080';

describe('Game Integration Test', () => {
    let gameInstance: GameInstance;

    it('should connect multiple players', async () => {
        try {
            const { gameLocation, settings } = testLocation;
            const response = await axios.post(`${apiUrl}/api/game/createGame`, { gameLocation, settings });

            expect(response.status).toBe(201);
            gameInstance = response.data.gameInstance;
        } catch (error) {
            console.error(error);
        }

        player1Socket = io(apiUrl);
        await Promise.all([new Promise<void>((resolve) => player1Socket.on('connect', resolve))]);

        expect(player1Socket.connected).toBe(true);

        player1Socket.emit('joinGame', {
            gameId: gameInstance.id,
            player: playerSword1,
        });

        gameInstance = await new Promise<GameInstance>((resolve) => player1Socket.on('newPlayerJoined', resolve));

        expect(gameInstance.players.length).toBe(1);
    });

    afterAll(() => {
        player1Socket.disconnect();
    });
});
