export type Coordinates = {
    latitude: number | null,
    longitude: number | null,
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
}
export interface GameLocation {
    locationName: string,
    key: string,
    polygons: BasePolygon[],
}
export interface BattleZone {
    zoneName: string,
    key: string,
    cornerCoordinates: Coordinates[],
    conquered: boolean,
    guardians: PlayerData[],
    assembledInvaders: Invader[],
    assaultLadder: (Invader | null)[],
}
export interface GameInstance {
    id: string,
    gameState: GameState,
    gameLocation: GameLocation,
    battleZones: BattleZone[],
    players: PlayerData[],
}
export type InvaderType = "normal"
export type Invader = {
    type: InvaderType,
    health: number,
}