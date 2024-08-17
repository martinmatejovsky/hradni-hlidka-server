import type {BattleZone} from "../constants/customTypes";

export const wipeLadderInvaders = (zones: BattleZone[]): void => {
    zones.forEach((zone: BattleZone): void => {
        // make a concatenation of all guardians strength and save it to variable "strength":
        let defendersStrength = zone.guardians.reduce((total, player) => total + player.strength, 0);
        let invadersOnLadder = zone.invaders.filter(invader => invader.ladderStep !== null);

        if (invadersOnLadder.length > 0) {
            invadersOnLadder.forEach(invader => {
                const damageStrength = Math.min(defendersStrength, invader.health);

                // Deal damage to invader
                invader.health -= damageStrength;

                // Remove invader if health drops to 0
                if (invader.health <= 0) {
                    // remove invader from zone.invaders array
                    const invaderIndex = zone.invaders.indexOf(invader);
                    zone.invaders.splice(invaderIndex, 1);
                }

                // Reduce defenders strength by the damage dealt
                defendersStrength -= damageStrength;
            })
        }
    });
}
