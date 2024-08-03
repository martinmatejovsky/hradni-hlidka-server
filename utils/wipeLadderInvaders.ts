import type {BattleZone} from "../constants/customTypes";

export const wipeLadderInvaders = (zones: BattleZone[]): void => {
    zones.forEach((zone: BattleZone): void => {
        let defendersStrength = zone.guardians.length;
        const ladder = zone.assaultLadder.content;

        // hit only invaders that are at least at second position of the ladder so that it is not as easy
        for (let i = ladder.length - 1; i >= 1 && defendersStrength > 0; i--) {
            const invader = ladder[i];

            if (invader !== null) {
                const damageStrength = Math.min(defendersStrength, invader.health);

                // Deal damage to invader
                invader.health -= damageStrength;

                // Remove invader if health drops to 0
                if (invader.health <= 0) {
                    ladder[i] = null;
                }

                // Reduce defenders strength by the damage dealt
                defendersStrength -= damageStrength;
            }
        }
    });
}
