import type {
    BattleZone,
    InvaderType,
    Invader,
    GameInstance,
    Constants,
    Stats,
} from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance, constants: Constants, stats: Stats): BattleZone[] => {
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

            const randomInvadersAmount = Math.floor(Math.random() * 4) + (constants.assaultWaveVolume - 3);

            for (let i = 0; i < randomInvadersAmount; i++) {
                zone.invaders.push({
                    id: stats.incrementingInvaderId,
                    type: "normal" as InvaderType,
                    health: 2,
                    assemblyArea: i,
                    ladderStep: null,
                } as Invader)

                stats.incrementingInvaderId++
            }

            zone.assemblyCountdown = constants.assemblyCountdown;
            zone.waveCooldown = constants.wavesMinDelay + Math.floor(Math.random() * 5);
        }
    })

    return battleZones;
}
