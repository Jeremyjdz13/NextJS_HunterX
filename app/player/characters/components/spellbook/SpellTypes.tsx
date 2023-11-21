export type SpellBook = {
    spellbook: SpellData[]
}

export type SpellData = {
    name: string
    id: string
    rank: number
    casting: number
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