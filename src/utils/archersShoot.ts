import { BattleZone, ShootingPhases } from '../constants/customTypes.js';

export default function archersShoot(zones: BattleZone[]) {
    zones.forEach((zone: BattleZone): void => {
        zone.archers.shootingPhase =
            zone.archers.shootingPhase === ShootingPhases.reloading ? ShootingPhases.aiming : ShootingPhases.reloading;
    });
}
