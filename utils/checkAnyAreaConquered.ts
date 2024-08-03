import type {BattleZone, GameInstance, GameState} from "../constants/customTypes";

export const checkAnyAreaConquered = (gameInstance: GameInstance): void => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    battleZones.forEach((zone: BattleZone): void => {
        if (zone.assaultLadder.content[gameInstance.ladderLength - 1] !== null) {
            zone.conquered = true;
            gameInstance.gameState = 'lost' as GameState;
        }
    });
};
