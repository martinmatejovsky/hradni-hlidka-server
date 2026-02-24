import { GameLocation } from '../../constants/customTypes';

export const loketSportovni: GameLocation = {
    locationName: 'Loket Sportovní',
    sessionNamePrefix: 'Sportovka',
    key: 'loketSportovni',
    mapCenter: { lat: 50.190947, lng: 12.743567 },
    polygonsToPlayersTotal: [
        {
            upTo: 999,
            locations: ['uStasku', 'krizovatka', 'parkoviste', 'kovarna'],
        },
    ],
    polygons: [
        {
            polygonName: 'U Stašků',
            key: 'uStasku',
            polygonType: 'assaultZone',
            areaPresentational: [
                { lat: 50.191121, lng: 12.743333 },
                { lat: 50.191091, lng: 12.743433 },
                { lat: 50.19105, lng: 12.743392 },
                { lat: 50.191069, lng: 12.743304 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.191062, lng: 12.743226 },
                { lat: 50.191182, lng: 12.74329 },
                { lat: 50.191124, lng: 12.74351 },
                { lat: 50.191012, lng: 12.743422 },
            ],
            assaultLadder: {
                location: {
                    start: { lat: 50.191231, lng: 12.74318 },
                    end: { lat: 50.191105, lng: 12.743347 },
                },
                steps: [],
            },
            assemblyAreaCenter: { lat: 50.191318, lng: 12.743124 },
            archersPositionCenter: { lat: 50.191425, lng: 12.742896 },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Křižovatka',
            key: 'krizovatka',
            polygonType: 'assaultZone',
            areaPresentational: [
                { lat: 50.190997, lng: 12.743787 },
                { lat: 50.190951, lng: 12.743921 },
                { lat: 50.190906, lng: 12.74388 },
                { lat: 50.190949, lng: 12.743749 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.191071, lng: 12.743757 },
                { lat: 50.19099, lng: 12.744052 },
                { lat: 50.190856, lng: 12.743915 },
                { lat: 50.190933, lng: 12.743669 },
            ],
            assaultLadder: {
                location: {
                    start: { lat: 50.191078, lng: 12.744114 },
                    end: { lat: 50.190969, lng: 12.743867 },
                },
                steps: [],
            },
            assemblyAreaCenter: { lat: 50.191182, lng: 12.744167 },
            archersPositionCenter: { lat: 50.191165, lng: 12.744583 },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Parkoviště',
            key: 'parkoviste',
            polygonType: 'assaultZone',
            areaPresentational: [
                { lat: 50.190825, lng: 12.743572 },
                { lat: 50.190846, lng: 12.743687 },
                { lat: 50.190799, lng: 12.743711 },
                { lat: 50.190777, lng: 12.743596 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.190853, lng: 12.743492 },
                { lat: 50.19088, lng: 12.743682 },
                { lat: 50.190839, lng: 12.743792 },
                { lat: 50.190758, lng: 12.743827 },
                { lat: 50.19072, lng: 12.743575 },
            ],
            assaultLadder: {
                location: {
                    start: { lat: 50.190647, lng: 12.743824 },
                    end: { lat: 50.190798, lng: 12.743655 },
                },
                steps: [],
            },
            assemblyAreaCenter: { lat: 50.190629, lng: 12.744041 },
            archersPositionCenter: { lat: 50.190461, lng: 12.744106 },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Kovárna',
            key: 'kovarna',
            polygonType: 'smithy',
            areaPresentational: [
                { lat: 50.190966, lng: 12.743244 },
                { lat: 50.190956, lng: 12.743349 },
                { lat: 50.190846, lng: 12.743325 },
                { lat: 50.19086, lng: 12.74322 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.191014, lng: 12.743172 },
                { lat: 50.19099, lng: 12.743357 },
                { lat: 50.190971, lng: 12.743416 },
                { lat: 50.190798, lng: 12.743368 },
                { lat: 50.190839, lng: 12.743108 },
            ],
            boilingOilPotLocation: { lat: 50.190889, lng: 12.743239 },
        },
    ],
    speedChoices: [2000, 5000, 30000, 60000],
    ladderLengthChoices: [10, 20, 30],
};
