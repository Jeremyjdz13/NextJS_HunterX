import React from 'react'
import StatModal from '../modals/StatModal'
import { CharacterData } from '@/app/context/CharacterTypes'

type Props = {
    character: CharacterData
}
function StatModals({ character }: Props) {

    const { 
        powers,
        talismans,
    } = character
  return (
    <section
        className='flex flex-col p-1'
    >
        <StatModal
            key={'Spell Book'}
            statGroupTitle={"Spell Library"}
            statKey={"spellbooks"}
            character={character}
        />
        <StatModal
            key={'Powers'}
            statGroupTitle={"Powers"} 
            statKey={'powers'}
            statSubKey={'stunt'}
            stat={powers}
            character={character}
        />
        <StatModal
            key={'Talismans'}
            statGroupTitle='Talismans'
            statKey='talismans'
            statSubKey={'stunt'}
            stat={talismans}
            character={character}
        />
    </section>
  )
}

export default StatModals