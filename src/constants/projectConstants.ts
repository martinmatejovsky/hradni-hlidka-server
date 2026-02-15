import { WeaponsCatalogue, WeaponType } from './customTypes';

export const GAME_UPDATE_INTERVAL: number = 2000; // should not be longer than GameSessionClass.gameTempo
export const cannonBallSpeed: number = 2000;
export const WEAPONS_CATALOGUE: WeaponsCatalogue = {
    melee: {
        [WeaponType.SWORD]: [
            {
                level: 0,
                requiredExperience: 0,
                name: 'cvičný meč',
                attackStrength: 10,
            },
            {
                level: 1,
                requiredExperience: 30,
                name: 'ocelový meč',
                attackStrength: 15,
            },
            {
                level: 2,
                requiredExperience: 80,
                name: 'vyvážený meč',
                attackStrength: 19,
            },
            {
                level: 3,
                requiredExperience: 180,
                name: 'Severní ostří',
                attackStrength: 22,
            },
        ],
        [WeaponType.AXE]: [
            {
                level: 0,
                requiredExperience: 0,
                name: 'cvičná sekera',
                attackStrength: 10,
            },
            {
                level: 1,
                requiredExperience: 30,
                name: 'dřevorubcova sekera',
                attackStrength: 15,
            },
            {
                level: 2,
                requiredExperience: 80,
                name: 'bojová sekera',
                attackStrength: 19,
            },
            {
                level: 2,
                requiredExperience: 180,
                name: 'Zub trolla',
                attackStrength: 22,
            },
        ],
        [WeaponType.SPEAR]: [
            {
                level: 0,
                requiredExperience: 0,
                name: 'cvičné kopí',
                attackStrength: 10,
            },
            {
                level: 1,
                requiredExperience: 30,
                name: 'farmářův šťouch',
                attackStrength: 14,
            },
            {
                level: 2,
                requiredExperience: 80,
                name: 'strážné kopí',
                attackStrength: 18,
            },
            {
                level: 3,
                requiredExperience: 180,
                name: 'Špíz',
                attackStrength: 21,
            },
        ],
        [WeaponType.CANNON]: [
            {
                level: 0,
                requiredExperience: 0,
                name: 'Kanon',
                attackStrength: 0,
            },
        ],
    },
};
