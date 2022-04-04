export type UnitTag = {
    Unit_: number;
    Unit_Champion: number;
    Unit_Champion_Clone: number;
    Unit_IsolationNonImpacting: number;
    Unit_KingPoro: number;
    Unit_Minion: number;
    Unit_Minion_Lane: number;
    Unit_Minion_Lane_Melee: number;
    Unit_Minion_Lane_Ranged: number;
    Unit_Minion_Lane_Siege: number;
    Unit_Minion_Lane_Super: number;
    Unit_Minion_Summon: number;
    Unit_Minion_SummonName_game_character_displayname_ZyraSeed: number;
    Unit_Minion_Summon_Large: number;
    Unit_Monster: number;
    Unit_Monster_Blue: number;
    Unit_Monster_Buff: number;
    Unit_Monster_Camp: number;
    Unit_Monster_Crab: number;
    Unit_Monster_Dragon: number;
    Unit_Monster_Epic: number;
    Unit_Monster_Gromp: number;
    Unit_Monster_Krug: number;
    Unit_Monster_Large: number;
    Unit_Monster_Medium: number;
    Unit_Monster_Raptor: number;
    Unit_Monster_Red: number;
    Unit_Monster_Wolf: number;
    Unit_Plant: number;
    Unit_Special: number;
    Unit_Special_AzirR: number;
    Unit_Special_AzirW: number;
    Unit_Special_CorkiBomb: number;
    Unit_Special_EpicMonsterIgnores: number;
    Unit_Special_KPMinion: number;
    Unit_Special_MonsterIgnores: number;
    Unit_Special_Peaceful: number;
    Unit_Special_SyndraSphere: number;
    Unit_Special_TeleportTarget: number;
    Unit_Special_Trap: number;
    Unit_Special_Tunnel: number;
    Unit_Special_TurretIgnores: number;
    Unit_Special_UntargetableBySpells: number;
    Unit_Special_Void: number;
    Unit_Special_YorickW: number;
    Unit_Structure: number;
    Unit_Structure_Inhibitor: number;
    Unit_Structure_Nexus: number;
    Unit_Structure_Turret: number;
    Unit_Structure_Turret_Inhib: number;
    Unit_Structure_Turret_Inner: number;
    Unit_Structure_Turret_Nexus: number;
    Unit_Structure_Turret_Outer: number;
    Unit_Structure_Turret_Shrine: number;
    Unit_Ward: number;
}

export type SpellSlot = {
    Q: number;
    W: number;
    E: number;
    R: number;
    D: number;
    F: number;
}

export type UnitType = {
    CHAMPION: number;
    MINION: number;
    JUNGLE: number;
    TURRET: number;
    MISSILE: number;
    OTHER: number;
}

export type Vector2 = {
    x: number;
    y: number;
}

export type Vector3 = {
    x: number;
    y: number;
    z: number;
}

export type Vector4 = {
    x: number;
    y: number;
    z: number;
    w: number;
}

export type RecallInfo = {
    displayName: string;
    duration: number;
}

export type PluginSettings = {
    name: string;
    version: number;
    author: string;
}

export type APIFunction = {
    name: string;
    handler: Function;
}

export type DDragonUnit = {
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
    tags: UnitTag[];
}

export type Buff = {
    name: string;
    count: number;
    expiresAt: number;
}


export type Spell = {
    level: number;
    expiresAt: number;
    getCooldown(): number;
    isReady(): boolean;
}

export type BuffManager = {
    getBuff(name: string): Buff;
}

export type SpellBook = {
    getSpell(slot: number): Spell;
    canUseSpell(slot: number): boolean;
}

export type GameObject = {
    unit: DDragonUnit;

    getNetworkId(): number;
    getName(): string;
    getTeam(): number;
    getPosition(): Vector3;
    getHealth(): number;
    getMaxHealth(): number;
    isTargetable(): boolean;
    isVisible(): boolean;
    getType(): UnitType;
    getLevel(): number;
    getSpawnCount(): number;
    getAttackSpeedMultiplier(): number;
    getAttackRange(): number;
    getSizeMultiplier(): number;
    isAlive(): boolean;
    isDead(): boolean;
    getRecallState(): RecallInfo | undefined;
    // WARNING: This is a very expensive function and cause memory leak. Use it with caution.   
    getBuffManager(): BuffManager;
    // WARNING: This is a very expensive function and cause memory leak. Use it with caution.
    getSpellBook(): SpellBook;
    getUnitType(): UnitType;
}

export type ObjectManager = {
    getObjectByNetworkId(id: number): GameObject | undefined;
    getHeroes(): GameObject[];
    getEnemyHeroes(): GameObject[];
    getAllyHeroes(): GameObject[];
    getTurrets(): GameObject[];
    getEnemyTurrets(): GameObject[];
    getAllyTurrets(): GameObject[];
}

export type Renderer = {
    height: number;
    width: number;

    /**
     * Point is a Vector2 i.e, you need to convert Vector3 to Vector2 using worldToScreen.
     */
    isInScreen(point: Vector2, offsetX?: number, offsetY?: number): boolean;
    /**
     * Convert League Position to Screen Position.
     */
    worldToScreen(position: Vector3): Vector2;
}

export type SDK = {
    on(event: 'draw' | 'tick', handler: Function): void;
    getGameTime(): number;
    getAPIFunction(plugin: PluginSettings, name: string): Function | undefined;
    registerAPIFunction(plugin: PluginSettings, api: APIFunction): void;
}


declare global {
    const recallStateType: Map<number, RecallInfo>;
    const SpellSlot: SpellSlot;
    const UnitTag: UnitTag;
    const UnitType: UnitType;

    const sdk: SDK;
    const renderer: Renderer;
    const objectManager: ObjectManager;
    const localPlayer: GameObject;
}