import {GameInstance, PlayerData, UtilityZone} from "../constants/customTypes.js";

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

  const alreadyHalfPickedPot = gameInstance.carriedOilPots.find(oilPot => oilPot.carriedBy.length === 2);
  if (alreadyHalfPickedPot) {
    alreadyHalfPickedPot.carriedBy.push(player.key)
  } else {
    gameInstance.carriedOilPots.push({carriedBy: [player.key]});
  }

  gameInstance.utilityZones.find(zone => zone.key === perkValue)!.boilingOil!.readiness = 0;

  player.perks.boilingOil = true;
}