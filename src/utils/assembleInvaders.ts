import { BattleZone, Settings, Stats } from '../constants/customTypes';

import { Invader } from '../constants/customTypes';
import { GameSession } from './gameSessionClass.js';

export const assembleInvaders = (gameInstance: GameSession, settings: Settings, stats: Stats): BattleZone[] => {
    let battleZones: BattleZone[] = gameInstance.battleZones;
    let amountOfPlayers = gameInstance.players.length;

    battleZones.forEach((zone) => {
        // create waiting invaders if assemblyArea is empty.
        // Mind that max number of invaders must not exceed available assembly areas in polygons[].assemblyArea. The amount
        // of invaders could potentially exceed initial max number assaultWaveVolume, because waves get stronger with each incrementingWaveId.
        if (zone.invaders.every((invader) => invader.assemblyArea === null)) {
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
            const randomInvadersAmount =
                Math.floor(Math.random() * 4) +
                (settings.assaultWaveVolume - 3) +
                Math.floor(stats.incrementingWaveId / 3);
            // in first wave all zones are invaded. So to make it easier for players, we do not add for these first attacks any captains.
            const amountOfZones = gameInstance.battleZones.length;

            for (let i = 0; i < randomInvadersAmount; i++) {
                let newInvader: Invader;
                const randomInvaderType = Math.floor(Math.random() * 100) + 1;

                // 0 - 9 = captain, 10 - 34 = shielded, 35 - 100 = regular
                if (stats.incrementingWaveId > amountOfZones && randomInvaderType < 10) {
                    newInvader = new Invader(stats.incrementingInvaderId, 'captain', i, amountOfPlayers);
                } else if (stats.axesInGame === 0 ? randomInvaderType < 20 : randomInvaderType < 35) {
                    newInvader = new Invader(
                        stats.incrementingInvaderId,
                        'shielded',
                        i,
                        amountOfPlayers,
                        stats.axesInGame,
                    );
                } else {
                    newInvader = new Invader(stats.incrementingInvaderId, 'regular', i, amountOfPlayers);
                }

                zone.invaders.push(newInvader);

                stats.incrementingInvaderId++;
            }

            stats.incrementingWaveId++;

            zone.assemblyCountdown = settings.assemblyCountdown;
            zone.waveCooldown = settings.wavesMinDelay + Math.floor(Math.random() * 5);
        }
    });

    return battleZones;
};
