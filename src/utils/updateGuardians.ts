import type { PlayerData } from '../constants/customTypes';
import { GameSession } from './gameSessionClass.js';

export const updateGuardians = (currentPlayer: PlayerData, gameInstance: GameSession) => {
    if (!gameInstance) return;

    // odstraníme hráče z jakékoliv předchozí zóny
    gameInstance.battleZones.forEach((zone) => {
        const index = zone.guardians.findIndex((key) => key === currentPlayer.key);
        if (index !== -1) {
            zone.guardians.splice(index, 1);
        }
    });

    // doplníme hráče do zóny, pokud je v ní
    if (currentPlayer.insideZone?.length > 0) {
        gameInstance.battleZones.forEach((zone) => {
            if (zone.key === currentPlayer.insideZone) {
                const guardianIndex = zone.guardians.findIndex((g) => g === currentPlayer.key);
                if (guardianIndex === -1) {
                    zone.guardians.push(currentPlayer.key);
                } else {
                    zone.guardians[guardianIndex] = currentPlayer.key;
                }
            }
        });
    } else if (currentPlayer.insideZone === '') {
        gameInstance.battleZones.forEach((area) => {
            const index = area.guardians.findIndex((key) => key === currentPlayer.key);
            if (index !== -1) {
                area.guardians.splice(index, 1);
            }
        });
    }

    // aktualizovat dalsi parametry hráče
    gameInstance.players.forEach((player) => {
        if (player.key === currentPlayer.key) {
            player.location = currentPlayer.location;
            player.perks = currentPlayer.perks;
            player.insideZone = currentPlayer.insideZone;
        }
    });

    // aktualizuj, kdo může/nemůže použít perk boilingOil
    gameInstance.players.forEach((player) => {
        player.canPourBoilingOil = false;

        const playerIsInBattleZone = gameInstance.battleZones.some((zone) => zone.key === player.insideZone);

        if (player.perks.boilingOil && playerIsInBattleZone) {
            // find carriedOilPots where this player is, and if there is also another player, check if the other player is in the same zone
            const carriedPot = gameInstance.carriedOilPots.find((pot) => pot.carriedBy.includes(player.key));
            if (carriedPot) {
                const otherPlayerKey = carriedPot.carriedBy.find((key) => key !== player.key);
                if (otherPlayerKey) {
                    const otherPlayer = gameInstance.players.find((p) => p.key === otherPlayerKey);
                    if (otherPlayer && otherPlayer.insideZone === player.insideZone) {
                        player.canPourBoilingOil = true;
                        otherPlayer.canPourBoilingOil = true;
                    }
                }
            }
        }
    });
};
