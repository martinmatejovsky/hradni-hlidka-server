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
            areaOfAcceptedPresence: [],
            areaPresentational: [],
            assemblyAreaCenter: { lat: 50.191318, lng: 12.743124 },
            archersPositionCenter: { lat: 50.191425, lng: 12.742896 },
            assaultLadder: {
                location: {
                    start: { lat: 50.191231, lng: 12.74318 },
                    end: { lat: 50.191105, lng: 12.743347 },
                },
                steps: [],
            },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Křižovatka',
            key: 'krizovatka',
            polygonType: 'assaultZone',
            areaOfAcceptedPresence: [],
            areaPresentational: [],
            assemblyAreaCenter: { lat: 50.191182, lng: 12.744167 },
            archersPositionCenter: { lat: 50.191165, lng: 12.744583 },
            assaultLadder: {
                location: {
                    start: { lat: 50.191078, lng: 12.744114 },
                    end: { lat: 50.190969, lng: 12.743867 },
                },
                steps: [],
            },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Parkoviště',
            key: 'parkoviste',
            polygonType: 'assaultZone',
            areaOfAcceptedPresence: [],
            areaPresentational: [],
            assemblyAreaCenter: { lat: 50.190629, lng: 12.744041 },
            archersPositionCenter: { lat: 50.190461, lng: 12.744106 },
            assaultLadder: {
                location: {
                    start: { lat: 50.190647, lng: 12.743824 },
                    end: { lat: 50.190798, lng: 12.743655 },
                },
                steps: [],
            },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Kovárna',
            key: 'kovarna',
            polygonType: 'smithy',
            areaOfAcceptedPresence: [],
            areaPresentational: [],
            boilingOilPotLocation: { lat: 50.190889, lng: 12.743239 },
            assemblyCountdown: 0,
        },
    ],
    speedChoices: [2000, 5000, 30000, 60000],
    ladderLengthChoices: [10, 20, 30],
};
