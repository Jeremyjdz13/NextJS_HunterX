import { SpellData } from "../player/characters/components/spellbook/SpellTypes"
import { Tag } from "./NoteDataTypes"

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
    map(arg0: (stat: any) => any): unknown
    id: string
    name?: string
    rank?: number
    url?: string
    description?: string
    isTalisman?: boolean
    isProtoniumGenerator?: boolean
    markdown?: string
    tagIds?: string[]
    title?: string
    isPurchased?: boolean
    isMastered?: boolean
    attempts?: number
    isArmor?: boolean
    duration?: number
    stunt?: Stunt[]
    casting?: number
    quantity?: number
    isComponent?: boolean
    spellComponents?: Component[]
    spellAssignmentId?: [id: string]
} 

export type Component = {
    id: string
    name: string
    rank: number
    description: string
    isArmor: boolean
    isComponent: boolean
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
    isMastered: boolean
    isArmor: boolean
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
    editCharacter: (character: Character) => void
} 

export type EditCharacter = {
    editCharacter: (newCharacter: Character) => void
  }
  
export type CharacterCardProps = {
    character: CharacterData
}

export type CharacterButtonProps = {
    character: CharacterData
    key: string
}

export type Character = {
    consumedProtonium: any
    stunts: any
    physical: StatData[]
    combat: StatData[]
    professional: StatData[]
    mental: StatData[]
    merits: StatData[]
    protonium: StatData
    protoniumPool: StatData
    character: CharacterData
    lethal: StatData
    bashing: StatData
    death: StatData
    backgrounds: StatData[]
    flaws: StatData[]
    inventory: StatData[]
    name: string
    backgroundStory: BackgroundStory
    spellbooks: SpellData[]
    spells: SpellData
    powers: StatData[]
    talismans: Talisman[]
}

export type BackgroundStory = {
    id: string
    title: string
    tagIds: Tag[]
    markdown: string
}

export type Talisman = {
    isTalisman: boolean
    id: string
    name: string
    rank: number
    description: string
    isArmor: boolean
    isProtoniumGenerator: boolean
    isComponent: boolean
    stuntIds: StuntIds[]
}

export type StuntIds = {
    id: string
}
