import { Character } from '@/app/context/CharacterTypes'
import React from 'react'
import ClickableLabel from '../Stat/ClickableLabel'
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
            rank={strength.rank}
            character={character}
        /> 
        <DiceModal
            statKey="agility"
            key={agility.name}
            id={agility.id}
            name={agility.name}
            rank={agility.rank}
            character={character}
        />
        <DiceModal
            statKey='endurance'
            key={endurance.name}
            id={endurance.id}
            name={endurance.name}
            rank={endurance.rank}
            character={character}
        />
        <DiceModal
            statKey='reason'
            key={reason.name}
            id={reason.id}
            name={reason.name}
            rank={reason.rank}
            character={character}
        />
        <DiceModal
            statKey='intuition'
            key={intuition.name}
            id={intuition.id}
            name={intuition.name}
            rank={intuition.rank}
            character={character}
        />
        <DiceModal
            statKey='psyche'
            key={psyche.name}
            id={psyche.id}
            name={psyche.name}
            rank={psyche.rank}
            character={character}
        />
        
    </section>
  )
}

export default CoreAbilities