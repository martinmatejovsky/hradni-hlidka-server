import type { BattleZone, Settings, GameInstance, Stats } from '../constants/customTypes';
import { wipeLadderInvaders } from './wipeLadderInvaders';
import { moveInvadersOnLadder } from './moveInvadersOnLadder';
import { checkAnyAreaConquered } from './checkAnyAreaConquered';
import { assembleInvaders } from './assembleInvaders';
import { evaluateSuccessfulDefend } from './evaluateSuccessfulDefend';
import { handleBoilingOil } from './handleBoilingOil';

export const runAttack = (gameInstance: GameInstance, settings: Settings, stats: Stats) => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    if (stats.incrementingWaveId > settings.gameLength) {
        evaluateSuccessfulDefend(gameInstance);
    } else {
        assembleInvaders(gameInstance, settings, stats);
    }

    // calculate damage done by guardians and remove attackers from ladders
    wipeLadderInvaders(battleZones, gameInstance.players, settings);

    // move attackers up the ladder
    moveInvadersOnLadder(gameInstance);

    // check if any attacker reached the top
    checkAnyAreaConquered(gameInstance);

    handleBoilingOil(gameInstance);
};
