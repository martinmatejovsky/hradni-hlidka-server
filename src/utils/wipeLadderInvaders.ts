import { BattleZone, PlayerData, Settings, WeaponType } from '../constants/customTypes';
import { evaluateWeaponAbility } from './evaluateWeaponAbility';
import { weaponHit } from './weaponHit';
import { shuffleArray } from './shuffleArray.js';

interface GuardianStrength extends PlayerData {
    guardianStrength?: number;
}

export const wipeLadderInvaders = (zones: BattleZone[], players: PlayerData[], settings: Settings): void => {
    zones.forEach((zone: BattleZone): void => {
        const invadersOnLadder = [...zone.invaders].filter((invader) => invader.ladderStep !== null);
        if (invadersOnLadder.length === 0) return;

        const guardiansCloseCombatInZone: PlayerData[] = players
            .filter((p) => zone.guardians.includes(p.key))
            .filter((p) => {
                return evaluateWeaponAbility(p.weaponType).canDefeatInvaders;
            });

        if (guardiansCloseCombatInZone.length === 0) return;

        // Zamíchej obránce, protože chci umožnit obráncům sbírat statistiky zabitých a nevím, jak jinak spravedlivě
        // dělit zkušenosti mezi obránce, než že se budou k pořadí na úder dostávat náhodně.
        // Aby hra byla těžší, tak sekerníci, kteří umí rozbíjet štíty, budou vyhodnoceni jako poslední; kopiníci
        // jako první.
        const guardiansWithSword: GuardianStrength[] = guardiansCloseCombatInZone.filter(
            (g) => g.weaponType === WeaponType.SWORD,
        );
        const guardiansWithAxe = guardiansCloseCombatInZone.filter((g) => g.weaponType === WeaponType.AXE);

        shuffleArray(guardiansWithSword);
        shuffleArray(guardiansWithAxe);

        const allDefendersAgainstCaptain = players.filter((player) => player.weaponType === WeaponType.SWORD);
        const allDefendersAreInZone = allDefendersAgainstCaptain.every((player) => player.insideZone === zone.key);

        invadersOnLadder.forEach((invader, invaderIndex) => {
            weaponHit.swordHit(
                guardiansWithSword,
                invader,
                zone,
                invaderIndex,
                invadersOnLadder,
                allDefendersAreInZone,
                settings,
            );
            weaponHit.axeHit(guardiansWithAxe, invader, zone, invaderIndex, invadersOnLadder);
        });
    });
};
