import type {GameInstance} from "./customTypes";

export const GAME_UPDATE_INTERVAL: number = 5000
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
    gameTempo: 5000,
    ladderLength: 10,
};
