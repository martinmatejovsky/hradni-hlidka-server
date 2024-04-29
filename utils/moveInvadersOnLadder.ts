import type {BattleZone, GameInstance} from "../constants/customTypes";

export const moveInvadersOnLadder = (gameInstance: GameInstance): void => {
    const zones = gameInstance.battleZones;
    const ladderLength = gameInstance.ladderLength;
    const delayBetweenIterations = Math.floor(gameInstance.gameTempo / (ladderLength * 2));

    zones.forEach((area: BattleZone): void => {
        for (let i = ladderLength - 1; i >= 0; i--) {
            // Adjust the delay based on the iteration index
            setTimeout(() => {
                if (i > 0) {
                    area.assaultLadder[i] = area.assaultLadder[i - 1];
                    area.assaultLadder[i - 1] = null;
                }

                // last iteration of the inner loop in ladder
                else {
                    // After the last iteration, update the first position in assaultLadder
                    area.assaultLadder[0] = area.assembledInvaders.pop() || null;
                }
            }, (ladderLength - i) * delayBetweenIterations);
        }
    });
};