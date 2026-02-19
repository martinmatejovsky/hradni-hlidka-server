import { GameLocation } from '../../constants/customTypes';

export const loketSportovni: GameLocation = {
    locationName: 'Loket Sportovní',
    sessionNamePrefix: 'Sportovka',
    key: 'loketSportovni',
    mapCenter: { lat: 50.1910833, lng: 12.7438483 },
    polygonsToPlayersTotal: [
        {
            upTo: 999,
            locations: ['panelak', 'uStasku', 'baracek', 'smithy'],
        },
    ],
    polygons: [
        {
            polygonName: 'Panelák',
            key: 'panelak',
            polygonType: 'assaultZone',
            areaPresentational: [
                { lat: 50.1912719, lng: 12.7429919 },
                { lat: 50.1911711, lng: 12.7433686 },
                { lat: 50.1910528, lng: 12.743295 },
                { lat: 50.1911431, lng: 12.7429128 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.1912719, lng: 12.7429919 },
                { lat: 50.1911711, lng: 12.7433686 },
                { lat: 50.1910528, lng: 12.743295 },
                { lat: 50.1911431, lng: 12.7429128 },
            ],
            assaultLadder: {
                location: {
                    start: { lat: 50.1913958, lng: 12.7433683 },
                    end: { lat: 50.1912017, lng: 12.7431569 },
                },
                steps: [],
            },
            assemblyAreaCenter: { lat: 50.1914425, lng: 12.7434172 },
            archersPositionCenter: { lat: 50.1912783, lng: 12.7430758 },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'U Stašků',
            key: 'uStasku',
            polygonType: 'assaultZone',
            areaPresentational: [
                { lat: 50.1910928, lng: 12.743595 },
                { lat: 50.1910156, lng: 12.7438483 },
                { lat: 50.1909264, lng: 12.7437878 },
                { lat: 50.1910069, lng: 12.7435381 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.1910928, lng: 12.743595 },
                { lat: 50.1910156, lng: 12.7438483 },
                { lat: 50.1909264, lng: 12.7437878 },
                { lat: 50.1910069, lng: 12.7435381 },
            ],
            assaultLadder: {
                location: {
                    start: { lat: 50.1912553, lng: 12.7439131 },
                    end: { lat: 50.1910533, lng: 12.7437153 },
                },
                steps: [],
            },
            assemblyAreaCenter: { lat: 50.1912708, lng: 12.7439428 },
            archersPositionCenter: { lat: 50.1913094, lng: 12.7436847 },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Baráček',
            key: 'baracek',
            polygonType: 'assaultZone',
            areaPresentational: [
                { lat: 50.1909744, lng: 12.7440025 },
                { lat: 50.1908025, lng: 12.7444953 },
                { lat: 50.1907103, lng: 12.744425 },
                { lat: 50.1908658, lng: 12.7439169 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.1909744, lng: 12.7440025 },
                { lat: 50.1908025, lng: 12.7444953 },
                { lat: 50.1907103, lng: 12.744425 },
                { lat: 50.1908658, lng: 12.7439169 },
            ],
            assaultLadder: {
                location: {
                    start: { lat: 50.1910169, lng: 12.7443422 },
                    end: { lat: 50.1908794, lng: 12.7442031 },
                },
                steps: [],
            },
            assemblyAreaCenter: { lat: 50.1910528, lng: 12.7444283 },
            archersPositionCenter: { lat: 50.1910828, lng: 12.7447281 },
            assemblyCountdown: 0,
        },
        {
            polygonName: 'Kovárna',
            key: 'smithy',
            polygonType: 'smithy',
            areaPresentational: [
                { lat: 50.1910053, lng: 12.7432583 },
                { lat: 50.1909811, lng: 12.7433953 },
                { lat: 50.1908867, lng: 12.7433739 },
                { lat: 50.1908961, lng: 12.7432317 },
            ],
            areaOfAcceptedPresence: [
                { lat: 50.1910247, lng: 12.7430683 },
                { lat: 50.1909906, lng: 12.7433956 },
                { lat: 50.1908842, lng: 12.7433931 },
                { lat: 50.1908892, lng: 12.7430658 },
            ],
            boilingOilPotLocation: { lat: 50.1909119, lng: 12.7433344 },
            archersPositionCenter: { lat: 0, lng: 0 },
            assemblyCountdown: 0,
        },
    ],
    speedChoices: [2000, 5000, 30000, 60000],
    ladderLengthChoices: [10, 20, 30],
};
