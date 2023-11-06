export type CharacterData = {
    id: string
    name: string
    alias: string
    nature: string
    strength: StatData
    fight: StatData
    endurance: StatData
    experience: StatData
    imageURL: StatData
    initiative: StatData
    karma: StatData
    lethal: StatData
    agility: StatData
    bashing: StatData
    reason: StatData
    intuition: StatData
    psyche: StatData
    combat: StatData[]
    physical: StatData[]
    professional: StatData[]
    mental: StatData[]
    backgrounds: StatData[]
    merits: StatData[]
    flaws: StatData[]
    powers: StatData[]
    talismans: StatData[]
    spellbook: StatData[]
    protonium: StatData
    usedProtonium: StatData
    inventory: StatData[]
    createdAt: string
    lastUpdate: string
} & {
    [key: string]: StatData
}

export type StatData = {
    id: string
    name?: string
    rank?: number
    url?: string
    description?: string
    talisman?: boolean
    protoniumGenerator?: boolean
    markdown?: string
    tagIds?: string[]
    title?: string
    purchased?: boolean
    mastered?: boolean
    attempts?: number
    armor?: boolean
    duration?: number
    stunt?: Stunt[]
    casting?: string
    quantity?: number
    component?: boolean
    componentItem?: ComponentItem[]
    spellAssignmentId?: string
} 

export type ComponentItem = {
    id: string
    name: string
    rank: number
    description: string
    armor: boolean
    component: boolean
    quantity: number
    spellAssignmentId: string
}
export type GroupName = {
    groupName: string
}

export type Stunt = {
    id: string
    name: string
    attempts: number
    description: string
    mastered: boolean
    armor: boolean
    duration: number
}

export type GroupTitle = {
    groupTitle: string
}
export type Traits = { 
    traits: StatData[]
}

export type CharacterContextProps = {
    characters: CharacterData[]
    loading: boolean
    addCharacter: () => void
    deleteCharacter: (character: CharacterData) => void
    editCharacter: (character: CharacterData) => void
} 

export type CharacterCardProps = {
    character: CharacterData
}

export type CharacterButtonProps = {
    character: CharacterData
    key: string
}

export type Character = {
    character: CharacterData
}

