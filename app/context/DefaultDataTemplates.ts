import { v4 as uuidv4 } from 'uuid';
import { StatData } from './CharacterTypes';

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
    spellbook: StatData[]
    protonium: StatData
    usedProtonium: StatData
    inventory: StatData[]
}

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
    name: 'Count',
    rank: 0,
  },
  combat: [
    {
      id: uuidv4(),
      name: 'Example',
      rank: 1,
    },
  ],
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
      armor: true,
      component: false,
      quantity: 1,
      spellAssignmentId: ''
    },
    {
      id: uuidv4(),
      name: 'Ogre Sweat',
      rank: 5,
      description: 'The saltiest sweat you have ever tasted.',
      armor: false,
      component: true,
      quantity: 1,
      spellAssignmentId: ''
    },
  ],
  karma: {
    id: uuidv4(),
    name: 'Karma',
    rank: 0,
  },
  lethal: {
    id: uuidv4(),
    name: 'Count',
    rank: 0,
  },
  merits: [
    {
      id: uuidv4(),
      name: 'Invisibility Cloak',
      rank: 1,
      protoniumGenerator: false,
      talisman: true,
      armor: false,
      description: 'What does this Invisibility Cloak do?',
    },
    {
      id: uuidv4(),
      name: 'Ring of Power',
      rank: 3,
      protoniumGenerator: true,
      talisman: false,
      armor: true,
      description: 'What does this Ring of Power do?',
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
      stunt: [
        {
          id: uuidv4(),
          name: 'Power Stunt',
          attempts: 0,
          description: 'What does this Power Stunt do?',
          mastered: false,
          armor: false,
          duration: 0,
        },
      ],
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
    name: 'Spent Protonium',
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
  spellbook: [
    {
      id: uuidv4(),
      name: 'fireball',
      attempts: 3,
      description: 'ball of fire.',
      mastered: false,
      purchased: false,
      componentItem: [
        {
          id: uuidv4(),
          name: 'air',
          rank: 3,
          description: 'That you breath',
          armor: false,
          component: true,
          quantity: 1,
          spellAssignmentId: ''
        },
      ],
      casting: 'Instantly after saying, ignis pila.',
      duration: 0,
    },
    {
      id: uuidv4(),
      name: 'Love Potion',
      attempts: 0,
      description: 'Makes you love me.',
      mastered: false,
      purchased: false,
      componentItem: [
        {
          id: uuidv4(),
          name: 'eye of newt',
          rank: 3,
          description: 'The eye of a newt used to make love potions',
          armor: false,
          component: true,
          quantity: 1,
          spellAssignmentId: ''
        },
      ],
      casting: 'Simply add the eye to your potion.',
      duration: 1,
    },
  ],
  strength: {
    id: uuidv4(),
    name: 'Strength',
    rank: 3,
  },
  talismans: [
    {
      id: uuidv4(),
      name: 'Talisman',
      rank: 1,
      description: 'What does this Talisman do?',
      stunt: [
        {
          id: uuidv4(),
          name: 'Stunt',
          attempts: 0,
          description: 'What does this Power Stunt do?',
          mastered: false,
          armor: false,
          duration: 0,
        },
      ],
    },
  ],
  usedProtonium: {
    id: uuidv4(),
    name: 'Protonium',
    rank: 0,
  },
};

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

