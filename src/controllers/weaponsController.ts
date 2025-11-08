import type { OilPot, PlayerData } from '../constants/customTypes.js';
import { experienceValue } from '../constants/customTypes.js';
import { handleSuccessfullyBoiledOil } from '../utils/handleBoilingOil.js';
import { gameSessions } from './gameController.js';
import { Server } from 'socket.io';
import { GameSession } from '../utils/gameSessionClass.js';

const setPouredOffOilPots = (player: PlayerData, gameId: string, io: Server): GameSession => {
    const session = gameSessions[gameId];
    let potByPlayer: OilPot | undefined = session.carriedOilPots.find((pot) => pot.carriedBy.includes(player.key));

    if (potByPlayer) {
        potByPlayer.pouredInZone[potByPlayer.carriedBy.indexOf(player.key)] = player.insideZone;

        if (potByPlayer.pouredInZone[0] === potByPlayer.pouredInZone[1]) {
            io.emit('oilIsPoured', potByPlayer.pouredInZone[0]);
            handleSuccessfullyBoiledOil(session, potByPlayer);
        }
    }

    return session;
};

const fireCannon = (targetZoneKey: string, firedBy: string, gameId: string): GameSession => {
    const gameInstance = gameSessions[gameId];
    // kill just some invaders. Captain is immune to cannon fire
    let affectedBattleZone = gameInstance.battleZones.find((zone) => zone.key === targetZoneKey);
    if (!affectedBattleZone) return gameInstance;
    let killedAmount = 0;

    affectedBattleZone.invaders = affectedBattleZone.invaders.filter((invader) => {
        if (typeof invader.ladderStep === 'number' || invader.type === 'captain') return true;

        const randomKillThisOne = Math.random() < 0.4;
        if (randomKillThisOne) {
            killedAmount += 1;
            return false;
        } else {
            return true;
        }
    });
    const firingPlayer = gameInstance.players.find((player) => player.key === firedBy);
    if (firingPlayer) {
        firingPlayer.killScore.experience += killedAmount * experienceValue.invaderFinished;
        firingPlayer.killScore.kills += killedAmount;
    }

    return gameInstance;
};

export default { setPouredOffOilPots, fireCannon };
