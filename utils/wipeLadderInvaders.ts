import type {BattleZone, PlayerData} from "../constants/customTypes";

export const wipeLadderInvaders = (zones: BattleZone[], players: PlayerData[]): void => {
    zones.forEach((zone: BattleZone): void => {
        // make a concatenation of all guardians strength and save it to variable "strength":
        let defendersCombinedStrength = zone.guardians.reduce((total, player) => total + player.strength, 0);
        let invadersOnLadder = zone.invaders.filter(invader => invader.ladderStep !== null);
        const allDefendersAreInZone = players.every(player => player.insideZone === zone.key);

        if (invadersOnLadder.length > 0) {
            invadersOnLadder.forEach(invader => {
                if (invader.type === "captain" && !allDefendersAreInZone) {
                    return;
                }

                const damageStrength = Math.min(defendersCombinedStrength, invader.health);

                // Deal damage to invader
                invader.health -= damageStrength;

                // Remove invader if health drops to 0
                if (invader.health <= 0) {
                    // remove invader from zone.invaders array
                    const invaderIndex = zone.invaders.indexOf(invader);
                    zone.invaders.splice(invaderIndex, 1);
                }

                // Reduce defenders strength by the damage dealt
                defendersCombinedStrength -= damageStrength;
            })
        }
    });
}
