import { Character } from '@/app/context/CharacterTypes'
import React from 'react'
import DiceModal from '../modals/DiceModal'

type Props = {
    character: Character
}
function CoreAbilities({ character } : Props) {

    const {
        fight,
        endurance,
        agility,
        psyche,
        intuition,
        reason,
        strength 
    } = character

  return (
    <section>
        <DiceModal
            statKey='fight'
            key={fight.name}
            id={fight.id}
            name={fight.name}
            rank={fight.rank}
            character={character}
        />
        <DiceModal
            statKey='strength'
            key={strength.name}
            id={strength.id}
            name={strength.name}
            character={character}
            rank={strength.rank}
        /> 
        <DiceModal
            statKey="agility"
            key={agility.name}
            id={agility.id}
            name={agility.name}
            character={character}
            rank={agility.rank}
        />
        <DiceModal
            statKey='endurance'
            key={endurance.name}
            id={endurance.id}
            name={endurance.name}
            character={character}
            rank={endurance.rank}
        />
        <DiceModal
            statKey='reason'
            key={reason.name}
            id={reason.id}
            name={reason.name}
            character={character}
            rank={reason.rank}
        />
        <DiceModal
            statKey='intuition'
            key={intuition.name}
            id={intuition.id}
            name={intuition.name}
            character={character}
            rank={intuition.rank}
        />
        <DiceModal
            statKey='psyche'
            key={psyche.name}
            id={psyche.id}
            name={psyche.name}
            character={character}
            rank={psyche.rank}
        />
        
    </section>
  )
}

export default CoreAbilities