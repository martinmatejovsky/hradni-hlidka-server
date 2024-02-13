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
                            {latitude: 50.1918117, longitude: 12.7414242},
                            {latitude: 50.1904517, longitude: 12.7405606},
                            {latitude: 50.1906658, longitude: 12.7436183},
                            {latitude: 50.1911364, longitude: 12.7440206},
                        ],
                    },
                    {
                        polygonName: 'Baráček',
                        key: 'baracek',
                        polygonType: "battleZone",
                        cornerCoordinates: [
                            {latitude: 50.1910781, longitude: 12.7442539},
                            {latitude: 50.1906900, longitude: 12.7439081},
                            {latitude: 50.1905286, longitude: 12.7444658},
                            {latitude: 50.1908497, longitude: 12.7447314},
                        ]
                    },
                ]
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
                            {latitude: 51.0842650, longitude: 11.8788950},
                            {latitude: 48.6634603, longitude: 11.7910044},
                            {latitude: 48.3614256, longitude: 17.6686900},
                            {latitude: 51.1704517, longitude: 17.7346081},
                        ],
                    }
                ]
            }
        ]
    );
}