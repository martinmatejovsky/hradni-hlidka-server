import type { BattleZone } from '../constants/customTypes';
import { GameState } from '../constants/customTypes';
import { GameSession } from './gameSessionClass.js';

export const checkAnyAreaConquered = (gameInstance: GameSession): void => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    battleZones.forEach((zone: BattleZone): void => {
        if (
            zone.invaders.some(
                (invader) => typeof invader.ladderStep === 'number' && invader.ladderStep >= gameInstance.ladderLength,
            )
        ) {
            zone.conquered = true;
            gameInstance.gameState = GameState.Lost;
        }
    });
};
