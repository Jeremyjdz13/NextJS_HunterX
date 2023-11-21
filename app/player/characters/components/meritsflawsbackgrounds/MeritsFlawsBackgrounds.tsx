import { Character } from '@/app/context/CharacterTypes'
import React from 'react'
import StatArray from '../Stat/StatArray'
import Tabs from '../tabs/Tabs'
import Inventory from './Inventory'
import Merits from './Merits'
import Flaws from './Flaws'
import Backgrounds from './Backgrounds'
import BackgroundStory from './BackgroundStory'

type Props = {
    character: Character
}
function MeritsFlawsBackgrounds({ character }: Props) {


    const tabs = [
        {label: "Merits", content: 
            <Merits
                key={"Merits"}
                character={character}
            />
        },
        {label: "Flaws", content: 
            <Flaws
                key={"Flaws"}
                character={character}
            />
        },
        {label: "Backgrounds", content: 
            <Backgrounds
                key={"Backgrounds"}
                character={character}
            />
        },
        {label: "Inventory", content: 
            <Inventory
                key={"Inventory"}
                character={character}
            />
        },
        {
            label: "Story", content: 
            <BackgroundStory 
                key={"Background Story"}
                character={character}
            />
        }
    ]
  return (
    <div className='p-1'>
        <Tabs tabs={tabs} />
    </div>
  )
}

export default MeritsFlawsBackgrounds