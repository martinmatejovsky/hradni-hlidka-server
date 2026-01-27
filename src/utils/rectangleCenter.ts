import { Coordinates } from '../constants/customTypes.js';

export default function rectangleCenter(points: Coordinates[]): Coordinates {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    for (const p of points) {
        if (p.lat < minLat) minLat = p.lat;
        if (p.lat > maxLat) maxLat = p.lat;
        if (p.lng < minLng) minLng = p.lng;
        if (p.lng > maxLng) maxLng = p.lng;
    }

    return {
        lat: (minLat + maxLat) / 2,
        lng: (minLng + maxLng) / 2,
    };
}
