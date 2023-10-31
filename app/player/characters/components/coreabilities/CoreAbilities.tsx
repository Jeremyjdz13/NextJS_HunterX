import { CharacterData } from '@/app/context/CharacterTypes'
import React from 'react'
import ClickableLabel from '../Stat/ClickableLabel'

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
                <ClickableLabel 
                    key={fight.name}
                    id={fight.id}
                    name={fight.name}
                    rank={fight.rank}
                    groupName='fight'
                    character={character} 
                />
                <ClickableLabel
                    key={strength.name}
                    name={strength.name}
                    rank={strength.rank}
                    character={character}
                    groupName='strength'
                /> 
                 <ClickableLabel
                    key={agility.name}
                    name={agility.name}
                    rank={agility.rank}
                    groupName='agility'
                    character={character}
                />
                <ClickableLabel
                    key={endurance.name}
                    name={endurance.name}
                    rank={endurance.rank}
                    groupName='endurance'
                    character={character}
                />

                <ClickableLabel
                    key={reason.name}
                    name={reason.name}
                    rank={reason.rank}
                    groupName='reason'
                    character={character}
                />
                <ClickableLabel
                    key={intuition.name}
                    name={intuition.name}
                    rank={intuition.rank}
                    groupName='intuition'
                    character={character}
                />
                <ClickableLabel
                    key={psyche.name}
                    name={psyche.name}
                    rank={psyche.rank}
                    character={character}
                    groupName='psyche'
                />
                
            </section>
  )
}

export default CoreAbilities