import type {
    BattleZone,
    InvaderType,
    Invader,
    GameInstance,
    Settings,
    Stats,
} from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance, settings: Settings, stats: Stats): BattleZone[] => {
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

            const randomInvadersAmount = Math.floor(Math.random() * 4) + (settings.assaultWaveVolume - 3);

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

            zone.assemblyCountdown = settings.assemblyCountdown;
            zone.waveCooldown = settings.wavesMinDelay + Math.floor(Math.random() * 5);
        }
    })

    return battleZones;
}
