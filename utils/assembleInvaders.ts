import type {BattleZone, InvaderType, Invader, GameInstance} from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance): BattleZone[] => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    for (let i = 0; i < battleZones.length; i++) {
        // create ladders
        battleZones[i].assaultLadder = new Array(gameInstance.ladderLength).fill(null);

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