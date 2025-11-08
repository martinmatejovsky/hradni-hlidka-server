import { Coordinates } from '../constants/customTypes.js';

/**
 * Generate random geographic points around a center
 * @param {Object} center - The center coordinates { lat, lng }
 * @param {number} radius - Max distance from center in meters
 * @param {number} count - Number of points to generate
 * @returns {Array} Array of { lat, lng } objects
 */
export function generatePointsAroundCenter(center: Coordinates, radius = 8, count = 24): Coordinates[] {
    const points = [];
    const earthRadius = 6371000; // meters

    for (let i = 0; i < count; i++) {
        // Random distance and angle
        const r = radius * Math.sqrt(Math.random()); // sqrt to keep uniform distribution
        const theta = Math.random() * 2 * Math.PI;

        // Offsets in meters
        const dx = r * Math.cos(theta);
        const dy = r * Math.sin(theta);

        if (center.lat && center.lng) {
            // Convert meters to degrees
            const dLat = (dy / earthRadius) * (180 / Math.PI);
            const dLng = (dx / (earthRadius * Math.cos((center.lat * Math.PI) / 180))) * (180 / Math.PI);

            points.push({
                lat: center.lat + dLat,
                lng: center.lng + dLng,
            });
        }
    }

    return points;
}
