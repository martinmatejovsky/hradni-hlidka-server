import type {BattleZone, GameInstance} from "../constants/customTypes";

export const moveInvadersOnLadder = (gameInstance: GameInstance): void => {
    const zones = gameInstance.battleZones;
    const ladderLength = gameInstance.ladderLength;
    const delayBetweenIterations = Math.floor(gameInstance.gameTempo / (ladderLength * 2));

    zones.forEach((area: BattleZone): void => {
        let ladder = area.assaultLadder.content
        let assembledInvaders = area.invaders.filter(invader => typeof invader.assembleArea === "number" )
        let climbingInvaders = area.invaders.filter(invader => typeof invader.ladderStep === "number" )

        if (climbingInvaders.length > 0) {
            for (let i = climbingInvaders.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    if (climbingInvaders[i].ladderStep !== null) {
                        climbingInvaders[i].ladderStep! += 1;

                        if (i > 0) {
                            ladder[i] = ladder[i - 1];
                            ladder[i - 1] = null;
                        } else {
                            ladder[0] = null;
                        }
                    }
                }, (climbingInvaders.length - i) * delayBetweenIterations);
            }
        }

        // Přidání nového invadera z assembly area po přesunu všech existujících invaderů
        setTimeout(() => {
            if (assembledInvaders.length > 0) {
                const newInvader = assembledInvaders.shift();
                if (newInvader) {
                    newInvader.assembleArea = null;
                    newInvader.ladderStep = 0;
                    ladder[0] = newInvader;
                }

                assembledInvaders.forEach(invader => {
                    if (invader.assembleArea !== null) {
                        invader.assembleArea -= 1;
                    }
                });
            }
        }, (climbingInvaders.length + 1) * delayBetweenIterations);
    });
};
