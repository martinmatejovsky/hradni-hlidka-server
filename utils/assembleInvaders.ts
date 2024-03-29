import type { BattleZone, InvaderType, Invader } from "../constants/customTypes";
import {LADDER_POSITIONS} from "../constants/projectConstants";

export const assembleInvaders = (battleZones: BattleZone[]): BattleZone[] => {
    for (let i = 0; i < battleZones.length; i++) {
        // create ladders
        battleZones[i].assaultLadder = new Array(LADDER_POSITIONS).fill(null);

        // create waiting invaders
        if (battleZones[i].assembledInvaders.length === 0) {
            const randomInvadersAmount = Math.floor(Math.random() * 4) + 1;
            for (let j = 0; j < randomInvadersAmount; j++) {
                battleZones[i].assembledInvaders.push({
                    type: "normal" as InvaderType,
                    health: 2,
                } as Invader)
            }
        }
    }

    return battleZones;
}