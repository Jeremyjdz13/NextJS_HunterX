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
  backgrounds: [
    {
      id: uuidv4(),
      name: 'Example',
      rank: 1,
      description: 'What does this background do?',
    },
  ],
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
  combat: [
    {
      id: uuidv4(),
      name: 'Example',
      rank: 1,
    },
  ],
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
  flaws: [
    {
      id: uuidv4(),
      name: 'Bad breath',
      rank: 1,
      description: 'A fiber of chicken is lodged between your lateral and central incisor and has become wrought with bacteria pooping in your mouth.',
    },
  ],
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
  inventory: [
    {
      id: uuidv4(),
      name: 'Plate Mail',
      rank: 4,
      description: 'Heavy as hell, but it will stop a sword.',
      isArmor: true,
      isComponent: false,
      isProtoniumGenerator: false,
      isTalisman: false,
      quantity: 1,
      spellAssignmentIds:[]
    },
    {
      id: uuidv4(),
      name: 'Ogre Sweat',
      rank: 5,
      description: 'The saltiest sweat you have ever tasted.',
      isArmor: false,
      isComponent: true,
      isProtoniumGenerator: false,
      isTalisman: false,
      quantity: 1,
      spellAssignmentIds:[]
    },
  ],
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
  merits: [
    {
      id: uuidv4(),
      name: 'Invisibility Cloak',
      rank: 1,
      isProtoniumGenerator: false,
      isTalisman: true,
      isArmor: false,
      spellAssignmentIds:[],
      description: 'What does this Invisibility Cloak do?',
      isComponent: false
    },
    {
      id: uuidv4(),
      name: 'Ring of Power',
      rank: 3,
      isProtoniumGenerator: true,
      isTalisman: false,
      isArmor: true,
      spellAssignmentIds:[],
      description: 'What does this Ring of Power do?',
      isComponent: true
    },
  ],
  mental: [
    {
      id: uuidv4(),
      name: 'Alertness',
      rank: 5,
    },
    {
      id: uuidv4(),
      name: 'Example',
      rank: 5,
    },
  ],
  name: 'Template',
  nature: 'Gamer',
  physical: [
    {
      id: uuidv4(),
      name: 'Example',
      rank: 1,
    },
  ],
  powers: [
    {
      id: uuidv4(),
      name: 'Super Power',
      rank: 1,
      description: 'What does this Super Power do?',
      stuntIds: [],
    },
  ],
  professional: [
    {
      id: uuidv4(),
      name: 'Example',
      rank: 1,
    },
  ],
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
  spellbooks:[
    {
      id: uuidv4(),
      spellbookName: 'Spell Book Name',
      spellIds: []
    }
  ],
  spells: [
    {
      id: uuidv4(),
      name: 'fireball',
      attempts: 3,
      description: 'ball of fire.',
      isMastered: false,
      isPurchased: false,
      spellComponentIds: [],
      casting: 0,
      duration: 0,
    },
  ],
  strength: {
    id: uuidv4(),
    name: 'Strength',
    rank: 3,
  },
  stunts: {
      id: uuidv4(),
      name: 'Power Stunt',
      attempts: 0,
      description: 'What does this Power Stunt do?',
      isMastered: false,
      isArmor: false,
      duration: 0,
  },
  talismans: [
    {
      id: uuidv4(),
      name: 'Talisman',
      rank: 1,
      description: 'What does this Talisman do?',
      stuntIds: [],
    },
  ],
  createdAt: serverTimestamp(),
  lastUpdate: serverTimestamp(),
};

export const skillTemplate: Partial<StatData> = {
  name: 'skill',
  rank: 1
}

export const powerTemplate: Partial<StatData> = {
    name: 'New Power',
    rank: 1,
    description: 'What does this Super Power do?',
    stuntIds: [],
  
}

export const talismanTemplate: Partial<StatData> = {
  name: 'New Talisman',
  rank: 1,
  description: 'What does this Talisman do?',
  stuntIds: [],

}

export const tagTemplate: TagTemplate = {
  id: uuidv4(),
  label: "Tag Name Here",
}

export const noteTemplate: NoteTemplate = {
  id: uuidv4(), 
  markdown: "Write here", 
  tagIds: [], 
  title: "Title Here"
}

export const spellTemplate: Partial <SpellData> = 
  {
    name: 'new spell',
    attempts: 0,
    description: 'what magic is this?',
    isMastered: false,
    isPurchased: false,
    spellComponentIds: [],
    casting: 0,
    duration: 0,
  }

  export const newMerit = {
    name: 'new merit',
    rank: 0,
    isProtoniumGenerator: false,
    isTalisman: false,
    isArmor: false,
    isComponent: false,
    description: 'What does this Invisibility Cloak do?',
    spellAssignmentIds:[]
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
    spellAssignmentIds:[]
  }

  export const newBackground = {
    name: 'Example',
    rank: 1,
    description: 'What does this background do?',
  }