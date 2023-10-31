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
                    groupTitle='Combat'
                    groupName='combat'
                    statArray={combat}
                />
                <StatArray
                    key="Physical"
                    groupTitle='Physical'
                    groupName='physical'
                    statArray={physical}
                />
                <StatArray
                    key="professional"
                    groupTitle='Professional'
                    groupName='professional'
                    statArray={professional}
                />
                <StatArray
                    key="mental"
                    groupTitle='Mental'
                    groupName='mental'
                    statArray={mental}
                />   
            </section>        
  )
}

export default Skills