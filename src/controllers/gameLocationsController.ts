import { Request, Response } from 'express';

const getGameLocations = (_: Request, res: Response) => {
    return res.json([
        {
            locationName: 'Loket Sportovní',
            sessionNamePrefix: 'Sportovka',
            key: 'loketSportovni',
            mapCenter: { lat: 50.1910833, lng: 12.7438483 },
            polygonsToPlayersTotal: [
                {
                    upTo: Infinity,
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
                    assemblyAreaCenter: { lat: 50.1914425, lng: 12.7434172 },
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1913958, lng: 12.7433683 },
                            end: { lat: 50.1912017, lng: 12.7431569 },
                        },
                    },
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
                    assemblyAreaCenter: { lat: 50.1912708, lng: 12.7439428 },
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1912553, lng: 12.7439131 },
                            end: { lat: 50.1910533, lng: 12.7437153 },
                        },
                    },
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
                    assemblyAreaCenter: { lat: 50.1910528, lng: 12.7444283 },
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1910169, lng: 12.7443422 },
                            end: { lat: 50.1908794, lng: 12.7442031 },
                        },
                    },
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
                },
            ],
            speedChoices: [2000, 5000, 10000, 15000, 20000, 25000, 30000, 60000],
            ladderLengthChoices: [10, 20, 30],
        },
        {
            locationName: 'Loket Východní hradba',
            sessionNamePrefix: 'Loket',
            key: 'loketVychodniHradba',
            mapCenter: { lat: 50.1864258, lng: 12.7563469 },
            polygonsToPlayersTotal: [
                { upTo: 2, locations: ['fortna', 'parkan', 'svVaclava', 'smithy'] },
                { upTo: 4, locations: ['fortna', 'parkan', 'svVaclava', 'uPurkrabiho', 'smithy'] },
                { upTo: 9, locations: ['prevet', 'fortna', 'parkan', 'svVaclava', 'uPurkrabiho', 'smithy'] },
                {
                    upTo: Infinity,
                    locations: ['prevet', 'fortna', 'parkan', 'svVaclava', 'uPurkrabiho', 'pozorovatelna', 'smithy'],
                },
            ],
            polygons: [
                {
                    polygonName: 'Prevét',
                    key: 'prevet',
                    polygonType: 'assaultZone',
                    areaPresentational: [
                        { lat: 50.18685, lng: 12.7561322 },
                        { lat: 50.1868669, lng: 12.7561942 },
                        { lat: 50.186795, lng: 12.7562397 },
                        { lat: 50.1867828, lng: 12.7561725 },
                    ],
                    areaOfAcceptedPresence: [
                        { lat: 50.1868636, lng: 12.7560411 },
                        { lat: 50.18691, lng: 12.7562236 },
                        { lat: 50.1867811, lng: 12.7562961 },
                        { lat: 50.1867639, lng: 12.7561083 },
                    ],
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1868928, lng: 12.7564958 },
                            end: { lat: 50.1868206, lng: 12.7562061 },
                        },
                    },
                    assemblyAreaCenter: { lat: 50.1869142, lng: 12.75669 },
                },
                {
                    polygonName: 'Fortna',
                    key: 'fortna',
                    polygonType: 'assaultZone',
                    areaPresentational: [
                        { lat: 50.186736, lng: 12.756198 },
                        { lat: 50.186745, lng: 12.756258 },
                        { lat: 50.186706, lng: 12.756274 },
                        { lat: 50.186699, lng: 12.756215 },
                    ],
                    areaOfAcceptedPresence: [
                        { lat: 50.186744, lng: 12.75613 },
                        { lat: 50.186769, lng: 12.756311 },
                        { lat: 50.18669, lng: 12.75637 },
                        { lat: 50.186652, lng: 12.75618 },
                    ],
                    assaultLadder: {
                        location: {
                            start: { lat: 50.186761, lng: 12.75655 },
                            end: { lat: 50.1867147, lng: 12.756245 },
                        },
                    },
                    assemblyAreaCenter: { lat: 50.1867775, lng: 12.7566764 },
                },
                {
                    polygonName: 'Parkán',
                    key: 'parkan',
                    polygonType: 'assaultZone',
                    areaPresentational: [
                        { lat: 50.186616, lng: 12.756243 },
                        { lat: 50.18663, lng: 12.756302 },
                        { lat: 50.18659, lng: 12.756323 },
                        { lat: 50.186578, lng: 12.756259 },
                    ],
                    areaOfAcceptedPresence: [
                        { lat: 50.186628, lng: 12.756174 },
                        { lat: 50.186666, lng: 12.756373 },
                        { lat: 50.1865808, lng: 12.7564167 },
                        { lat: 50.1865486, lng: 12.7562092 },
                    ],
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1866219, lng: 12.7566117 },
                            end: { lat: 50.1866003, lng: 12.7562861 },
                        },
                    },
                    assemblyAreaCenter: { lat: 50.1866236, lng: 12.7567814 },
                },
                {
                    polygonName: 'Sv. Václava',
                    key: 'svVaclava',
                    polygonType: 'assaultZone',
                    areaPresentational: [
                        { lat: 50.186376, lng: 12.756291 },
                        { lat: 50.186372, lng: 12.756366 },
                        { lat: 50.186339, lng: 12.756353 },
                        { lat: 50.186345, lng: 12.756286 },
                    ],
                    areaOfAcceptedPresence: [
                        { lat: 50.186413, lng: 12.756221 },
                        { lat: 50.18638, lng: 12.756412 },
                        { lat: 50.186316, lng: 12.756404 },
                        { lat: 50.186335, lng: 12.756211 },
                    ],
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1863403, lng: 12.7566436 },
                            end: { lat: 50.1863597, lng: 12.7563256 },
                        },
                    },
                    assemblyAreaCenter: { lat: 50.1863506, lng: 12.7567706 },
                },
                {
                    polygonName: 'U Purkrabího',
                    key: 'uPurkrabiho',
                    polygonType: 'assaultZone',
                    areaPresentational: [
                        { lat: 50.186289, lng: 12.75628 },
                        { lat: 50.18628, lng: 12.756345 },
                        { lat: 50.186229, lng: 12.75633 },
                        { lat: 50.186237, lng: 12.756264 },
                    ],
                    areaOfAcceptedPresence: [
                        { lat: 50.186322, lng: 12.756216 },
                        { lat: 50.1863, lng: 12.756425 },
                        { lat: 50.1862017, lng: 12.7563897 },
                        { lat: 50.1862236, lng: 12.7561967 },
                    ],
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1862247, lng: 12.7565758 },
                            end: { lat: 50.1862556, lng: 12.7563039 },
                        },
                    },
                    assemblyAreaCenter: { lat: 50.1862431, lng: 12.7567028 },
                },
                {
                    polygonName: 'Pozorovatelna',
                    key: 'pozorovatelna',
                    polygonType: 'assaultZone',
                    areaPresentational: [
                        { lat: 50.186179, lng: 12.756248 },
                        { lat: 50.18617, lng: 12.756315 },
                        { lat: 50.186126, lng: 12.756302 },
                        { lat: 50.186132, lng: 12.756237 },
                    ],
                    areaOfAcceptedPresence: [
                        { lat: 50.1862039, lng: 12.7561878 },
                        { lat: 50.1861822, lng: 12.7563861 },
                        { lat: 50.1860872, lng: 12.7563667 },
                        { lat: 50.1861114, lng: 12.7561483 },
                    ],
                    assaultLadder: {
                        location: {
                            start: { lat: 50.1861297, lng: 12.7565347 },
                            end: { lat: 50.1861536, lng: 12.7562753 },
                        },
                    },
                    assemblyAreaCenter: { lat: 50.1860019, lng: 12.7567517 },
                },
                {
                    polygonName: 'Kovárna',
                    key: 'smithy',
                    polygonType: 'smithy',
                    areaPresentational: [
                        { lat: 50.186514, lng: 12.756396 },
                        { lat: 50.186502, lng: 12.756503 },
                        { lat: 50.186466, lng: 12.756551 },
                        { lat: 50.186417, lng: 12.756532 },
                        { lat: 50.186389, lng: 12.756481 },
                        { lat: 50.186397, lng: 12.756374 },
                    ],
                    areaOfAcceptedPresence: [
                        { lat: 50.186528, lng: 12.756377 },
                        { lat: 50.186523, lng: 12.756562 },
                        { lat: 50.186356, lng: 12.756549 },
                        { lat: 50.18637, lng: 12.756366 },
                    ],
                    boilingOilPotLocation: { lat: 50.18643, lng: 12.7564731 },
                },
            ],
            speedChoices: [2000, 5000, 10000, 15000, 20000, 25000, 30000, 60000],
            ladderLengthChoices: [20, 30, 40],
        },
    ]);
};

export default getGameLocations;
