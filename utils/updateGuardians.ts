import type { BattleZone, PlayerData } from "../constants/customTypes";

export const updateGuardians = (currentPlayer: PlayerData, battleZones: BattleZone[]) => {
    // odstraníme hráče z jakékoliv předchozí zóny
    battleZones.forEach((zone: BattleZone) => {
        const index = zone.guardians.findIndex(g => g.key === currentPlayer.key);
        if (index !== -1) {
            zone.guardians.splice(index, 1);
        }
    });

    // doplníme hráče do zóny, pokud je v ní
    if (currentPlayer.insideZone?.length > 0) {
        battleZones.forEach((zone: BattleZone) => {
            if (zone.key === currentPlayer.insideZone) {
                const guardianIndex = zone.guardians.findIndex(g => g.key === currentPlayer.key);
                if (guardianIndex === -1) {
                    zone.guardians.push(currentPlayer);
                } else {
                    zone.guardians[guardianIndex] = currentPlayer;
                }
            }
        });
    } else if (currentPlayer.insideZone === '') {
        battleZones.forEach((area: BattleZone) => {
            const index = area.guardians.findIndex((guardian: PlayerData) => guardian.key === currentPlayer.key);
            if (index !== -1) {
                area.guardians.splice(index, 1);
            }
        });
    }
}
