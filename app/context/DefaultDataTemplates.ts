import { v4 as uuidv4 } from 'uuid';
import { StatData } from './CharacterTypes';
import { serverTimestamp } from 'firebase/firestore';
import { SpellData } from '../player/characters/components/spellbook/SpellTypes';

type CharacterTemplate = {
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
    backgroundStory: StatData
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
    spellbooks: StatData[]
    protonium: StatData
    protoniumPool: StatData
    inventory: StatData[]
    createdAt: ServerTimestampSetter
    lastUpdate: ServerTimestampSetter

}

type ServerTimestampSetter = () => void

type TagTemplate = {
  id: string
  label: string
}

type NoteTemplate = {
  id: string
  markdown: string
  tagIds: string[]
  title: string
}

export const characterTemplate: CharacterTemplate = {
  id: uuidv4() as string,
  alias: 'Alter Ego',
  agility: {
    id: uuidv4(),
    name: 'Agility',
    rank: 3,
  },
  backgrounds: [],
  backgroundStory: {
    id: uuidv4(),
    title: 'Background Story',
    markdown: 'Write your background story here.',
    tagIds: [],
  },
  bashing: {
    id: uuidv4(),
    name: 'Bashing',
    rank: 0,
  },
  combat: [],
  death: {
    id: uuidv4(),
    name: 'Death',
    rank: 0
  },
  endurance: {
    id: uuidv4(),
    name: 'Endurance',
    rank: 3,
  },
  experience: {
    id: uuidv4(),
    name: 'Experience',
    rank: 0,
  },
  fight: {
    id: uuidv4(),
    name: 'Fight',
    rank: 3,
  },
  flaws: [],
  imageURL: {
    id: uuidv4(),
    url: '',
    name: 'Image URL',
    },
  initiative: {
    id: uuidv4(),
    name: 'Initiative',
    rank: 0,
  },
  intuition: {
    id: uuidv4(),
    name: 'Intuition',
    rank: 3,
  },
  inventory: [],
  karma: {
    id: uuidv4(),
    name: 'Karma',
    rank: 0,
  },
  lethal: {
    id: uuidv4(),
    name: 'Lethal',
    rank: 0,
  },
  merits: [],
  mental: [],
  name: 'Template',
  nature: 'Gamer',
  physical: [],
  powers: [],
  professional: [],
  protonium: {
    id: uuidv4(),
    name: 'Protonium',
    rank: 0,
  },
  protoniumPool: {
    id: uuidv4(),
    name: 'Protonium Pool',
    rank: 0,
  },
  protoniumConsumed: [

  ],
  psyche: {
    id: uuidv4(),
    name: 'Psyche',
    rank: 3,
  },
  reason: {
    id: uuidv4(),
    name: 'Reason',
    rank: 3,
  },
  spellbooks:[],
  spells: [],
  strength: {
    id: uuidv4(),
    name: 'Strength',
    rank: 3,
  },
  stunts:[],
  talismans: [],
  createdAt: serverTimestamp(),
  lastUpdate: serverTimestamp(),
};

export const newSkill: Partial<StatData> = {
  name: 'skill',
  rank: 1
}

export const newPower: Partial<StatData> = {
    name: 'New Power',
    rank: 1,
    description: 'What does this Super Power do?',
    stuntIds: [],
  
}

export const newTag: TagTemplate = {
  id: uuidv4(),
  label: "Tag Name Here",
}

export const newNote: NoteTemplate = {
  id: uuidv4(), 
  markdown: "Write here", 
  tagIds: [], 
  title: "Title Here"
}

export const newSpell: Partial <SpellData> = 
  {
    name: 'new spell',
    rank: 0,
    description: 'what magic is this?',
    isMastered: false,
    isPurchased: false,
    componentIds: [],
    casting: 0,
    duration: 0,
  }

  export const newMeritFlawBackground = {
    name: 'New Stat',
    rank: 0,
    description: 'Merit/Flaw/Background',
  }

  export const newInventoryItem = {
    name: 'New Item',
    rank: 0,
    description: 'What is this item.',
    isArmor: false,
    isComponent: false,
    isProtoniumGenerator: false,
    isTalisman: false,
    quantity: 1,
  }

  export const newBackground = {
    name: 'Example',
    rank: 1,
    description: 'What does this background do?',
  }

  export const newSpellbook = {
      name: 'Spell Book Name',
      description: 'What beholdeth in this tome?',
      spellIds: []
  }

  export const newStunt = {
      name: 'Power Stunt',
      rank: 0,
      description: 'What does this Power Stunt do?',
      isMastered: false,
      isArmor: false,
      isComponent: false,
      duration: 0,
  }