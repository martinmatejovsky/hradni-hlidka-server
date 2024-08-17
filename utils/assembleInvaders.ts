import type {BattleZone, InvaderType, Invader, GameInstance, InvaderIncrementID} from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance, assaultStrength: number, assemblyCountdown: number, incrementingInvaderId: InvaderIncrementID): BattleZone[] => {
    let battleZones: BattleZone[] = gameInstance.battleZones;

    battleZones.forEach(zone => {
        // create waiting invaders.
        // Mind that max number of invaders must not exceed available assembly areas in polygons[].assemblyArea
        if (zone.invaders.every(invader => invader.assemblyArea === null)) {
            // did enough time pass since last wave?
            if (zone.waveCooldown > 0) {
                zone.waveCooldown -= 1;
                return;
            }

            const randomInvadersAmount = Math.floor(Math.random() * 4) + (assaultStrength - 3);

            for (let i = 0; i < randomInvadersAmount; i++) {
                zone.invaders.push({
                    id: incrementingInvaderId.value,
                    type: "normal" as InvaderType,
                    health: 2,
                    assemblyArea: i,
                    ladderStep: null,
                } as Invader)

                incrementingInvaderId.value++
            }

            zone.assemblyCountdown = assemblyCountdown;
            zone.waveCooldown = assemblyCountdown + Math.floor(Math.random() * 5);
        }
    })

    return battleZones;
}
