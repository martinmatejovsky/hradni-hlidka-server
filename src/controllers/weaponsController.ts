import type {GameInstance, PlayerData} from "../constants/customTypes.js";
import {handleSuccesfullyBoiledOil} from "../utils/handleBoilingOil.js";
import {gameInstance} from "./gameController.js";

const setPouredOffOilPots = (player: PlayerData): GameInstance => {
  let potByPlayer = gameInstance.carriedOilPots.find(pot => pot.carriedBy.includes(player.key))

  if (potByPlayer) {
    potByPlayer.pouredInZone[potByPlayer.carriedBy.indexOf(player.key)] = player.insideZone;

    if (potByPlayer.pouredInZone[0] === potByPlayer.pouredInZone[1]) {
      handleSuccesfullyBoiledOil(gameInstance, potByPlayer)
    }
  }

  return gameInstance
}

const fireCannon = (targetZoneKey: string): GameInstance => {
  // kill just some of the invaders, not all
  let affectedBattleZone = gameInstance.battleZones.find(zone => zone.key === targetZoneKey);
  if (!affectedBattleZone) return gameInstance;

  affectedBattleZone.invaders = affectedBattleZone.invaders.filter(invader => {
    const randomKillThisOne = Math.random() < 0.7;
    return typeof invader.ladderStep === 'number' || !randomKillThisOne;
  });

  return gameInstance
}

export default {setPouredOffOilPots, fireCannon}