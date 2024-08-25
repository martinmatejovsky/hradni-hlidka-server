import type {GameInstance} from "../constants/customTypes";

export const evaluateSuccessfulDefend = (gameInstance: GameInstance) => {
    // check if all invaders are dead
    let allInvadersDead = true;
    gameInstance.battleZones.forEach(zone => {
        if (zone.invaders.length > 0) {
            allInvadersDead = false;
        }
    })

    if (allInvadersDead) {
        gameInstance.gameState = 'won';
        return true;
    } else {
        return false;
    }
}