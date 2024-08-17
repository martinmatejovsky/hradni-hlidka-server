import type {BattleZone, GameInstance, InvaderIncrementID} from "../constants/customTypes";
import {wipeLadderInvaders} from "./wipeLadderInvaders";
import {moveInvadersOnLadder} from "./moveInvadersOnLadder";
import {checkAnyAreaConquered} from "./checkAnyAreaConquered";
import {assembleInvaders} from "./assembleInvaders";

export const runAttack = (gameInstance: GameInstance, assaultStrength: number, assemblyCountdown: number, incrementingInvaderId: InvaderIncrementID) => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    // evaluate winning conditions - no attacker left on ladders or in assembly area
    // if (???) {
    //
    // }

    // assemble new wave of attackers
    assembleInvaders(gameInstance, assaultStrength, assemblyCountdown, incrementingInvaderId);

    // calculate damage done by guardians and remove attackers from ladders
    wipeLadderInvaders(battleZones);

    // move attackers up the ladder
    moveInvadersOnLadder(gameInstance);

    // check if any attacker reached the top
    checkAnyAreaConquered(gameInstance);
}
