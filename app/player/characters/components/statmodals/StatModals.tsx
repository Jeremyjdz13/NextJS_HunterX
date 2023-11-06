import React from 'react'
import StatModal from '../modals/StatModal'
import { CharacterData } from '@/app/context/CharacterTypes'

type Props = {
    character: CharacterData
}
function StatModals({ character }: Props) {

    const { 
        spellbook,
        powers,
        inventory,
        merits,
        flaws,
        talismans,
        backgrounds
    } = character
  return (
    <section
              className='flex flex-row border-b border-black p-1'
            >
                <StatModal 
                    key={'Spell Book'}
                    statGroupTitle={"Spell Book"} 
                    statKey={"spellbook"}
                    stat={spellbook}
                    character={character}
                />
                <StatModal
                    key={'Powers'}
                    statGroupTitle={"Powers"} 
                    statKey={"powers"}
                    stat={powers}
                    character={character}
                />
                 <StatModal 
                    key={'Backgrounds'}
                    statGroupTitle={"Backgrounds"} 
                    statKey={"backgrounds"}
                    character={character}
                    stat={backgrounds}
                />
                <StatModal 
                    key={'Inventory'}
                    statGroupTitle={"Inventory"} 
                    statKey={"inventory"}
                    character={character}
                    stat={inventory}
                />
                <StatModal 
                    key={'Merits'}
                    statGroupTitle='Merits'
                    statKey='merits'
                    character={character}
                    stat={merits}
                />
                <StatModal
                    key={'Flaws'}
                    statGroupTitle='Flaws'
                    statKey='flaws'
                    character={character}
                    stat={flaws}
                />
                <StatModal
                    key={'Talismans'}
                    statGroupTitle='Talismans'
                    statKey='talismans'
                    stat={talismans}
                    character={character}
                />
            </section>
  )
}

export default StatModals