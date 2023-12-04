'use client'
import React from 'react'
import { Character } from '@/app/context/CharacterTypes'
import Tabs from '../tabs/Tabs'
import CharacterStats from '../Stat/CharacterStats'

type Props = {
    character: Character
}
function Skills({ character }: Props) {

    const tabs = [
        {
            label: "Combat", 
            content:    <CharacterStats
                            key="Combat"
                            statKey={'combat'}
                            statType={'Skill'}
                            character={character}
                        /> 
        },
        {
            label: "Physical",
            content: <CharacterStats
                        key="Physical"
                        statKey='physical'
                        statType={'Skill'}
                        character={character}
                    />
        },
        {
            label: "Professional",
            content: <CharacterStats
                        key="Professional"
                        statKey={'professional'}
                        statType={'professional'}
                        character={character}
                    />
        },
        
        {
            label: "Mental",
            content: <CharacterStats
                        key="Mental"
                        statKey='mental'
                        statType={"mental"}
                        character={character}
                    />   
        },
    ]
  return (
    <section className='flex m-1'>
        <Tabs tabs={tabs}/>
    </section>        
  )
}

export default Skills