import type {
    BattleZone,
    GameInstance,
    Settings,
    Stats,
} from "../constants/customTypes";

import { Invader } from "../constants/customTypes";

export const assembleInvaders = (gameInstance: GameInstance, settings: Settings, stats: Stats): BattleZone[] => {
    let battleZones: BattleZone[] = gameInstance.battleZones;
    let amountOfPlayers = gameInstance.players.length;

    battleZones.forEach(zone => {
        // create waiting invaders if assemblyArea is empty.
        // Mind that max number of invaders must not exceed available assembly areas in polygons[].assemblyArea. The amount
        // of invaders can exceed initial max number assaultWaveVolume, because waves get stronger with each incrementingWaveId.
        if (zone.invaders.every(invader => invader.assemblyArea === null)) {
            // in case of last wave, just reset cooldown and send invaders immediately
            if (stats.incrementingWaveId >= settings.gameLength) {
                zone.waveCooldown = 0;
            }

            // did enough time pass since last wave?
            if (zone.waveCooldown > 0) {
                zone.waveCooldown -= 1;
                return;
            }

            // each wave has a random amount of invaders, increased with each waveId/2.
            const randomInvadersAmount = Math.floor(Math.random() * 4) + (settings.assaultWaveVolume - 3) + Math.floor(stats.incrementingWaveId / 3);
            // in first wave all zones are invaded. So to make it easier for players, we do not add for these first attacks any captains.
            const amountOfZones = gameInstance.battleZones.length;

            for (let i = 0; i < randomInvadersAmount; i++) {
                let newInvader: Invader;

                if (stats.incrementingWaveId > amountOfZones && Math.random() < 1 / (randomInvadersAmount * 2)) {
                    newInvader = Invader.createCaptainInvader(stats.incrementingInvaderId, i, amountOfPlayers);
                } else {
                    newInvader = Invader.createNormalInvader(stats.incrementingInvaderId, i, amountOfPlayers);
                }

                zone.invaders.push(newInvader)

                stats.incrementingInvaderId++
            }

            stats.incrementingWaveId++

            zone.assemblyCountdown = settings.assemblyCountdown;
            zone.waveCooldown = settings.wavesMinDelay + Math.floor(Math.random() * 5);
        }
    })

    return battleZones;
}
