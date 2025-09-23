import { Server } from 'socket.io';
import {
    GameState,
    GameLocation,
    BattleZone,
    UtilityZone,
    PlayerData,
    OilPot,
    Stats,
    Settings,
} from '../constants/customTypes.js';
import { runAttack } from './runAttack.js';
import { LastWaveNotice } from '../constants/customTypes.js';
import { GAME_UPDATE_INTERVAL } from '../constants/projectConstants.js';
export class GameSession {
    public id: string;
    public sessionName: string;
    public gameState: GameState;
    public gameLocation: GameLocation;
    public battleZones: BattleZone[] = [];
    public utilityZones: UtilityZone[] = [];
    public players: PlayerData[] = [];
    public gameTempo: number;
    public ladderLength: number;
    public carriedOilPots: OilPot[] = [];

    private gameUpdateIntervalId: NodeJS.Timeout | null = null;
    private gameCalculationIntervalId: NodeJS.Timeout | null = null;

    constructor(id: string, sessionName: string, gameLocation: GameLocation, gameTempo: number, ladderLength: number) {
        this.id = id;
        this.sessionName = sessionName;
        this.gameLocation = gameLocation;
        this.gameState = GameState.Ready;
        this.gameTempo = gameTempo;
        this.ladderLength = ladderLength;
    }

    start(io: Server, settings: Settings, stats: Stats) {
        console.log(`[Game ${this.id}] starting...`);

        this.stop(); // prevent multiple start by accident

        this.gameCalculationIntervalId = setInterval(() => {
            runAttack(this, settings, stats);

            // announce approaching last waves
            if (stats.incrementingWaveId === settings.gameLength - 2) {
                const event: LastWaveNotice = 'incoming';
                io.to(this.id).emit('lastWaveNotice', event);
            } else if (stats.incrementingWaveId === settings.gameLength) {
                const event: LastWaveNotice = 'running';
                io.to(this.id).emit('lastWaveNotice', event);
            }

            if (this.gameState === GameState.Won || this.gameState === GameState.Lost) {
                this.stop();
                io.to(this.id).emit('gameUpdated', this);
            }
        }, this.gameTempo);

        this.gameUpdateIntervalId = setInterval(() => {
            console.log(`[Game ${this.id}] tick update`);
            io.to(this.id).emit('gameUpdated', this);
        }, GAME_UPDATE_INTERVAL);
    }

    stop() {
        if (this.gameCalculationIntervalId) {
            clearInterval(this.gameCalculationIntervalId);
            this.gameCalculationIntervalId = null;
        }
        if (this.gameUpdateIntervalId) {
            clearInterval(this.gameUpdateIntervalId);
            this.gameUpdateIntervalId = null;
        }
        console.log(`[Game ${this.id}] stopped.`);
    }

    // JSON format for Socket
    toJSON() {
        return {
            id: this.id,
            sessionName: this.sessionName,
            gameState: this.gameState,
            gameLocation: this.gameLocation,
            battleZones: this.battleZones,
            utilityZones: this.utilityZones,
            players: this.players,
            gameTempo: this.gameTempo,
            ladderLength: this.ladderLength,
            carriedOilPots: this.carriedOilPots,
        };
    }
}
