import type {BattleZone, InvaderType, Invader, GameInstance} from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance): BattleZone[] => {
    let battleZones: BattleZone[] = gameInstance.battleZones;
    let invadersCumulativeId = 1;

    battleZones.forEach(zone => {
        // create waiting invaders
        if (zone.invaders.every(invader => invader.assembleArea === null)) {
            const randomInvadersAmount = Math.floor(Math.random() * 4) + 1;

            for (let i = 0; i < randomInvadersAmount; i++) {
                zone.invaders.push({
                    id: invadersCumulativeId++,
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
