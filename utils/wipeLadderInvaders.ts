import type {BattleZone} from "../constants/customTypes";

export const wipeLadderInvaders = (zones: BattleZone[]): void => {
    zones.forEach((zone: BattleZone): void => {
        let defendersStrength = zone.guardians.length;
        const ladder = zone.assaultLadder.content;
        let invadersOnLadder = zone.invaders.filter(invader => invader.ladderStep !== null);

        if (invadersOnLadder.length > 0) {
            // write me function: if an invader is on ladder position 1 or more, than hit it according to defenders strength and lower defenders strength
            invadersOnLadder.forEach(invader => {
                if (invader.ladderStep! > 0) {
                    const damageStrength = Math.min(defendersStrength, invader.health);

                    // Deal damage to invader
                    invader.health -= damageStrength;

                    // Remove invader if health drops to 0
                    if (invader.health <= 0) {
                        ladder[invader.ladderStep!] = null;

                        // remove invader from zone.invaders array
                        const invaderIndex = zone.invaders.indexOf(invader);
                        zone.invaders.splice(invaderIndex, 1);
                    }

                    // Reduce defenders strength by the damage dealt
                    defendersStrength -= damageStrength;
                }
            })
        }
    });
}
