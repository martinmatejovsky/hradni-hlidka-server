import { GameState } from '../constants/customTypes';
import { GameSession } from './gameSessionClass.js';

export const evaluateSuccessfulDefend = (gameInstance: GameSession) => {
    // check if all invaders are dead
    let allInvadersDead = true;
    gameInstance.battleZones.forEach((zone) => {
        if (zone.invaders.length > 0) {
            allInvadersDead = false;
        }
    });

    if (allInvadersDead) {
        gameInstance.gameState = GameState.Won;
        return true;
    } else {
        return false;
    }
};
