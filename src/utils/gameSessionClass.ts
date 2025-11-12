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
    WeaponType,
    ArcherPhases,
} from '../constants/customTypes.js';
import { runAttack } from './runAttack.js';
import { generatePointsAroundCenter } from './generatePointsAroundCenter.js';
import { calculateLadderSteps } from './calculateLadderSteps.js';
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
    public settings: Settings;

    private gameUpdateIntervalId: NodeJS.Timeout | null = null;
    private gameCalculationIntervalId: NodeJS.Timeout | null = null;

    constructor(id: string, sessionName: string, gameLocation: GameLocation, settings: Settings) {
        this.id = id;
        this.sessionName = sessionName;
        this.gameLocation = gameLocation;
        this.gameState = GameState.Ready;
        this.gameTempo = settings.gameTempo;
        this.ladderLength = settings.ladderLength;
        this.settings = settings;
    }

    start(io: Server, stats: Stats) {
        stats.axesInGame = this.players.filter((p) => p.weaponType === WeaponType.AXE).length;

        this.stop(); // prevent multiple start by accident
        this.populatePolygons();
        this.gameState = GameState.Running;
        io.to(this.id).emit('gameStarted', this.toJSON());

        this.gameCalculationIntervalId = setInterval(() => {
            runAttack(this, this.settings, stats);

            // announce approaching last waves
            if (stats.incrementingWaveId === this.settings.gameLength - 2) {
                const event: LastWaveNotice = 'incoming';
                io.to(this.id).emit('lastWaveNotice', event);
            } else if (stats.incrementingWaveId === this.settings.gameLength) {
                const event: LastWaveNotice = 'running';
                io.to(this.id).emit('lastWaveNotice', event);
            }

            if (this.gameState === GameState.Won || this.gameState === GameState.Lost) {
                this.stop();
                io.to(this.id).emit('gameUpdated', this.toJSON());
            }
        }, this.gameTempo);

        this.gameUpdateIntervalId = setInterval(() => {
            io.to(this.id).emit('gameUpdated', this.toJSON());
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
            settings: this.settings,
        };
    }

    private areasToAmountOfPlayers(): string[] {
        const polygonsByPlayersTotal = this.gameLocation.polygonsToPlayersTotal;
        const playersTotal = this.players.length;
        const match = polygonsByPlayersTotal.find((p) => {
            return playersTotal <= p.upTo;
        });
        return match ? match.locations : [];
    }

    private populatePolygons() {
        const allowedPolygons = this.areasToAmountOfPlayers();

        let polygonsInGameArea = this.gameLocation.polygons.filter((polygon) => {
            return allowedPolygons.includes(polygon.key);
        });

        polygonsInGameArea.forEach((polygon) => {
            if (polygon.polygonType === 'assaultZone') {
                this.battleZones.push({
                    zoneName: polygon.polygonName,
                    key: polygon.key,
                    polygonType: polygon.polygonType,
                    areaOfAcceptedPresence: polygon.areaOfAcceptedPresence,
                    areaPresentational: polygon.areaPresentational,
                    conquered: false,
                    guardians: [],
                    invaders: [],
                    assemblyAreaCenter: polygon.assemblyAreaCenter!,
                    assemblyArea: polygon.assemblyArea ?? generatePointsAroundCenter(polygon.assemblyAreaCenter!), // can be set manually for specific places, but generally is calculated by randomizer
                    assemblyCountdown: 0,
                    assaultLadder: {
                        location: polygon.assaultLadder!.location!,
                        steps: calculateLadderSteps(polygon.assaultLadder!, this.ladderLength),
                    },
                    archers: {
                        phase: ArcherPhases.reloading,
                        archersPositionCenter: polygon.archersPositionCenter,
                        phaseTimer: Math.floor(Math.random()),
                        cooldownTicks: 0,
                    },
                    waveCooldown: 0,
                });
            }

            if (polygon.polygonType === 'smithy') {
                this.utilityZones.push({
                    zoneName: polygon.polygonName,
                    key: polygon.key,
                    polygonType: polygon.polygonType,
                    areaOfAcceptedPresence: polygon.areaOfAcceptedPresence,
                    areaPresentational: polygon.areaPresentational,
                    guardians: [],
                    boilingOil: {
                        readiness: 0,
                        readyAt: this.settings.oilBoilingTime,
                        location: polygon.boilingOilPotLocation,
                    },
                });
            }
        });
    }
}
