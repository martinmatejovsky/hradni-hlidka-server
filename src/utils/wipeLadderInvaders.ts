import type {BattleZone, PlayerData, Settings} from "../constants/customTypes";
import {evaluateWeaponAbility} from "./evaluateWeaponAbility.js";

export const wipeLadderInvaders = (zones: BattleZone[], players: PlayerData[], settings: Settings): void => {
    zones.forEach((zone: BattleZone): void => {
        // Zamíchej obránce, protože chci umožnit obráncům sbírat statistiky zabitých a nevím, jak jinak spravedlivě
        // dělit zkušenosti mezi obránce, než že se budou k pořadí na úder dostávat náhodně.
        // První ale budou ti, kteří mají dřevěný meč, aby ti s ocelovým mečem jim vše nevyžrali a nezablokovali levelování pro dřevěné meče.
        const guardiansInZone: PlayerData[] = players.filter(p => zone.guardians.includes(p.key));
        let guardiansWithWoodenSword = guardiansInZone.filter(g => g.perks.woodenSword).sort(() => Math.random() - 0.5);
        let guardiansWithSteelSword = guardiansInZone.filter(g => !g.perks.woodenSword).sort(() => Math.random() - 0.5);

        let shuffledGuardians = [...guardiansWithWoodenSword, ...guardiansWithSteelSword];
        let invadersOnLadder = [...zone.invaders].filter(invader => invader.ladderStep !== null);
        let guardiansAvailableToFight = players.filter(player => evaluateWeaponAbility(player.weaponType))
        const allDefendersAreInZone = guardiansAvailableToFight.every(player => player.insideZone === zone.key);

        console.log(shuffledGuardians)

        if (invadersOnLadder.length > 0) {
            const usedSmithyPerk = new Map<string, boolean>(); // Temporary state to track used perks

            invadersOnLadder.forEach((invader, invaderIndex) => {
                if (invader.type === "captain" && !allDefendersAreInZone) {
                    return;
                }

                while (shuffledGuardians.length > 0 && invader.health > 0) {
                    let guardian = shuffledGuardians[0] ;

                    // if guardian has no ability to defeat invaders, skip him
                    if (!guardian || !evaluateWeaponAbility(guardian.weaponType).canDefeatInvaders) return

                    let guardianStrength = guardian.strength;

                    // Pokud má guardian zatim jen drevený meč, ma slabsi uder
                    if (guardian.perks.woodenSword) {
                        guardianStrength = Math.floor(guardianStrength * 0.5);
                    }

                    // Pokud má guardian perk sharpSword, zvýší se jeho síla a opotřebuje se výdrž perku
                    if (guardian.perks.sharpSword > 0 && !usedSmithyPerk.get(guardian.key)) {
                        guardianStrength += settings.perkSharpSwordBonus;
                        guardian.perks.sharpSword -= 1;
                        usedSmithyPerk.set(guardian.key, true);
                    }

                    // Aplikuj sílu obránce na nájezdníka
                    if (guardianStrength >= invader.health) {
                        guardianStrength -= invader.health;
                        invader.health = 0;
                        guardian.killScore += 1;

                        const ladderInvaderIndex = zone.invaders.indexOf(invader);
                        zone.invaders.splice(ladderInvaderIndex, 1);
                        invadersOnLadder.splice(invaderIndex, 1);

                        // Pokud zbyla nějaká síla, použij ji na dalšího nájezdníka
                        if (guardianStrength > 0 && invaderIndex < invadersOnLadder.length) {
                            invader = invadersOnLadder[invaderIndex];

                        } else {
                            shuffledGuardians.shift(); // Síla spotřebována, přejít na dalšího obránce
                        }
                    } else {
                        // Pokud obráncova síla nestačí k zabití nájezdníka
                        invader.health -= guardianStrength;
                        shuffledGuardians.shift(); // Síla spotřebována, přejít na dalšího obránce
                    }
                }
            })
        }
    });
}
