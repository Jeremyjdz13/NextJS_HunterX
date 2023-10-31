import { CharacterData } from '@/app/context/CharacterTypes'
import React from 'react'
import ClickableLabel from '../Stat/ClickableLabel'
import Title from '../Stat/Title'
import Health from './Health'
import Initiative from '../initiative/Initiative'

type Props = {
    character : CharacterData
}
function Counters({ character } : Props) {

    const { 
        bashing,
        lethal,
        experience,
        karma
    } = character

  return (
    <section 
        className='flex flex-row border-b border-black p-2'
    >
        <Initiative
            key="initiative"
            character={character}
        />
        <Health
            key="bashing"
            stat={bashing}
            groupName='bashingCounter'
            groupTitle='Bashing'
        />
        <Health
            key="lethal"
            stat={lethal}
            groupName='lethalCounter'
            groupTitle='Lethal'
        />
        <div>
            <Title storedTitle='Fate Ledger'/>
            <ClickableLabel
                key={experience.id} 
                id={experience.id} 
                rank={experience.rank}
                name={experience.name} 
                groupName="experience" 
            />
            <ClickableLabel 
            key={karma.id}
            id={karma.id}
            rank={karma.rank}
            name={karma.name}
            groupName="karma"
            />
        </div>
    </section>
  )
}

export default Counters