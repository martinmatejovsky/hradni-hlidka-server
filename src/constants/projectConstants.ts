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
                requiredExperience: 5,
                name: 'ocelový meč',
                attackStrength: 20,
            },
            {
                level: 2,
                requiredExperience: 10,
                name: 'Severní ostří',
                attackStrength: 30,
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
                requiredExperience: 5,
                name: 'dřevorubcova sekera',
                attackStrength: 20,
            },
            {
                level: 2,
                requiredExperience: 10,
                name: 'bojová sekera',
                attackStrength: 30,
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
                requiredExperience: 5,
                name: 'farmářův šťouch',
                attackStrength: 20,
            },
            {
                level: 2,
                requiredExperience: 10,
                name: 'strážné kopí',
                attackStrength: 30,
            },
        ],
        [WeaponType.CANNON]: [],
    },
};
