export enum UnitTag {
    Unit_ = 1,
    Unit_Champion = 2,
    Unit_Champion_Clone = 3,
    Unit_IsolationNonImpacting = 4,
    Unit_KingPoro = 5,
    Unit_Minion = 6,
    Unit_Minion_Lane = 7,
    Unit_Minion_Lane_Melee = 8,
    Unit_Minion_Lane_Ranged = 9,
    Unit_Minion_Lane_Siege = 10,
    Unit_Minion_Lane_Super = 11,
    Unit_Minion_Summon = 12,
    Unit_Minion_SummonName_game_character_displayname_ZyraSeed = 13,
    Unit_Minion_Summon_Large = 14,
    Unit_Monster = 15,
    Unit_Monster_Blue = 16,
    Unit_Monster_Buff = 17,
    Unit_Monster_Camp = 18,
    Unit_Monster_Crab = 19,
    Unit_Monster_Dragon = 20,
    Unit_Monster_Epic = 21,
    Unit_Monster_Gromp = 22,
    Unit_Monster_Krug = 23,
    Unit_Monster_Large = 24,
    Unit_Monster_Medium = 25,
    Unit_Monster_Raptor = 26,
    Unit_Monster_Red = 27,
    Unit_Monster_Wolf = 28,
    Unit_Plant = 29,
    Unit_Special = 30,
    Unit_Special_AzirR = 31,
    Unit_Special_AzirW = 32,
    Unit_Special_CorkiBomb = 33,
    Unit_Special_EpicMonsterIgnores = 34,
    Unit_Special_KPMinion = 35,
    Unit_Special_MonsterIgnores = 36,
    Unit_Special_Peaceful = 37,
    Unit_Special_SyndraSphere = 38,
    Unit_Special_TeleportTarget = 39,
    Unit_Special_Trap = 40,
    Unit_Special_Tunnel = 41,
    Unit_Special_TurretIgnores = 42,
    Unit_Special_UntargetableBySpells = 43,
    Unit_Special_Void = 44,
    Unit_Special_YorickW = 45,
    Unit_Structure = 46,
    Unit_Structure_Inhibitor = 47,
    Unit_Structure_Nexus = 48,
    Unit_Structure_Turret = 49,
    Unit_Structure_Turret_Inhib = 50,
    Unit_Structure_Turret_Inner = 51,
    Unit_Structure_Turret_Nexus = 52,
    Unit_Structure_Turret_Outer = 53,
    Unit_Structure_Turret_Shrine = 54,
    Unit_Ward = 55,
};

export type RecallInfo = {
    displayName: string;
    duration: number;
}

export enum SpellSlot {
    Q = 'Q',
    W = 'W',
    E = 'E',
    R = 'R',
    D = 'D',
    F = 'F'
}

export interface PluginSettings {
    name: string;
    version: number;
    author: string;
}

export interface APIFunction {
    name: string;
    handler: Function;
}

export interface DDragonUnit {
    name: string;
    healthBarHeight: number;
    baseMoveSpeed: number;
    baseAttackRange: number;
    baseAttackSpeed: number;
    attackSpeedRatio: number;
    acquisitionRange: number;
    selectionRadius: number;
    pathingRadius: number;
    gameplayRadius: number;
    basicAtkMissileSpeed: number;
    basicAtkWindup: number;
    purchaseIdentities: string[];
    tags: UnitTag[] = [];
}

export interface Buff {
    name: string;
    count: number;
    expiresAt: number;
}

export interface Spell {
    level: number;
    expiresAt: number;
}

export interface Vector2 {
    x: number;
    y: number;
}

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface Renderer {
    height: number;
    width: number;
    worldToScreen(position: Vector3): Vector2;
}

export interface GameObject extends DDragonUnit {
    
    static recallStateType: Map<number, RecallInfo>;

    id: number;
    networkId: number;
    team: number;
    position: Vector3;
    health: number;
    maxHealth: number;
    isTargetable: boolean;
    isVisible: boolean;
    interface: UnitType;
    level: number;
    spawnCount: number;
    attackSpeedMultiplier: number;
    attackRange: number;
    sizeMultiplier: number;
    spellBook: number;
    buffEntryStart: number;
    buffEntryEnd: number;

    isAlive(): boolean;
    getBuffManager(): Map<string, Buff>
    getSpellBook(): Map<SpellSlot, Spell>
    getUnitType(): UnitType;
}

export interface Game {
    objects: Map<number, GameObject>;
    champions: Set<GameObject>;

    getGameTime(): number;
    getLocalPlayer(): GameObject;
    getHeroes(): GameObject[];
    getAllyHeroes(): GameObject[];
    getEnemyHeroes(): GameObject[];
}

export interface SDK {
    getAPIFunction(plugin: PluginSettings, name: string): Function | undefined;
    registerAPIFunction(plugin: PluginSettings, api: APIFunction): void;
}

declare global {
    const sdk: SDK;
    const renderer: Renderer;
    const game: Game;
    
}