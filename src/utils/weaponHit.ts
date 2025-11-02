import { BattleZone, experienceValue, Invader, PlayerData, Settings } from '../constants/customTypes';
import evaluateWeaponBroke from './evaluateWeaponBroke.js';

export const weaponHit = {
    swordHit: (
        swordsmen: PlayerData[],
        invader: Invader,
        zone: BattleZone,
        invaderIndex: number,
        invadersOnLadder: Invader[],
        allDefendersAreInZone: boolean,
        settings: Settings,
    ): void => {
        while (swordsmen.length > 0) {
            const guardian = swordsmen[0];

            // Captain je zranitelný šermířem jen pokud všichni šermíři jsou v zóně
            if (invader.type === 'captain' && !allDefendersAreInZone) return;

            let guardianStrength = guardian.strength;
            if (invader.type === 'shielded') guardianStrength = Math.ceil(guardianStrength * 0.5);
            if (guardian.perks.sharpSword > 0) {
                guardianStrength += settings.perkSharpSwordBonus;
                guardian.perks.sharpSword -= 1;
            }

            while (invader && guardianStrength >= invader.health) {
                guardianStrength -= invader.health;
                invader.health = 0;
                guardian.killScore.kills += 1;
                guardian.killScore.experience += experienceValue.invaderFinished;

                const ladderInvaderIndex = zone.invaders.indexOf(invader);
                zone.invaders.splice(ladderInvaderIndex, 1);
                invadersOnLadder.splice(invaderIndex, 1);
                invader = invadersOnLadder[invaderIndex];
            }

            if (!invader) break;
            if (guardianStrength > 0) {
                invader.health -= guardianStrength;
                guardian.killScore.experience += experienceValue.invaderDamaged;
            }

            swordsmen.shift();
        }
    },
    axeHit(
        axemen: PlayerData[],
        invader: Invader,
        zone: BattleZone,
        invaderIndex: number,
        invadersOnLadder: Invader[],
    ): void {
        while (axemen.length > 0) {
            const guardian = axemen[0];

            let guardianStrength = guardian.strength;

            // focus first on shielded invaders
            for (let inv of invadersOnLadder) {
                if (inv.type === 'shielded') {
                    if (guardianStrength >= inv.feature.shieldEndurance) {
                        guardianStrength -= inv.feature.shieldEndurance;
                        guardian.killScore.experience += experienceValue.invaderFinished;
                        guardian.killScore.brokenShields += 1;
                        inv.feature.shieldEndurance = 0;
                        inv.type = 'regular';
                    } else if (guardianStrength > 0) {
                        inv.feature.shieldEndurance -= guardianStrength;
                        guardianStrength = 0;
                        guardian.killScore.experience += experienceValue.invaderDamaged;
                        break;
                    } else break;
                }
            }

            // if there is still some strength left, attack on
            while (invader && guardianStrength >= invader.health) {
                guardianStrength -= invader.health;
                invader.health = 0;
                guardian.killScore.kills += 1;
                guardian.killScore.experience += experienceValue.invaderFinished;

                const ladderInvaderIndex = zone.invaders.indexOf(invader);
                zone.invaders.splice(ladderInvaderIndex, 1);
                invadersOnLadder.splice(invaderIndex, 1);
                invader = invadersOnLadder[invaderIndex];
            }

            evaluateWeaponBroke();

            if (guardianStrength > 0) {
                invader.health -= guardianStrength;
                guardian.killScore.experience += experienceValue.invaderDamaged;
            }

            axemen.shift();
        }
    },
    spearHit(spearmen: PlayerData[], zone: BattleZone, invadersOnLadder: Invader[], settings: Settings): void {
        if (!invadersOnLadder.length) return;
        if (invadersOnLadder[0].type === 'shielded') return;

        while (spearmen.length > 0 && invadersOnLadder.length > 0) {
            const guardian = spearmen[0];
            const hitDepth = settings.spearHitDepth;
            let helperIterator = 0;
            let topInvaderLadderStep = invadersOnLadder[0].ladderStep || 0;

            let guardianStrength = guardian.strength;

            for (let depth = 0; depth < hitDepth; depth++) {
                if (!invadersOnLadder[helperIterator]) break;

                if (
                    invadersOnLadder[helperIterator].ladderStep !== topInvaderLadderStep - depth ||
                    invadersOnLadder[helperIterator].type === 'shielded'
                )
                    return;

                if (invadersOnLadder[helperIterator].type === 'captain') {
                    invadersOnLadder[helperIterator].health -= Math.ceil(guardianStrength * 0.5);
                } else invadersOnLadder[helperIterator].health -= guardianStrength;

                if (invadersOnLadder[helperIterator].health <= 0) {
                    guardian.killScore.kills += 1;
                    guardian.killScore.experience += experienceValue.invaderFinished;

                    zone.invaders.splice(zone.invaders.indexOf(invadersOnLadder[helperIterator]), 1);
                    invadersOnLadder.splice(helperIterator, 1);
                } else {
                    guardian.killScore.experience += experienceValue.invaderDamaged;
                    helperIterator += 1;
                }
            }

            spearmen.shift();
        }
    },
};
