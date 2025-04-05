export type Coordinates = {
    lat: number | null,
    lng: number | null,
}
export type PlayerCoordinates = Coordinates & {accuracy: number | null}
export type PlayerData = {
    key: string,
    name: string,
    weaponType: WeaponType;
    location: PlayerCoordinates,
    insideZone: string,
    strength: number,
    perks: {
        sharpSword: number,
        boilingOil: boolean,
    }
    canPourBoilingOil: boolean,
    socketId: string,
}
export enum Perks {
    sharpSword = 'sharpSword',
    boilingOil = 'boilingOil'
}
export type GameState = "none" | "ready" | "running" | "won" | "lost"
type PolygonType = "assaultZone" | "smithy"
export interface BasePolygon {
    polygonName: string,
    key: string,
    polygonType: PolygonType,
    areaOfAcceptedPresence: Coordinates[],
    areaPresentational: Coordinates[],
    assemblyArea?: Coordinates[],
    assaultLadder?: AssaultLadder,
    assemblyAreaCenter?: Coordinates,
    boilingOilPotLocation?: Coordinates,
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
    polygonType: PolygonType,
    areaOfAcceptedPresence: Coordinates[],
    areaPresentational: Coordinates[],
    conquered: boolean,
    guardians: string[],
    invaders: Invader[],
    assemblyArea: Coordinates[],
    assemblyAreaCenter: Coordinates,
    assemblyCountdown: number,
    assaultLadder: AssaultLadder,
    waveCooldown: number,
}
export interface UtilityZone {
    zoneName: string,
    key: string,
    polygonType: PolygonType,
    areaOfAcceptedPresence: Coordinates[],
    areaPresentational: Coordinates[],
    guardians: string[],
    boilingOil: {
        readiness: number,
        readyAt: number,
        location?: Coordinates,
    } | null,
}
export interface OilPot {
    carriedBy: string[], // IDs of players
    pouredInZone: string[],
}
export interface GameInstance {
    id: string,
    gameState: GameState,
    gameLocation: GameLocation,
    battleZones: BattleZone[],
    utilityZones: UtilityZone[],
    players: PlayerData[],
    gameTempo: number,
    ladderLength: number,
    carriedOilPots: OilPot[],
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
    smithyUpgradeWaiting: number,
    smithyUpgradeStrength: number,
    oilBoilingTime: number,
    cannonLoadingTime: number,
}
export type Stats = {
    incrementingInvaderId: number,
    incrementingWaveId: number,
}
export type LastWaveNotice = 'none' | 'incoming' | 'running'
export enum WeaponType {
    NONE = 'none',
    SWORD = 'sword',
    CANNON = 'cannon'
}
export const WeaponData: Record<WeaponType, { label: string }> = {
    [WeaponType.NONE]: { label: 'Žádná'},
    [WeaponType.SWORD]: { label: 'Meč' },
    [WeaponType.CANNON]: { label: 'Dělo' }
};
export interface WeaponAbility {
    perkSharpSword: boolean,
    perkBoilingOil: boolean,
    canDefeatInvaders: boolean,
    canBombardAssemblyArea: boolean,
}
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