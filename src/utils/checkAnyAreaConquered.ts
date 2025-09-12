import type {BattleZone, GameInstance} from "../constants/customTypes";
import {GameState} from "../constants/customTypes"

export const checkAnyAreaConquered = (gameInstance: GameInstance): void => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    battleZones.forEach((zone: BattleZone): void => {
        if (zone.invaders.some(invader => typeof invader.ladderStep === "number" && invader.ladderStep >= gameInstance.ladderLength)) {
            zone.conquered = true;
            gameInstance.gameState = GameState.Lost;
        }
    });
};
