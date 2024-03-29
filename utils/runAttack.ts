import type {BattleZone, GameInstance, Invader} from "../constants/customTypes";
import {wipeLadderInvaders} from "./wipeLadderInvaders";
import {moveInvadersOnLadder} from "./moveInvadersOnLadder";
import {checkAnyAreaConquered} from "./checkAnyAreaConquered";

export const runAttack = (gameInstance: GameInstance) => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    console.log('assaultLadder');
    battleZones.forEach((area: BattleZone): void => {
        area.assaultLadder.forEach((ladderField: Invader | null) => console.log(ladderField));
    });

    // evaluate winning conditions - no attacker left or in assembly area
    if (battleZones.every((area: BattleZone): boolean => area.assembledInvaders.length === 0
        && area.assaultLadder.every((ladderField: Invader | null) => ladderField === null)
    )) {
        gameInstance.gameState = 'won';
        return
    }

    // calculate damage done by guardians and remove attackers from ladders
    wipeLadderInvaders(battleZones);

    // move attackers up the ladder
    moveInvadersOnLadder(battleZones);

    // check if any attacker reached the top
    checkAnyAreaConquered(gameInstance);
}