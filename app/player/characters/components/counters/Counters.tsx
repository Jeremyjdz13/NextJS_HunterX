'use client'
import { CharacterData } from '@/app/context/CharacterTypes'
import React from 'react'
import ClickableLabel from '../Stat/ClickableLabel'
import Title from '../Stat/Title'
import Health from './Health'
import Initiative from '../initiative/Initiative'
import Protonium from './Protonium'

type Props = {
    character : CharacterData
}
function Counters({ character } : Props) {

    const { 
        bashing,
        lethal,
        experience,
        karma,
    } = character

    


  return (
    <section 
        className='flex flex-row border-b border-black p-2'
    >
        
        <Health
            key="bashing"
            id={bashing.id}
            rank={bashing.rank}
            name={bashing.name}
            statKey='bashing'
            statGroupTitle='Bashing'
            character={character}
        />
        <Health
            key="lethal"
            id={lethal.id}
            rank={lethal.rank}
            name={lethal.name}
            statKey='lethal'
            statGroupTitle='Lethal'
            character={character}
        />
        <div className='p-1'>
            
            <ClickableLabel
                key={experience.id} 
                id={experience.id} 
                rank={experience.rank}
                name={experience.name}
                character={character}
                statKey="experience" 
            />
            <ClickableLabel 
                key={karma.id}
                id={karma.id}
                rank={karma.rank}
                name={karma.name}
                character={character}
                statKey="karma"
            />
        </div>
    </section>
  )
}

export default Counters