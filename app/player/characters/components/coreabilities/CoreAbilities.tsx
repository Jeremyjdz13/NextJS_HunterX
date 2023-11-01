import { CharacterData } from '@/app/context/CharacterTypes'
import React from 'react'
import ClickableLabel from '../Stat/ClickableLabel'
import DiceModal from '../modals/DiceModal'

type Props = {
    character: CharacterData
}
function CoreAbilities({ character } : Props) {

    const {
        strength,
        fight,
        endurance,
        agility,
        psyche,
        intuition,
        reason
    } = character

  return (
    <section
        className='flex flex-row border-b border-black p-1'
    >
        <DiceModal
            key={fight.name}
            id={fight.id}
            name={fight.name}
            rank={fight.rank}
            character={character} 
        />
        <DiceModal
            key={strength.name}
            name={strength.name}
            rank={strength.rank}
            character={character}
        /> 
        <DiceModal
            key={agility.name}
            name={agility.name}
            rank={agility.rank}
            character={character}
        />
        <DiceModal
            key={endurance.name}
            name={endurance.name}
            rank={endurance.rank}
            character={character}
        />
        <DiceModal
            key={reason.name}
            name={reason.name}
            rank={reason.rank}
            character={character}
        />
        <DiceModal
            key={intuition.name}
            name={intuition.name}
            rank={intuition.rank}
            character={character}
        />
        <DiceModal
            key={psyche.name}
            name={psyche.name}
            rank={psyche.rank}
            character={character}
        />
        
    </section>
  )
}

export default CoreAbilities