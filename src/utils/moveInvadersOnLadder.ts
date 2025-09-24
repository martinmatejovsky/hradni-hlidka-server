import type { BattleZone } from '../constants/customTypes';
import { GameSession } from './gameSessionClass.js';

export const moveInvadersOnLadder = (gameInstance: GameSession): void => {
    const zones = gameInstance.battleZones;

    zones.forEach((zone: BattleZone): void => {
        let assembledInvaders = zone.invaders.filter((invader) => typeof invader.assemblyArea === 'number');
        let climbingInvaders = zone.invaders.filter((invader) => typeof invader.ladderStep === 'number');

        if (climbingInvaders.length > 0) {
            for (let i = climbingInvaders.length - 1; i >= 0; i--) {
                if (climbingInvaders[i].ladderStep !== null) {
                    climbingInvaders[i].ladderStep! += 1;
                }
            }
        }

        // Přidání nového invadera z assembly area po přesunu všech existujících invaderů, ale jen pokud uplynul assebbly countdown
        if (zone.assemblyCountdown > 0) {
            zone.assemblyCountdown -= 1;
        } else if (assembledInvaders.length > 0) {
            const newInvader = assembledInvaders.shift();
            if (newInvader) {
                newInvader.assemblyArea = null;
                newInvader.ladderStep = 0;
            }

            assembledInvaders.forEach((invader) => {
                if (invader.assemblyArea !== null) {
                    invader.assemblyArea -= 1;
                }
            });
        }
    });
};
