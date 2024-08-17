exports.getGameLocations = (req, res) => {
    return res.json(
        [
            {
                locationName: 'Loket Sportovní',
                key: 'loketSportovni',
                polygons: [
                    {
                        polygonName: 'Panelák',
                        key: 'panelak',
                        polygonType: "battleZone",
                        cornerCoordinates: [
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
                        polygonType: "battleZone",
                        cornerCoordinates: [
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
                        polygonType: "battleZone",
                        cornerCoordinates: [
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
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1910169, lng: 12.7443422},
                                end:  {lat: 50.1908794, lng: 12.7442031}
                            }
                        }
                    },
                ],
                speedChoices: [1000, 5000, 10000, 15000, 20000, 25000, 30000, 60000],
                ladderLengthChoices: [10, 20, 30],
            },
            {
                locationName: 'Česko',
                key: 'cesko',
                polygons: [
                    {
                        polygonName: 'Česko',
                        key: 'cesko',
                        polygonType: "battleZone",
                        cornerCoordinates: [
                            {lat: 51.0842650, lng: 11.8788950},
                            {lat: 48.6634603, lng: 11.7910044},
                            {lat: 48.3614256, lng: 17.6686900},
                            {lat: 51.1704517, lng: 17.7346081},
                        ],
                        assemblyArea: [
                            {lat: 50.1913700, lng: 12.7438914},
                            {lat: 50.1913442, lng: 12.7439317},
                            {lat: 50.1912825, lng: 12.7440281},
                            {lat: 50.1912825, lng: 12.7439422},
                            {lat: 50.1912808, lng: 12.7438644},
                            {lat: 50.1912378, lng: 12.7439717},
                            {lat: 50.1912086, lng: 12.7439664},
                        ],
                        assaultLadder: {
                            location: {
                                start: {lat: 50.3516153, lng: 12.8136492},
                                end:  {lat: 50.1908794, lng: 12.7442031}
                            }
                        }
                    }
                ],
                speedChoices: [1000, 5000, 10000, 15000, 20000, 25000, 30000],
                ladderLengthChoices: [10, 20, 30],
            }
        ]
    );
}
