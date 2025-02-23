import {GameInstance, UtilityZone} from "../constants/customTypes.js";

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