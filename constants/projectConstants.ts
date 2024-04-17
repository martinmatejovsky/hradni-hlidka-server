import type {GameInstance} from "./customTypes";

export const GAME_UPDATE_INTERVAL: number = 1000
export const EMPTY_GAME_INSTANCE: GameInstance = {
    id: '',
    gameState: 'none',
    gameLocation: {
        locationName: '',
        key: '',
        polygons: [],
        speedChoices: [],
        ladderLengthChoices: [],
    },
    battleZones: [],
    players: [],
    gameTempo: 10,
    ladderLength: 10,
};