import type {BattleZone} from "../constants/customTypes";
import {GAME_TEMPO, LADDER_POSITIONS} from "../constants/projectConstants";

const delayBetweenIterations = Math.floor(GAME_TEMPO / (LADDER_POSITIONS * 2));

export const moveInvadersOnLadder = (zones: BattleZone[]): void => {
    zones.forEach((area: BattleZone): void => {
        for (let i = LADDER_POSITIONS - 1; i >= 0; i--) {
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
            }, (LADDER_POSITIONS - i) * delayBetweenIterations);
        }
    });
};