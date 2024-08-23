import type {BattleZone, Settings, GameInstance, Stats} from "../constants/customTypes";
import {wipeLadderInvaders} from "./wipeLadderInvaders";
import {moveInvadersOnLadder} from "./moveInvadersOnLadder";
import {checkAnyAreaConquered} from "./checkAnyAreaConquered";
import {assembleInvaders} from "./assembleInvaders";

export const runAttack = (gameInstance: GameInstance, settings: Settings, stats: Stats) => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    // evaluate winning conditions - no attacker left on ladders or in assembly area
    // if (???) {
    //
    // }

    // assemble new wave of attackers
    assembleInvaders(gameInstance, settings, stats);

    // calculate damage done by guardians and remove attackers from ladders
    wipeLadderInvaders(battleZones);

    // move attackers up the ladder
    moveInvadersOnLadder(gameInstance);

    // check if any attacker reached the top
    checkAnyAreaConquered(gameInstance);
}
