import type {BattleZone, PlayerData} from "../constants/customTypes";

export const wipeLadderInvaders = (zones: BattleZone[], players: PlayerData[]): void => {
    zones.forEach((zone: BattleZone): void => {
        // Zamíchej obránce, protože chci umožnit obráncům sbírat statistiky zabitých a nevím, jak jinak spravedlivě
        // dělit zkušenosti mezi obránce, než se budou k pořadí na úder dostávat náhodně
        let shuffledGuardians = [...zone.guardians].sort(() => Math.random() - 0.5);
        let invadersOnLadder = zone.invaders.filter(invader => invader.ladderStep !== null);
        const allDefendersAreInZone = players.every(player => player.insideZone === zone.key);

        if (invadersOnLadder.length > 0) {
            invadersOnLadder.forEach((invader, invaderIndex) => {
                if (invader.type === "captain" && !allDefendersAreInZone) {
                    return;
                }

                while (shuffledGuardians.length > 0 && invader.health > 0) {
                    let guardian = shuffledGuardians[0];
                    let guardianStrength = guardian.strength;

                    console.log('=======================')
                    console.log('hitting is', guardian.name, ', strength total', guardianStrength)

                    // Pokud má guardian perk smithyUpgrade, zvýší se jeho síla a opotřebuje se výdrž perku
                    if (guardian.perks.smithyUpgrade > 0) {
                        guardianStrength += 1;
                        guardian.perks.smithyUpgrade -= 1;
                    }

                    // Aplikuj sílu obránce na nájezdníka
                    if (guardianStrength >= invader.health) {
                        guardianStrength -= invader.health;
                        invader.health = 0;

                        const ladderInvaderIndex = zone.invaders.indexOf(invader);
                        zone.invaders.splice(ladderInvaderIndex, 1);
                        invadersOnLadder.splice(invaderIndex, 1);

                        console.log('invader killed')

                        // Pokud zbyla nějaká síla, použij ji na dalšího nájezdníka
                        if (guardianStrength > 0 && invaderIndex + 1 < invadersOnLadder.length) {
                            console.log('hitting next invader')
                            invader = invadersOnLadder[invaderIndex + 1];
                            invaderIndex++;

                        } else {
                            shuffledGuardians.shift(); // Síla spotřebována, odstranit obránce
                            console.log('guardian', guardian.name, 'is out of strength')
                        }
                    } else {
                        // Pokud obráncova síla nestačí k zabití nájezdníka
                        invader.health -= guardianStrength;
                        shuffledGuardians.shift(); // Síla spotřebována, odstranit obránce
                        console.log('guardian', guardian.name, 'is out of strength')
                    }
                }
            })
        }
    });
}
