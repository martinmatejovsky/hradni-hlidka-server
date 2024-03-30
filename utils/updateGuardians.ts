import type { BattleZone, PlayerData } from "../constants/customTypes";

export const updateGuardians = (currentPlayer: PlayerData, battleZones: BattleZone[]) => {
    if (currentPlayer.insideZone?.length > 0) {
        battleZones.forEach((zone: BattleZone) => {
            if (zone.key === currentPlayer.insideZone) {
                zone.guardians.push(currentPlayer);
            }
        })
    } else if (currentPlayer.insideZone === '') {
        battleZones.forEach((area: BattleZone) => {
            const index = area.guardians.findIndex((guardian: PlayerData) => guardian.name === currentPlayer.name);
            area.guardians.splice(index, 1);
        })
    }
}