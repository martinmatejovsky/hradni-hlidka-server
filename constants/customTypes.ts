export type Coordinates = {
    lat: number | null,
    lng: number | null,
}
export type PlayerCoordinates = Coordinates & {accuracy: number | null}
export type PlayerData = {
    name: string,
    key: string,
    location: PlayerCoordinates,
    insideZone: string,
    strength: number,
}
export type GameState = "none" | "ready" | "running" | "won" | "lost"
type PolygonType = "battleZone" | "smithy" | "barracks"
export interface BasePolygon {
    polygonName: string,
    key: string,
    polygonType: PolygonType,
    cornerCoordinates: Coordinates[],
    assemblyArea: Coordinates[],
    assaultLadder: AssaultLadder,
}
export interface GameLocation {
    locationName: string,
    key: string,
    mapCenter: Coordinates,
    polygons: BasePolygon[],
    speedChoices: number[],
    ladderLengthChoices: number[],
}
export interface AssaultLadder {
    location: {
        start: Coordinates,
        end: Coordinates
    },
    steps: Coordinates[],
}
export interface BattleZone {
    zoneName: string,
    key: string,
    cornerCoordinates: Coordinates[],
    conquered: boolean,
    guardians: PlayerData[],
    invaders: Invader[],
    assemblyArea: Coordinates[],
    assemblyCountdown: number,
    assaultLadder: AssaultLadder,
    waveCooldown: number,
}
export interface GameInstance {
    id: string,
    gameState: GameState,
    gameLocation: GameLocation,
    battleZones: BattleZone[],
    players: PlayerData[],
    gameTempo: number,
    ladderLength: number,
}
export type InvaderType = "regular" | "captain"
export type Settings = {
    gameTempo: number,
    gameLength: number,
    ladderLength: number,
    assaultWaveVolume: number,
    assemblyCountdown: number,
    wavesMinDelay: number,
    defendersHitStrength: number,
}
export type Stats = {
    incrementingInvaderId: number,
    incrementingWaveId: number,
}
export type LastWaveNotice = 'none' | 'incoming' | 'running'

export class Invader {
    id: number;
    type: InvaderType;
    health: number;
    assemblyArea: number | null;
    ladderStep: number | null;

    constructor(id: number, type: InvaderType, assemblyArea: number | null, amountOfPlayers: number) {
        this.id = id;
        this.type = type;
        this.assemblyArea = assemblyArea;
        this.ladderStep = null;

        if (type === 'captain') {
            this.health = Math.ceil(amountOfPlayers * 1.25);
        } else {
            this.health = amountOfPlayers;
        }
    }

    // Factory method to create a normal invader
    static createNormalInvader(id: number, assemblyArea: number, amountOfPlayers: number): Invader {
        return new Invader(id, 'regular' as InvaderType, assemblyArea, amountOfPlayers);
    }

    // Factory method to create a captain invader
    static createCaptainInvader(id: number, assemblyArea: number, amountOfPlayers: number): Invader {
        return new Invader(id, 'captain' as InvaderType, assemblyArea, amountOfPlayers);
    }
}