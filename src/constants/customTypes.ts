export type Coordinates = {
    lat: number | null;
    lng: number | null;
};
export type PlayerCoordinates = Coordinates & { accuracy: number | null };
export type WeaponDescription = {
    requiredExperience: number;
    name: string;
    attackStrength: number;
};
export interface WeaponsCatalogue {
    melee: {
        [key in WeaponType]?: {
            level: number;
            requiredExperience: number;
            name: string;
            attackStrength: number;
        }[];
    };
}
export type PlayerData = {
    key: string;
    name: string;
    weaponType: WeaponType;
    equippedWeapons: {
        meleeWeapon: WeaponDescription;
    };
    location: PlayerCoordinates;
    insideZone: string;
    perks: {
        sharpSword: number;
        boilingOil: boolean;
    };
    canPourBoilingOil: boolean;
    socketId: string;
    killScore: {
        experience: number;
        kills: number;
        brokenShields: number;
    };
    underArrowAttack?: boolean;
    arrowDefendTarget?: {
        horizontal: number;
        vertical: number;
    };
};
export enum Perks {
    weaponLevel = 'weaponLevel',
    sharpSword = 'sharpSword',
    boilingOil = 'boilingOil',
}
export enum ArcherPhases {
    reloading,
    aiming,
    shooting,
}
export interface ArcherOutpost {
    phase: ArcherPhases;
    archersPositionCenter: Coordinates;
    phaseTimer: number; // countdown for current phase
    cooldownTicks: number; // random cooldown for reloading
}
export enum GameState {
    None,
    Ready,
    Running,
    Won,
    Lost,
}
type PolygonType = 'assaultZone' | 'smithy';
export interface BasePolygon {
    polygonName: string;
    key: string;
    polygonType: PolygonType;
    areaOfAcceptedPresence: Coordinates[];
    areaPresentational: Coordinates[];
    assaultLadder?: AssaultLadder;
    assemblyAreaCenter?: Coordinates;
    assemblyArea?: Coordinates[]; // can be set manually for specific places, but generally is calculated by randomizer
    assemblyCountdown: number;
    archersPositionCenter: Coordinates;
    boilingOilPotLocation?: Coordinates;
}
export interface PolygonsMatchingPlayers {
    upTo: number;
    locations: string[];
}
export interface GameLocation {
    locationName: string;
    sessionNamePrefix: string;
    key: string;
    mapCenter: Coordinates;
    polygonsToPlayersTotal: PolygonsMatchingPlayers[];
    polygons: BasePolygon[];
    speedChoices: number[];
    ladderLengthChoices: number[];
}
export interface AssaultLadder {
    location: {
        start: Coordinates;
        end: Coordinates;
    };
    steps: Coordinates[];
}
export interface BattleZone {
    zoneName: string;
    key: string;
    polygonType: PolygonType;
    areaOfAcceptedPresence: Coordinates[];
    areaPresentational: Coordinates[];
    conquered: boolean;
    guardians: string[];
    invaders: Invader[];
    assemblyArea: Coordinates[];
    assemblyAreaCenter: Coordinates;
    assemblyCountdown: number;
    archers: ArcherOutpost;
    assaultLadder: AssaultLadder;
    waveCooldown: number;
}
export interface UtilityZone {
    zoneName: string;
    key: string;
    polygonType: PolygonType;
    areaOfAcceptedPresence: Coordinates[];
    areaPresentational: Coordinates[];
    guardians: string[];
    boilingOil: {
        readiness: number;
        readyAt: number;
        location?: Coordinates;
    } | null;
}
export interface OilPot {
    carriedBy: string[]; // IDs of players
    pouredInZone: string[];
}
export interface GameInstance {
    id: string;
    sessionName: string;
    gameState: GameState;
    gameLocation: GameLocation;
    battleZones: BattleZone[];
    utilityZones: UtilityZone[];
    players: PlayerData[];
    gameTempo: number;
    ladderLength: number;
    carriedOilPots: OilPot[];
    gameUpdateIntervalId: NodeJS.Timeout | null;
    gameCalculationIntervalId: NodeJS.Timeout | null;
}
export type InvaderType = 'regular' | 'shielded' | 'captain';
export type Settings = {
    gameTempo: number;
    gameLength: number;
    ladderLength: number;
    assaultWaveVolume: number;
    assemblyCountdown: number;
    wavesMinDelay: number;
    spearHitDepth: number;
    smithyUpgradeWaiting: number;
    smithyUpgradeStrength: number;
    fragsToUpgradeSword: number;
    perkSharpSwordBonus: number;
    oilBoilingTime: number;
    cannonLoadingTime: number;
    arrowFlyingTime: number;
};
export type Stats = {
    incrementingInvaderId: number;
    incrementingWaveId: number;
    axesInGame: number;
};
export type LastWaveNotice = 'none' | 'incoming' | 'running';
export enum WeaponType {
    SWORD = 'sword',
    CANNON = 'cannon',
    AXE = 'axe',
    SPEAR = 'spear',
}
export interface WeaponAbility {
    perkSharpSword: boolean;
    perkBoilingOil: boolean;
    canDefeatInvaders: boolean;
    canBombardAssemblyArea: boolean;
}
export class Invader {
    id: number;
    type: InvaderType;
    health: number;
    assemblyArea: number | null;
    ladderStep: number | null;
    feature: { shieldEndurance: number } = { shieldEndurance: 0 };

    constructor(
        id: number,
        type: InvaderType,
        assemblyArea: number | null,
        amountOfPlayers: number,
        axesInGame: number = 0,
    ) {
        this.id = id;
        this.type = type;
        this.assemblyArea = assemblyArea;
        this.ladderStep = null;

        if (type === 'captain') {
            this.health = Math.ceil(amountOfPlayers * 12.5);
        } else if (type === 'shielded') {
            this.health = amountOfPlayers * 10;
            this.feature.shieldEndurance = Math.max(axesInGame * 10, 5);
        } else {
            this.health = amountOfPlayers * 10;
        }
    }
}
export enum experienceValue {
    invaderDamaged = 5,
    invaderFinished = 5,
    arrowCatch = 1,
}
