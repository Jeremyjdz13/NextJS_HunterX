import { Character } from '@/app/context/CharacterTypes'
import React from 'react'
import Health from './Health'
import Protonium from './Protonium'
import Tabs from '../tabs/Tabs'

type Props = {
    character : Character
}
function Counters({ character } : Props) {

    const { 
        bashing,
        lethal,
    } = character

    
    const tabs = [
        {label: 'Bashing', content:<Health
            key="bashing"
            id={bashing.id}
            rank={bashing.rank}
            name={bashing.name}
            statKey='bashing'
            statGroupTitle='Bashing'
            character={character}
        /> },
        {
            label: 'Lethal', content:   <Health
                key="lethal"
                id={lethal.id}
                rank={lethal.rank}
                name={lethal.name}
                statKey='lethal'
                statGroupTitle='Lethal'
                character={character}
            />
        },
        {
            label: "Protonium", content:  <Protonium character={character}/>
        }
    ]

  return (
    <section 
        className='flex flex-row m-1'
    > 
        <Tabs tabs={tabs} />  
    </section>
  )
}

export default Counters