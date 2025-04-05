import type {GameInstance, PlayerData} from "../constants/customTypes";

export const updateGuardians = (currentPlayer: PlayerData, gameInstance: GameInstance) => {
    if (!gameInstance.battleZones) return;

    // odstraníme hráče z jakékoliv předchozí zóny
    gameInstance.battleZones.forEach((zone) => {
        const index = zone.guardians.findIndex(key => key === currentPlayer.key);
        if (index !== -1) {
            zone.guardians.splice(index, 1);
        }
    });

    // doplníme hráče do zóny, pokud je v ní
    if (currentPlayer.insideZone?.length > 0) {
        gameInstance.battleZones.forEach((zone) => {
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
        gameInstance.battleZones.forEach((area) => {
            const index = area.guardians.findIndex(key => key === currentPlayer.key);
            if (index !== -1) {
                area.guardians.splice(index, 1);
            }
        });
    }

    // aktualizuj, kdo může/nemůže použít perk boilingOil
    gameInstance.players.forEach((player) => {
        player.canPourBoilingOil = true;
        // player.canPourBoilingOil = false;
        //
        // if (player.perks.boilingOil && player.insideZone) {
        //     // find carriedOilPots where this player is, and if there is also another player, check if the other player is in the same zone
        //     const carriedPot = gameInstance.carriedOilPots.find(pot => pot.carriedBy.includes(player.key));
        //     if (carriedPot) {
        //         const otherPlayerKey = carriedPot.carriedBy.find(key => key !== player.key);
        //         if (otherPlayerKey) {
        //             const otherPlayer = gameInstance.players.find(p => p.key === otherPlayerKey);
        //             if (otherPlayer && otherPlayer.insideZone === player.insideZone) {
        //                 player.canPourBoilingOil = true;
        //                 otherPlayer.canPourBoilingOil = true;
        //             }
        //         }
        //     }
        // }
    });
}
