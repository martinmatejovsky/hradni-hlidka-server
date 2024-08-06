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
}
export type GameState = "none" | "ready" | "running" | "won" | "lost"
type PolygonType = "battleZone" | "smithy" | "barracks"
export interface BasePolygon {
    polygonName: string,
    key: string,
    polygonType: PolygonType,
    cornerCoordinates: Coordinates[],
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
    }
}
export interface BattleZone {
    zoneName: string,
    key: string,
    cornerCoordinates: Coordinates[],
    conquered: boolean,
    guardians: PlayerData[],
    invaders: Invader[],
    assembledInvaders: Invader[],
    assaultLadder: AssaultLadder,
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
    assembleArea: number|null,
    ladderStep: number|null,
}
