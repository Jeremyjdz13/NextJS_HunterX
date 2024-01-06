import React from 'react'
import StatModal from '../modals/StatModal'
import { Character } from '@/app/context/CharacterTypes'

type Props = {
    character: Character
}
function StatModals({ character }: Props) {
    console.log("StatModals component")
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
            character={character}
        />
        <StatModal
            key={'Talismans'}
            statGroupTitle='Talismans'
            statKey='talismans'
            character={character}
        />
    </section>
  )
}

export default StatModals