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
    assembledInvaders: Invader[],
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
export type InvaderType = "normal"
export type Invader = {
    id: number,
    type: InvaderType,
    health: number,
    assemblyArea: number|null,
    ladderStep: number|null,
}
export type Settings = {
    gameTempo: number,
    ladderLength: number,
    assaultWaveVolume: number,
    assemblyCountdown: number,
    wavesMinDelay: number,
    defendersHitStrength: number,
}
export type Stats = {
    incrementingInvaderId: number,
}