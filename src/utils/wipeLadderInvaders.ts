import type {BattleZone, PlayerData, Settings} from "../constants/customTypes";
import {evaluateWeaponAbility} from "./evaluateWeaponAbility.js";

export const wipeLadderInvaders = (zones: BattleZone[], players: PlayerData[], settings: Settings): void => {
    zones.forEach((zone: BattleZone): void => {
        // Zamíchej obránce, protože chci umožnit obráncům sbírat statistiky zabitých a nevím, jak jinak spravedlivě
        // dělit zkušenosti mezi obránce, než že se budou k pořadí na úder dostávat náhodně.
        // První ale budou ti, kteří mají dřevěný meč, aby ti s ocelovým mečem jim vše nevyžrali a nezablokovali levelování pro dřevěné meče.
        const guardiansCloseCombatInZone: PlayerData[] = players
            .filter(p => zone.guardians.includes(p.key))
            .filter(p => {
                return evaluateWeaponAbility(p.weaponType).canDefeatInvaders
            });
        let guardiansWithWoodenSword = guardiansCloseCombatInZone.filter(g => g.perks.woodenSword).sort(() => Math.random() - 0.5);
        let guardiansWithSteelSword = guardiansCloseCombatInZone.filter(g => !g.perks.woodenSword).sort(() => Math.random() - 0.5);

        let shuffledGuardians = [...guardiansWithWoodenSword, ...guardiansWithSteelSword];
        let invadersOnLadder = [...zone.invaders].filter(invader => invader.ladderStep !== null);
        let guardiansAvailableToFight = players.filter(player => evaluateWeaponAbility(player.weaponType).canDefeatInvaders);
        const allDefendersAreInZone = guardiansAvailableToFight.every(player => player.insideZone === zone.key);

        if (invadersOnLadder.length > 0) {
            invadersOnLadder.forEach((invader, invaderIndex) => {
                // Captain can be harmed only if all close-combat defenders are in the zone
                if (invader.type === "captain" && !allDefendersAreInZone) return;

                while (shuffledGuardians.length > 0 && invader.health > 0) {
                    let guardian = shuffledGuardians[0] ;

                    // if guardian has no ability to defeat invaders, skip him
                    if (!guardian || !evaluateWeaponAbility(guardian.weaponType).canDefeatInvaders) return

                    // Pokud má guardian zatim jen drevený meč, ma slabsi uder
                    let guardianStrength = guardian.perks.woodenSword ? Math.floor(guardian.strength * 0.5) : guardian.strength;

                    // Pokud má guardian perk sharpSword, zvýší se jeho síla a opotřebuje se výdrž perku
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
                    shuffledGuardians.shift();
                }
            })
        }
    });
}
