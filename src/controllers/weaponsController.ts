import type {GameInstance, OilPot, PlayerData} from "../constants/customTypes.js";
import {handleSuccessfullyBoiledOil} from "../utils/handleBoilingOil.js";
import {gameInstance} from "./gameController.js";
import {Server} from "socket.io";

const setPouredOffOilPots = (player: PlayerData, io: Server): GameInstance => {
  let potByPlayer: OilPot | undefined = gameInstance.carriedOilPots.find(pot => pot.carriedBy.includes(player.key))

  if (potByPlayer) {
    potByPlayer.pouredInZone[potByPlayer.carriedBy.indexOf(player.key)] = player.insideZone;

    if (potByPlayer.pouredInZone[0] === potByPlayer.pouredInZone[1]) {
      io.emit('oilIsPoured', potByPlayer.pouredInZone[0])
      handleSuccessfullyBoiledOil(gameInstance, potByPlayer)
    }
  }

  return gameInstance
}

const fireCannon = (targetZoneKey: string, firedBy: string): GameInstance => {
  // kill just some invaders. Captain is immune to cannon fire
  let affectedBattleZone = gameInstance.battleZones.find(zone => zone.key === targetZoneKey);
  if (!affectedBattleZone) return gameInstance;
  let killedAmount = 0;

  affectedBattleZone.invaders = affectedBattleZone.invaders.filter(invader => {
    if (typeof invader.ladderStep === 'number' || invader.type === 'captain') return true;

    const randomKillThisOne = Math.random() < 0.5;
    if (randomKillThisOne) {
      killedAmount += 1;
      return false
    } else {
      return true;
    }
  });
  const firingPlayer = gameInstance.players.find(player => player.key === firedBy);
  if (firingPlayer) {
    firingPlayer.killScore += killedAmount
  }

  return gameInstance
}

export default {setPouredOffOilPots, fireCannon}