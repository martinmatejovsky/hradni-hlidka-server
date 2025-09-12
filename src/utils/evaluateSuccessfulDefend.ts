import {GameInstance, GameState} from "../constants/customTypes";

export const evaluateSuccessfulDefend = (gameInstance: GameInstance) => {
    // check if all invaders are dead
    let allInvadersDead = true;
    gameInstance.battleZones.forEach(zone => {
        if (zone.invaders.length > 0) {
            allInvadersDead = false;
        }
    })

    if (allInvadersDead) {
        gameInstance.gameState = GameState.Won;
        return true;
    } else {
        return false;
    }
}