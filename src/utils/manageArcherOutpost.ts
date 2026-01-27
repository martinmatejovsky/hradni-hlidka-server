import { BattleZone, ArcherPhases, PlayerData } from '../constants/customTypes.js';

const randomCooldown = (): number => Math.floor(Math.random() * 3) + 1;
const randomOrientation = () => ({
    horizontal: Math.round(Math.random() * 360), // alpha
    vertical: Math.round(100 + Math.random() * 70), // beta limited to 100–170. Be wary to generate numbers too close to
    // horizontal angle of 90°. At that point and also close to it it balances around Alpha converging limit, extremely
    // delicate for any movement in Alpha angle and almost impossible to catch with real device at hand.
});

export default function manageArcherOutpost(zones: BattleZone[], players: PlayerData[]): void {
    // reset all players from arrow attack
    players.forEach((player: PlayerData): void => {
        player.underArrowAttack = false;
    });

    zones.forEach((zone: BattleZone): void => {
        const archers = zone.archers;

        switch (archers.phase) {
            case ArcherPhases.reloading:
                if (archers.phaseTimer > 0) {
                    archers.phaseTimer--;
                } else {
                    archers.phase = ArcherPhases.aiming;
                    archers.phaseTimer = 1;
                }
                break;

            case ArcherPhases.aiming:
                if (archers.phaseTimer > 0) {
                    archers.phaseTimer--;
                } else {
                    archers.phase = ArcherPhases.covered;
                    archers.phaseTimer = 1;

                    // Mark affected guardians as attacked
                    zone.guardians.forEach((playerId) => {
                        const player: PlayerData | undefined = players.find((p) => p.key === playerId);
                        if (player) {
                            player.underArrowAttack = true;
                            player.arrowDefendTarget = randomOrientation();
                        }
                    });
                }
                break;

            case ArcherPhases.covered:
                if (archers.phaseTimer > 0) {
                    archers.phaseTimer--;
                } else {
                    archers.phase = ArcherPhases.reloading;
                    archers.phaseTimer = randomCooldown();
                }
                break;
        }
    });
}
