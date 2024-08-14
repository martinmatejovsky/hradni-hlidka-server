import type {BattleZone, InvaderType, Invader, GameInstance} from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance): BattleZone[] => {
    let battleZones: BattleZone[] = gameInstance.battleZones;
    let invadersCumulativeId = 1;

    battleZones.forEach(zone => {
        // create waiting invaders.
        // Mind that max number of invaders must not exceed available assembly areas in polygons[].assemblyArea
        if (zone.invaders.every(invader => invader.assemblyArea === null)) {
            const randomInvadersAmount = Math.floor(Math.random() * 4) + 1;

            for (let i = 0; i < randomInvadersAmount; i++) {
                zone.invaders.push({
                    id: invadersCumulativeId++,
                    type: "normal" as InvaderType,
                    health: 2,
                    assemblyArea: i,
                    ladderStep: null,
                } as Invader)
            }
        }
    })

    return battleZones;
}
