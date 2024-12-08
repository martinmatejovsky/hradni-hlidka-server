import {AssaultLadder, Coordinates} from "../constants/customTypes";

export const calculateLadderSteps = (ladder: AssaultLadder, ladderLength: number = 20 ): Coordinates[] => {
    // calculates points in equal distance between ladder.start and ladder.end
    const start = ladder.location.start;
    const end = ladder.location.end;
    let steps = [];

    const stepLat = (end.lat! - start.lat!) / ladderLength;
    const stepLng = (end.lng! - start.lng!) / ladderLength;
    for (let i = 0; i < ladderLength; i++) {
        steps.push({
            lat: start.lat! + i * stepLat,
            lng: start.lng! + i * stepLng,
        });
    }

    return steps;
}