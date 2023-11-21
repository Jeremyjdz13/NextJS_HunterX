'use client'
import React from 'react'
import { Character } from '@/app/context/CharacterTypes'
import Tabs from '../tabs/Tabs'
import Skill from './Skill'

type Props = {
    character: Character
}
function Skills({ character }: Props) {

    const {
        combat,
        physical,
        professional,
        mental
    } = character

    const tabs = [
        {
            label: "Combat", 
            content:    <Skill
                            key="Combat"
                            statGroupTitle='Combat'
                            statKey='combat'
                            skill={combat}
                            character={character}
                        /> 
        },
        {
            label: "Physical",
            content: <Skill
                        key="Physical"
                        statGroupTitle='Manage Skills'
                        statKey='physical'
                        skill={physical}
                        character={character}
                    />
        },
        {
            label: "Professional",
            content: <Skill
                        key="professional"
                        statGroupTitle='Professional'
                        statKey='professional'
                        skill={professional}
                        character={character}
                    />
        },
        
        {
            label: "Mental",
            content: <Skill
                        key="mental"
                        statGroupTitle='Mental'
                        statKey='mental'
                        skill={mental}
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