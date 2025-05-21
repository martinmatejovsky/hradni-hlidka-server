import {Request, Response} from "express";

const getGameLocations = (_: Request, res: Response) => {
    return res.json(
        [
            {
                locationName: 'Loket Sportovní',
                key: 'loketSportovni',
                mapCenter: {lat: 50.1910833, lng: 12.7438483},
                polygons: [
                    {
                        polygonName: 'Panelák',
                        key: 'panelak',
                        polygonType: "assaultZone",
                        areaOfAcceptedPresence: [
                            {lat: 50.1912719, lng: 12.7429919},
                            {lat: 50.1911711, lng: 12.7433686},
                            {lat: 50.1910528, lng: 12.7432950},
                            {lat: 50.1911431, lng: 12.7429128},
                        ],
                        areaPresentational: [
                            {lat: 50.1912719, lng: 12.7429919},
                            {lat: 50.1911711, lng: 12.7433686},
                            {lat: 50.1910528, lng: 12.7432950},
                            {lat: 50.1911431, lng: 12.7429128},
                        ],
                        assemblyArea: [
                            {lat: 50.1914114, lng: 12.7434433},
                            {lat: 50.1914369, lng: 12.7433631},
                            {lat: 50.1914508, lng: 12.7434111},
                            {lat: 50.1914783, lng: 12.7434219},
                            {lat: 50.1914850, lng: 12.7433764},
                            {lat: 50.1914764, lng: 12.7433067},
                            {lat: 50.1914114, lng: 12.7434542},
                            {lat: 50.1914664, lng: 12.7433817},
                            {lat: 50.1914922, lng: 12.7434356},
                            {lat: 50.1914853, lng: 12.7434892},
                            {lat: 50.1914903, lng: 12.7435267},
                            {lat: 50.1914972, lng: 12.7434811},
                        ],
                        assemblyAreaCenter: {lat: 50.1914425, lng: 12.7434172},
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1913958, lng: 12.7433683},
                                end: {lat: 50.1912017, lng: 12.7431569}
                            }
                        }
                    },
                    {
                        polygonName: 'U Stašků',
                        key: 'uStasku',
                        polygonType: "assaultZone",
                        areaOfAcceptedPresence: [
                            {lat: 50.1910928, lng: 12.7435950},
                            {lat: 50.1910156, lng: 12.7438483},
                            {lat: 50.1909264, lng: 12.7437878},
                            {lat: 50.1910069, lng: 12.7435381},
                        ],
                        areaPresentational: [
                            {lat: 50.1910928, lng: 12.7435950},
                            {lat: 50.1910156, lng: 12.7438483},
                            {lat: 50.1909264, lng: 12.7437878},
                            {lat: 50.1910069, lng: 12.7435381},
                        ],
                        assemblyArea: [
                            {lat: 50.1913700, lng: 12.7438914},
                            {lat: 50.1913442, lng: 12.7439317},
                            {lat: 50.1912825, lng: 12.7440281},
                            {lat: 50.1912825, lng: 12.7439422},
                            {lat: 50.1912808, lng: 12.7438644},
                            {lat: 50.1912378, lng: 12.7439717},
                            {lat: 50.1912086, lng: 12.7439664},
                            {lat: 50.1912053, lng: 12.7440039},
                            {lat: 50.1911864, lng: 12.7440281},
                            {lat: 50.1911983, lng: 12.7440656},
                            {lat: 50.1912222, lng: 12.7440550},
                            {lat: 50.1912411, lng: 12.7440683},
                        ],
                        assemblyAreaCenter: {lat: 50.1912708, lng: 12.7439428},
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1912553, lng: 12.7439131},
                                end: {lat: 50.1910533, lng: 12.7437153}
                            }
                        }
                    },
                    {
                        polygonName: 'Baráček',
                        key: 'baracek',
                        polygonType: "assaultZone",
                        areaOfAcceptedPresence: [
                            {lat: 50.1909744, lng: 12.7440025},
                            {lat: 50.1908025, lng: 12.7444953},
                            {lat: 50.1907103, lng: 12.7444250},
                            {lat: 50.1908658, lng: 12.7439169},
                        ],
                        areaPresentational: [
                            {lat: 50.1909744, lng: 12.7440025},
                            {lat: 50.1908025, lng: 12.7444953},
                            {lat: 50.1907103, lng: 12.7444250},
                            {lat: 50.1908658, lng: 12.7439169},
                        ],
                        assemblyArea: [
                            {lat: 50.1910975, lng: 12.7444950},
                            {lat: 50.1911147, lng: 12.7443958},
                            {lat: 50.1911011, lng: 12.7443314},
                            {lat: 50.1910581, lng: 12.7444172},
                            {lat: 50.1910564, lng: 12.7443583},
                            {lat: 50.1910219, lng: 12.7443797},
                            {lat: 50.1910342, lng: 12.7443289},
                            {lat: 50.1910547, lng: 12.7443933},
                            {lat: 50.1910600, lng: 12.7444228},
                            {lat: 50.1910461, lng: 12.7444361},
                            {lat: 50.1910736, lng: 12.7444442},
                            {lat: 50.1911028, lng: 12.7444578},
                        ],
                        assemblyAreaCenter: {lat: 50.1910528, lng: 12.7444283},
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1910169, lng: 12.7443422},
                                end:  {lat: 50.1908794, lng: 12.7442031}
                            }
                        }
                    },
                    {
                        polygonName: 'Kovárna',
                        key: 'smithy',
                        polygonType: "smithy",
                        areaOfAcceptedPresence: [
                            {lat: 50.1910247, lng: 12.7430683},
                            {lat: 50.1909906, lng: 12.7433956},
                            {lat: 50.1908842, lng: 12.7433931},
                            {lat: 50.1908892, lng: 12.7430658},
                        ],
                        areaPresentational: [
                            {lat: 50.1910053, lng: 12.7432583},
                            {lat: 50.1909811, lng: 12.7433953},
                            {lat: 50.1908867, lng: 12.7433739},
                            {lat: 50.1908961, lng: 12.7432317},
                        ],
                        boilingOilPotLocation: {lat: 50.1909119, lng: 12.7433344},
                    },
                ],
                speedChoices: [2000, 5000, 10000, 15000, 20000, 25000, 30000, 60000],
                ladderLengthChoices: [10, 20, 30],
            },
            {
                locationName: 'Loket Východní hradba',
                key: 'loketVychodniHradba',
                mapCenter: {lat: 50.1864258, lng: 12.7563469},
                polygons: [
                    {
                        polygonName: 'Prevét',
                        key: 'prevet',
                        polygonType: "assaultZone",
                        areaOfAcceptedPresence: [
                            {lat: 50.1868636, lng: 12.7560411},
                            {lat: 50.1869100, lng: 12.7562236},
                            {lat: 50.1867811, lng: 12.7562961},
                            {lat: 50.1867639, lng: 12.7561083},
                        ],
                        areaPresentational: [
                            {lat: 50.1868500, lng: 12.7561322},
                            {lat: 50.1868669, lng: 12.7561942},
                            {lat: 50.1867950, lng: 12.7562397},
                            {lat: 50.1867828, lng: 12.7561725},
                        ],
                        assemblyArea: [
                            {lat: 50.186888, lng: 12.756618},
                            {lat: 50.186869, lng: 12.756631},
                            {lat: 50.186881, lng: 12.756669},
                            {lat: 50.186915, lng: 12.756642},
                            {lat: 50.186948, lng: 12.756653},
                            {lat: 50.186942, lng: 12.756693},
                            {lat: 50.186913, lng: 12.756680},
                            {lat: 50.186880, lng: 12.756717},
                            {lat: 50.186919, lng: 12.756725},
                            {lat: 50.186909, lng: 12.756744},
                            {lat: 50.186889, lng: 12.756755},
                            {lat: 50.186867, lng: 12.756723},
                            {lat: 50.186888, lng: 12.756618},
                            {lat: 50.186869, lng: 12.756631},
                            {lat: 50.186881, lng: 12.756669},
                            {lat: 50.186915, lng: 12.756642},
                            {lat: 50.186948, lng: 12.756653},
                            {lat: 50.186942, lng: 12.756693},
                            {lat: 50.186913, lng: 12.756680},
                            {lat: 50.186880, lng: 12.756717},
                            {lat: 50.186919, lng: 12.756725},
                            {lat: 50.186909, lng: 12.756744},
                            {lat: 50.186889, lng: 12.756755},
                            {lat: 50.186867, lng: 12.756723}
                        ],
                        assemblyAreaCenter: {lat: 50.1869142, lng: 12.7566900},
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1868928, lng: 12.7564958},
                                end: {lat: 50.1868206, lng: 12.7562061}
                            }
                        }
                    },
                    {
                        polygonName: 'Fortna',
                        key: 'fortna',
                        polygonType: "assaultZone",
                        areaOfAcceptedPresence: [
                            {lat: 50.186689, lng: 12.756111},
                            {lat: 50.186723, lng: 12.756321},
                            {lat: 50.1866061, lng: 12.7563661},
                            {lat: 50.186580, lng: 12.756160}
                        ],
                        areaPresentational: [
                            {lat: 50.186682, lng: 12.756205},
                            {lat: 50.186696, lng: 12.756275},
                            {lat: 50.186614, lng: 12.756321},
                            {lat: 50.186602, lng: 12.756240}
                        ],
                        assemblyArea: [
                            {lat: 50.186742, lng: 12.756728},
                            {lat: 50.186733, lng: 12.756760},
                            {lat: 50.186712, lng: 12.756739},
                            {lat: 50.186683, lng: 12.756739},
                            {lat: 50.186696, lng: 12.756787},
                            {lat: 50.186751, lng: 12.756782},
                            {lat: 50.186770, lng: 12.756814},
                            {lat: 50.186765, lng: 12.756843},
                            {lat: 50.186737, lng: 12.756817},
                            {lat: 50.186700, lng: 12.756825},
                            {lat: 50.186729, lng: 12.756849},
                            {lat: 50.186757, lng: 12.756873},
                            {lat: 50.186742, lng: 12.756728},
                            {lat: 50.186733, lng: 12.756760},
                            {lat: 50.186712, lng: 12.756739},
                            {lat: 50.186683, lng: 12.756739},
                            {lat: 50.186696, lng: 12.756787},
                            {lat: 50.186751, lng: 12.756782},
                            {lat: 50.186770, lng: 12.756814},
                            {lat: 50.186765, lng: 12.756843},
                            {lat: 50.186737, lng: 12.756817},
                            {lat: 50.186700, lng: 12.756825},
                            {lat: 50.186729, lng: 12.756849},
                            {lat: 50.186757, lng: 12.756873}
                        ],
                        assemblyAreaCenter: {lat: 50.1867442, lng: 12.7567972},
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1867142, lng: 12.7565722},
                                end: {lat: 50.1866533, lng: 12.7562772}
                            }
                        }
                    },
                    {
                        polygonName: 'U Purkrabího',
                        key: 'uPurkrabiho',
                        polygonType: "assaultZone",
                        areaOfAcceptedPresence: [
                            {lat: 50.186344, lng: 12.756178},
                            {lat: 50.186325, lng: 12.756441},
                            {lat: 50.186207, lng: 12.756417},
                            {lat: 50.186217, lng: 12.756154}
                        ],
                        areaPresentational: [
                            {lat: 50.186322, lng: 12.756278},
                            {lat: 50.186317, lng: 12.756366},
                            {lat: 50.186234, lng: 12.756342},
                            {lat: 50.186236, lng: 12.756256}
                        ],
                        assemblyArea: [
                            {lat: 50.186300, lng: 12.756766},
                            {lat: 50.186307, lng: 12.756787},
                            {lat: 50.186288, lng: 12.756774},
                            {lat: 50.186266, lng: 12.756744},
                            {lat: 50.186263, lng: 12.756779},
                            {lat: 50.186287, lng: 12.756790},
                            {lat: 50.186271, lng: 12.756817},
                            {lat: 50.186307, lng: 12.756808},
                            {lat: 50.186328, lng: 12.756830},
                            {lat: 50.186311, lng: 12.756851},
                            {lat: 50.186280, lng: 12.756859},
                            {lat: 50.186252, lng: 12.756841},
                            {lat: 50.186300, lng: 12.756766},
                            {lat: 50.186307, lng: 12.756787},
                            {lat: 50.186288, lng: 12.756774},
                            {lat: 50.186266, lng: 12.756744},
                            {lat: 50.186263, lng: 12.756779},
                            {lat: 50.186287, lng: 12.756790},
                            {lat: 50.186271, lng: 12.756817},
                            {lat: 50.186307, lng: 12.756808},
                            {lat: 50.186328, lng: 12.756830},
                            {lat: 50.186311, lng: 12.756851},
                            {lat: 50.186280, lng: 12.756859},
                            {lat: 50.186252, lng: 12.756841},
                        ],
                        assemblyAreaCenter: {lat: 50.186299, lng: 12.7567947},
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1862411, lng: 12.7565750},
                                end: {lat: 50.1862789, lng: 12.7563067}
                            }
                        }
                    },
                    {
                        polygonName: 'Vyhlídka',
                        key: 'vyhlidka',
                        polygonType: "assaultZone",
                        areaOfAcceptedPresence: [
                            {lat: 50.186149, lng: 12.756152},
                            {lat: 50.186137, lng: 12.756382},
                            {lat: 50.1860147, lng: 12.7563442},
                            {lat: 50.1860325, lng: 12.7561064}
                        ],
                        areaPresentational: [
                            {lat: 50.186129, lng: 12.756224},
                            {lat: 50.186120, lng: 12.756310},
                            {lat: 50.186044, lng: 12.756286},
                            {lat: 50.186053, lng: 12.756197}
                        ],
                        assemblyArea: [
                            {lat: 50.1860012, lng: 12.756723},
                            {lat: 50.1860322, lng: 12.756709},
                            {lat: 50.1860132, lng: 12.756747},
                            {lat: 50.1860002, lng: 12.756749},
                            {lat: 50.1859912, lng: 12.756712},
                            {lat: 50.1859742, lng: 12.756715},
                            {lat: 50.1859912, lng: 12.756760},
                            {lat: 50.1859712, lng: 12.756779},
                            {lat: 50.1859792, lng: 12.756803},
                            {lat: 50.1860032, lng: 12.756782},
                            {lat: 50.1860282, lng: 12.756776},
                            {lat: 50.1860382, lng: 12.756827},
                            {lat: 50.1860012, lng: 12.756723},
                            {lat: 50.1860322, lng: 12.756709},
                            {lat: 50.1860132, lng: 12.756747},
                            {lat: 50.1860002, lng: 12.756749},
                            {lat: 50.1859912, lng: 12.756712},
                            {lat: 50.1859742, lng: 12.756715},
                            {lat: 50.1859912, lng: 12.756760},
                            {lat: 50.1859712, lng: 12.756779},
                            {lat: 50.1859792, lng: 12.756803},
                            {lat: 50.1860032, lng: 12.756782},
                            {lat: 50.1860282, lng: 12.756776},
                            {lat: 50.1860382, lng: 12.756827}
                        ],
                        assemblyAreaCenter: {lat: 50.1860019, lng: 12.7567517},
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1860822, lng: 12.7565319},
                                end: {lat: 50.1861028, lng: 12.7562692}
                            }
                        }
                    },
                    {
                        polygonName: 'Kovárna',
                        key: 'smithy',
                        polygonType: "smithy",
                        areaOfAcceptedPresence: [
                            {lat: 50.186528, lng: 12.756377},
                            {lat: 50.186523, lng: 12.756562},
                            {lat: 50.186356, lng: 12.756549},
                            {lat: 50.186370, lng: 12.756366}
                        ],
                        areaPresentational: [
                            {lat: 50.186514, lng: 12.756396},
                            {lat: 50.186502, lng: 12.756503},
                            {lat: 50.186466, lng: 12.756551},
                            {lat: 50.186417, lng: 12.756532},
                            {lat: 50.186389, lng: 12.756481},
                            {lat: 50.186397, lng: 12.756374}
                        ],
                        boilingOilPotLocation: {lat: 50.1864300, lng: 12.7564731},
                    },
                ],
                speedChoices: [2000, 5000, 10000, 15000, 20000, 25000, 30000, 60000],
                ladderLengthChoices: [20, 30, 40],
            },
        ]
    );
}

export default getGameLocations;