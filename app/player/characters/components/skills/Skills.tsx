'use client'
import React from 'react'
import StatArray from '../Stat/StatArray'
import { CharacterData } from '@/app/context/CharacterTypes'

type Props = {
    character: CharacterData
}
function Skills({ character }: Props) {

    const {
        combat,
        physical,
        professional,
        mental
    } = character
  return (
    <section
              className='flex flex-row border-b border-black p-1'
            >
                <StatArray
                    key="Combat"
                    statGroupTitle='Combat'
                    statKey='combat'
                    statArray={combat}
                    character={character}
                />
                <StatArray
                    key="Physical"
                    statGroupTitle='Physical'
                    statKey='physical'
                    statArray={physical}
                    character={character}
                />
                <StatArray
                    key="professional"
                    statGroupTitle='Professional'
                    statKey='professional'
                    statArray={professional}
                    character={character}
                />
                <StatArray
                    key="mental"
                    statGroupTitle='Mental'
                    statKey='mental'
                    statArray={mental}
                    character={character}
                />   
            </section>        
  )
}

export default Skills