import { BattleZone, ArcherPhases, PlayerData } from '../constants/customTypes.js';

const randomCooldown = (): number => Math.floor(Math.random() * 1) + 1;
const randomOrientation = () => ({
    horizontal: Math.round(Math.random() * 360), // alpha
    vertical: Math.round(90 + Math.random() * 80), // beta limited to 90–170
});

export default function manageArcherOutpost(zones: BattleZone[], players: PlayerData[]): void {
    // reset all players from arrow attack
    players.forEach((player: PlayerData): void => {
        player.underArrowAttack = false;
    });

    // correct loop for real game
    // zones.forEach((zone: BattleZone): void => {

    // testing situation
    let zone = zones[0];

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
                archers.phase = ArcherPhases.shooting;
                archers.phaseTimer = 1;

                // correct loop for real game
                // Mark all guardians as attacked
                // zone.guardians.forEach((playerId) => {
                //     const player: PlayerData | undefined = players.find((p) => p.key === playerId);

                // testing situation
                players.forEach((player: PlayerData): void => {
                    if (player) {
                        player.underArrowAttack = true;
                        player.arrowDefendTarget = randomOrientation();
                    }
                });
            }
            break;

        case ArcherPhases.shooting:
            if (archers.phaseTimer > 0) {
                archers.phaseTimer--;
            } else {
                archers.phase = ArcherPhases.reloading;
                archers.phaseTimer = randomCooldown();
            }
            break;
    }
    // });
}
