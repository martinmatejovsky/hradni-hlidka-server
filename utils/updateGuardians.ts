import type {BattleZone, PlayerData, UtilityZone} from "../constants/customTypes";

export const updateGuardians = (currentPlayer: PlayerData, battleZones: (BattleZone | UtilityZone)[]) => {
    // odstraníme hráče z jakékoliv předchozí zóny
    battleZones.forEach((zone) => {
        const index = zone.guardians.findIndex(key => key === currentPlayer.key);
        if (index !== -1) {
            zone.guardians.splice(index, 1);
        }
    });

    // doplníme hráče do zóny, pokud je v ní
    if (currentPlayer.insideZone?.length > 0) {
        battleZones.forEach((zone) => {
            if (zone.key === currentPlayer.insideZone) {
                const guardianIndex = zone.guardians.findIndex(g => g === currentPlayer.key);
                if (guardianIndex === -1) {
                    zone.guardians.push(currentPlayer.key);
                } else {
                    zone.guardians[guardianIndex] = currentPlayer.key;
                }
            }
        });
    } else if (currentPlayer.insideZone === '') {
        battleZones.forEach((area) => {
            const index = area.guardians.findIndex(key => key === currentPlayer.key);
            if (index !== -1) {
                area.guardians.splice(index, 1);
            }
        });
    }
}
