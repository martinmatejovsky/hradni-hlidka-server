import { BattleZone, PlayerData, Settings, WeaponType } from '../constants/customTypes';
import { evaluateWeaponAbility } from './evaluateWeaponAbility.js';

interface GuardianStrength extends PlayerData {
    guardianStrength?: number;
}

export const wipeLadderInvaders = (zones: BattleZone[], players: PlayerData[], settings: Settings): void => {
    zones.forEach((zone: BattleZone): void => {
        const guardiansCloseCombatInZone: PlayerData[] = players
            .filter((p) => zone.guardians.includes(p.key))
            .filter((p) => {
                return evaluateWeaponAbility(p.weaponType).canDefeatInvaders;
            });

        // Zamíchej obránce, protože chci umožnit obráncům sbírat statistiky zabitých a nevím, jak jinak spravedlivě
        // dělit zkušenosti mezi obránce, než že se budou k pořadí na úder dostávat náhodně.
        // Aby hra byla těžší, tak sekerníci, kteří umí rozbíjet štíty, budou vyhodnoceni jako poslední; kopiníci
        // jako první.
        const guardiansWithSword: GuardianStrength[] = guardiansCloseCombatInZone
            .filter((g) => g.weaponType === WeaponType.SWORD)
            .sort(() => Math.random() - 0.5);
        const guardiansWithAxe = guardiansCloseCombatInZone
            .filter((g) => g.weaponType === WeaponType.AXE)
            .sort(() => Math.random() - 0.5);

        let invadersOnLadder = [...zone.invaders].filter((invader) => invader.ladderStep !== null);
        let allDefendersAgainstCaptain = players.filter((player) => player.weaponType === WeaponType.SWORD);
        const allDefendersAreInZone = allDefendersAgainstCaptain.every((player) => player.insideZone === zone.key);

        if (invadersOnLadder.length > 0) {
            invadersOnLadder.forEach((invader, invaderIndex) => {
                const invaderIsCaptain = invader.type === 'captain';

                while (guardiansWithSword.length > 0 && invader.health > 0) {
                    // Captain can be harmed only if all sword defenders are in the zone
                    if (invaderIsCaptain && !allDefendersAreInZone) return;

                    let guardian = guardiansWithSword[0];

                    let guardianStrength = guardian.perks.woodenWeapon
                        ? Math.ceil(guardian.strength * 0.5)
                        : guardian.strength;

                    if (guardian.perks.sharpSword > 0) {
                        guardianStrength += settings.perkSharpSwordBonus;
                        guardian.perks.sharpSword -= 1;
                    }

                    // Aplikuj sílu obránce na nájezdníka
                    while (invader && guardianStrength >= invader.health) {
                        guardianStrength -= invader.health;
                        invader.health = 0;
                        guardian.killScore += 1;
                        const ladderInvaderIndex = zone.invaders.indexOf(invader);
                        zone.invaders.splice(ladderInvaderIndex, 1);
                        invadersOnLadder.splice(invaderIndex, 1);
                        invader = invadersOnLadder[invaderIndex];
                    }

                    if (invader && guardianStrength > 0) {
                        invader.health -= guardianStrength;
                    }

                    // Síla spotřebována, přejít na dalšího obránce
                    guardiansWithSword.shift();
                }

                while (guardiansWithAxe.length > 0 && invader.health > 0) {
                    let guardian = guardiansWithAxe[0];

                    let guardianStrength =
                        guardian.perks.woodenWeapon || invaderIsCaptain
                            ? Math.ceil(guardian.strength * 0.5)
                            : guardian.strength;

                    // Aplikuj sílu obránce na nájezdníka
                    while (invader && guardianStrength >= invader.health) {
                        guardianStrength -= invader.health;
                        invader.health = 0;
                        guardian.killScore += 1;
                        const ladderInvaderIndex = zone.invaders.indexOf(invader);
                        zone.invaders.splice(ladderInvaderIndex, 1);
                        invadersOnLadder.splice(invaderIndex, 1);
                        invader = invadersOnLadder[invaderIndex];
                    }

                    if (invader && guardianStrength > 0) {
                        invader.health -= guardianStrength;
                    }

                    // Síla spotřebována, přejít na dalšího obránce
                    guardiansWithSword.shift();
                }
            });
        }
    });
};
