import { BattleZone, Invader, PlayerData, Settings } from '../constants/customTypes';

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
        while (swordsmen.length > 0 && invader.health > 0) {
            const guardian = swordsmen[0];

            // Captain je zranitelný šermířem jen pokud všichni šermíři jsou v zóně
            if (invader.type === 'captain' && !allDefendersAreInZone) return;

            let guardianStrength = guardian.strength;
            if (guardian.perks.woodenWeapon) {
                guardianStrength = Math.ceil(guardianStrength * 0.5);
            }
            if (invader.type === 'shielded') {
                guardianStrength = Math.max(Math.ceil(guardianStrength * 0.5), 1);
            }
            if (guardian.perks.sharpSword > 0) {
                guardianStrength += settings.perkSharpSwordBonus;
                guardian.perks.sharpSword -= 1;
            }

            while (invader && guardianStrength >= invader.health) {
                guardianStrength -= invader.health;
                invader.health = 0;
                guardian.killScore.kills += 1;

                const ladderInvaderIndex = zone.invaders.indexOf(invader);
                zone.invaders.splice(ladderInvaderIndex, 1);
                invadersOnLadder.splice(invaderIndex, 1);
                invader = invadersOnLadder[invaderIndex];
            }

            if (!invader) break;
            if (guardianStrength > 0) {
                invader.health -= guardianStrength;
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
        while (axemen.length > 0 && invader.health > 0) {
            const guardian = axemen[0];

            let guardianStrength = guardian.strength;

            if (guardian.perks.woodenWeapon) {
                guardianStrength = Math.ceil(guardianStrength * 0.5);
            }

            // focus first on shielded invaders
            for (let inv of invadersOnLadder) {
                if (inv.type === 'shielded') {
                    if (guardianStrength >= inv.feature.shieldEndurance) {
                        guardianStrength -= inv.feature.shieldEndurance;
                        guardian.killScore.brokenShields += 1;
                        inv.feature.shieldEndurance = 0;
                        inv.type = 'regular';
                    }

                    if (guardianStrength > 0) {
                        inv.feature.shieldEndurance -= guardianStrength;
                        guardianStrength = 0;
                        break;
                    } else break;
                }
            }

            // if there is still some strength left, attack on
            while (invader && guardianStrength >= invader.health) {
                guardianStrength -= invader.health;
                invader.health = 0;
                guardian.killScore.kills += 1;

                const ladderInvaderIndex = zone.invaders.indexOf(invader);
                zone.invaders.splice(ladderInvaderIndex, 1);
                invadersOnLadder.splice(invaderIndex, 1);
                invader = invadersOnLadder[invaderIndex];
            }

            if (!invader) break;
            if (guardianStrength > 0) {
                invader.health -= guardianStrength;
            }

            axemen.shift();
        }
    },
};
