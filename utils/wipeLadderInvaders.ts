import type {BattleZone} from "../constants/customTypes";

export const wipeLadderInvaders = (zones: BattleZone[]): void => {
    zones.forEach((zone: BattleZone): void => {
        let defendersStrength = zone.guardians.length;

        // hit only invaders that are at least at second position of the ladder so that it is not as easy
        for (let i = zone.assaultLadder.length - 1; i >= 1 && defendersStrength > 0; i--) {
            const invader = zone.assaultLadder[i];

            if (invader !== null) {
                const damageStrength = Math.min(defendersStrength, invader.health);

                // Deal damage to invader
                invader.health -= damageStrength;

                // Remove invader if health drops to 0
                if (invader.health <= 0) {
                    zone.assaultLadder[i] = null;
                }

                // Reduce defenders strength by the damage dealt
                defendersStrength -= damageStrength;
            }
        }
    });
}