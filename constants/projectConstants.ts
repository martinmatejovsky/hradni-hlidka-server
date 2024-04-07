import type {GameInstance} from "./customTypes";

export const GAME_UPDATE_INTERVAL: number = 10000
export const GAME_TEMPO: number = 10000
export const LADDER_POSITIONS: number = 10
export const EMPTY_GAME_INSTANCE: GameInstance = {
    id: '',
    gameState: 'none',
    gameLocation: {
        locationName: '',
        key: '',
        polygons: [],
    },
    battleZones: [],
    players: [],
};