import type {BattleZone, GameInstance} from "../constants/customTypes";
import {wipeLadderInvaders} from "./wipeLadderInvaders";
import {moveInvadersOnLadder} from "./moveInvadersOnLadder";
import {checkAnyAreaConquered} from "./checkAnyAreaConquered";

export const runAttack = (gameInstance: GameInstance) => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    // evaluate winning conditions - no attacker left on ladders or in assembly area
    // if (???) {
    //
    // }

    // calculate damage done by guardians and remove attackers from ladders
    wipeLadderInvaders(battleZones);

    // move attackers up the ladder
    moveInvadersOnLadder(gameInstance);

    // check if any attacker reached the top
    checkAnyAreaConquered(gameInstance);
}
