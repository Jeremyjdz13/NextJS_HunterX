'use client'
import { Character } from '@/app/context/CharacterTypes'
import React from 'react'
import Tabs from '../tabs/Tabs'
import BackgroundStory from './BackgroundStory'
import CharacterStats from './CharacterStats'

type Props = {
    character: Character
}
function MeritsFlawsBackgrounds({ character }: Props) {


    const tabs = [
        {label: "Merits", content: 
            <CharacterStats
                key={"Merits"}
                character={character}
                statKey={'merits'}
                statType={'Merit'}
            />
        },
        {label: "Flaws", content: 
            <CharacterStats
                key={"Flaws"}
                character={character}
                statKey={'flaws'}
                statType={'Flaw'}
            />
        },
        {label: "Backgrounds", content: 
            <CharacterStats
                key={"Backgrounds"}
                character={character}
                statKey={'backgrounds'}
                statType={'Background'}
            />
        },
        {label: "Inventory", content: 
            <CharacterStats
                key={"Inventory"}
                character={character}
                statKey={'inventory'}
                statType={'Inventory Item'}
            />
        },
        {
            label: "Story", content: 
            <CharacterStats
                key={"Background Story"}
                character={character}
                statKey={'backgroundStory'}
                statType={'Background Story'}
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