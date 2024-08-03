import type {BattleZone, InvaderType, Invader, GameInstance} from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance): BattleZone[] => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    battleZones.forEach(zone => {
        // create ladder fields
        zone.assaultLadder.content = new Array(gameInstance.ladderLength).fill(null);

        // create waiting invaders
        if (zone.invaders.every(invader => invader.assembleArea === null)) {
            const randomInvadersAmount = Math.floor(Math.random() * 4) + 1;

            for (let i = 0; i < randomInvadersAmount; i++) {
                zone.invaders.push({
                    type: "normal" as InvaderType,
                    health: 2,
                    assembleArea: i,
                    ladderStep: null,
                } as Invader)
            }
        }
    })

    return battleZones;
}
