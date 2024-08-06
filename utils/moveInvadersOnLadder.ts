import type {BattleZone, GameInstance} from "../constants/customTypes";

export const moveInvadersOnLadder = (gameInstance: GameInstance): void => {
    const zones = gameInstance.battleZones;

    zones.forEach((area: BattleZone ): void => {
        let assembledInvaders = area.invaders.filter(invader => typeof invader.assembleArea === "number" )
        let climbingInvaders = area.invaders.filter(invader => typeof invader.ladderStep === "number" )

        if (climbingInvaders.length > 0) {
            for (let i = climbingInvaders.length - 1; i >= 0; i--) {
                if (climbingInvaders[i].ladderStep !== null) {
                    climbingInvaders[i].ladderStep! += 1;
                }
            }
        }

        // Přidání nového invadera z assembly area po přesunu všech existujících invaderů
        if (assembledInvaders.length > 0) {
            const newInvader = assembledInvaders.shift();
            if (newInvader) {
                newInvader.assembleArea = null;
                newInvader.ladderStep = 0;
            }

            assembledInvaders.forEach(invader => {
                if (invader.assembleArea !== null) {
                    invader.assembleArea -= 1;
                }
            });
        }
    });
};
