import type {BattleZone, GameInstance} from "../constants/customTypes";

export const moveInvadersOnLadder = (gameInstance: GameInstance): void => {
    const zones = gameInstance.battleZones;
    const ladderLength = gameInstance.ladderLength;
    const delayBetweenIterations = Math.floor(gameInstance.gameTempo / (ladderLength * 2));

    zones.forEach((area: BattleZone): void => {
        let ladder = area.assaultLadder.content

        for (let i = ladderLength - 1; i >= 0; i--) {
            // Adjust the delay based on the iteration index
            setTimeout(() => {
                if (i > 0) {
                    ladder[i] = ladder[i - 1];
                    ladder[i - 1] = null;
                }

                // last iteration of the inner loop in ladder
                else {
                    // After the last iteration, update the first position in assaultLadder
                    ladder[0] = area.assembledInvaders.pop() || null;
                }
            }, (ladderLength - i) * delayBetweenIterations);
        }
    });
};
