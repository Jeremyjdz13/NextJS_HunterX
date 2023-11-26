export type SpellBook = {
    spellbook: SpellData[]
    spellbookName: string
}

export type SpellData = {
    name: string
    id: string
    casting: number
    attempts: number
    description: string
    duration: number
    isMastered: boolean
    isPurchased: boolean
    components: Component[]
}

export type Component = {
    id: string
    isArmor: boolean
    isComponent: boolean
    description: string
    name: string
    quantity: number
    rank: number
    spellAssignmentId: string
}