import { GameInstance, GameState } from './customTypes';

export const GAME_UPDATE_INTERVAL: number = 2000; // should not be longer than EMPTY_GAME_INSTANCE.gameTempo
export const EMPTY_GAME_INSTANCE: GameInstance = {
    id: '',
    gameState: GameState.None,
    gameLocation: {
        locationName: '',
        key: '',
        mapCenter: { lat: 0, lng: 0 },
        polygonsToPlayersTotal: [],
        polygons: [],
        speedChoices: [],
        ladderLengthChoices: [],
    },
    battleZones: [],
    utilityZones: [],
    players: [],
    gameTempo: 10000,
    ladderLength: 30,
    carriedOilPots: [],
};
export const cannonBallSpeed: number = 2000;
