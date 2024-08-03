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
                        assaultLadder: {
                            location: {
                                start: {lat: 50.1910169, lng: 12.7443422},
                                end:  {lat: 50.1908794, lng: 12.7442031}
                            }
                        }
                    },
                ],
                speedChoices: [1000, 5000, 10000, 15000, 20000, 25000, 30000],
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
