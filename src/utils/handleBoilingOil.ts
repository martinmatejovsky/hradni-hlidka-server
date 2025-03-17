import {GameInstance, OilPot, PlayerData, UtilityZone} from "../constants/customTypes.js";

export const handleBoilingOil = (gameInstance: GameInstance) => {
  const allOilStations = gameInstance.utilityZones.filter(
    (zone): zone is UtilityZone & { boilingOil: NonNullable<UtilityZone["boilingOil"]> } =>
      zone.boilingOil !== null && zone.boilingOil.readyAt !== undefined
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
export const pickUpBoilingOil = (gameInstance: GameInstance, player: PlayerData, perkValue: number | string) => {
  if (player.perks.boilingOil) return; // cannot carry another oil if already carrying

  const alreadyHalfPickedPot = gameInstance.carriedOilPots.find(oilPot => oilPot.carriedBy.length === 1);
  if (alreadyHalfPickedPot) {
    alreadyHalfPickedPot.carriedBy.push(player.key)
    gameInstance.utilityZones.find(zone => zone.key === perkValue)!.boilingOil!.readiness = 0;
  } else {
    gameInstance.carriedOilPots.push({carriedBy: [player.key], pouredInZone: ['', '']});
  }

  player.perks.boilingOil = true;
}

export const handleSuccesfullyBoiledOil = (gameInstance: GameInstance, oilPot: OilPot) => {
  let affectedBattleZone = gameInstance.battleZones.find(zone => zone.key === oilPot.pouredInZone[0]);
  if (!affectedBattleZone) return;

  affectedBattleZone.invaders = affectedBattleZone.invaders.filter(invader => {
    return typeof invader.ladderStep !== 'number';
  });

  let carryingPlayers = gameInstance.players.filter(player => oilPot.carriedBy.includes(player.key));

  carryingPlayers.forEach(player => {
    player.perks.boilingOil = false;
    player.canPourBoilingOil = false;
  });

  gameInstance.carriedOilPots = gameInstance.carriedOilPots.filter(pot => pot !== oilPot);
};