import locations from './mockLocations';
import { WeaponType } from '../src/constants/customTypes.js';

export default {
    playerSword1: {
        key: 'aFViAyNoOmC3zltQAAAD',
        name: 'Alice',
        weaponType: WeaponType.SWORD,
        location: {
            lat: locations.nowhere.lat,
            lng: locations.nowhere.lng,
            accuracy: 2,
        },
        insideZone: '',
        strength: 2,
        perks: {
            woodenWeapon: true,
            sharpSword: 0,
            boilingOil: false,
        },
        canPourBoilingOil: false,
        socketId: '',
        killScore: {
            kills: 0,
            brokenShields: 0,
        },
    },
};
