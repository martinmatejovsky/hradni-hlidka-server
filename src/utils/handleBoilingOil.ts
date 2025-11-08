import { experienceValue, OilPot, PlayerData, UtilityZone } from '../constants/customTypes.js';
import { GameSession } from './gameSessionClass.js';

export const handleBoilingOil = (gameInstance: GameSession) => {
    const allOilStations = gameInstance.utilityZones.filter(
        (zone): zone is UtilityZone & { boilingOil: NonNullable<UtilityZone['boilingOil']> } =>
            zone.boilingOil !== null && zone.boilingOil.readyAt !== undefined,
    );

    for (const oilStation of allOilStations) {
        const boilingOil = oilStation.boilingOil;
        if (boilingOil.readiness < boilingOil.readyAt) {
            boilingOil.readiness += 1;
        }
    }
};

/**
 *
 * @param gameInstance
 * @param player
 * @param perkValue - key of utility zone from which the pot was collected
 */
export const pickUpBoilingOil = (gameInstance: GameSession, player: PlayerData, perkValue: number | string) => {
    if (player.perks.boilingOil) return; // cannot carry another oil if already carrying

    const alreadyHalfPickedPot = gameInstance.carriedOilPots.find((oilPot) => oilPot.carriedBy.length === 1);
    if (alreadyHalfPickedPot) {
        alreadyHalfPickedPot.carriedBy.push(player.key);
        gameInstance.utilityZones.find((zone) => zone.key === perkValue)!.boilingOil!.readiness = 0;
    } else {
        gameInstance.carriedOilPots.push({ carriedBy: [player.key], pouredInZone: ['', ''] });
    }

    player.perks.boilingOil = true;
};

export const handleSuccessfullyBoiledOil = (gameInstance: GameSession, oilPot: OilPot) => {
    let affectedBattleZone = gameInstance.battleZones.find((zone) => zone.key === oilPot.pouredInZone[0]);
    if (!affectedBattleZone) return;
    let killedAmount = 0;

    affectedBattleZone.invaders = affectedBattleZone.invaders.filter((invader) => {
        if (typeof invader.ladderStep === 'number') {
            killedAmount += 1;
            return false;
        } else return true;
    });

    let carryingPlayers = gameInstance.players.filter((player) => oilPot.carriedBy.includes(player.key));

    // distribute kills to two players
    const baseKill = Math.floor(killedAmount / 2);
    const hasExtraKill = killedAmount % 2 === 1;
    const randomIndex = hasExtraKill ? Math.floor(Math.random() * 2) : -1;

    carryingPlayers.forEach((player, index) => {
        let killsForPlayer = baseKill + (index === randomIndex ? 1 : 0);

        player.perks.boilingOil = false;
        player.canPourBoilingOil = false;
        player.killScore.kills += killsForPlayer;
        player.killScore.experience += killsForPlayer * experienceValue.invaderFinished;
    });

    gameInstance.carriedOilPots = gameInstance.carriedOilPots.filter((pot) => pot !== oilPot);
};
