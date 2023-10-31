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
                    groupTitle={"Spell Book"} 
                    groupName={"spellbook"}
                    stat={spellbook}
                />
                <StatModal
                    key={'Powers'}
                    groupTitle={"Powers"} 
                    groupName={"powers"}
                    stat={powers}
                />
                 <StatModal 
                    key={'Backgrounds'}
                    groupTitle={"Backgrounds"} 
                    groupName={"backgrounds"}
                    stat={backgrounds}
                />
                <StatModal 
                    key={'Inventory'}
                    groupTitle={"Inventory"} 
                    groupName={"inventory"}
                    stat={inventory}
                />
                <StatModal 
                    key={'Merits'}
                    groupTitle='Merits'
                    groupName='merits'
                    stat={merits}
                />
                <StatModal
                    key={'Flaws'}
                    groupTitle='Flaws'
                    groupName='flaws'
                    stat={flaws}
                />
                <StatModal
                    key={'Talismans'}
                    groupTitle='Talismans'
                    groupName='talismans'
                    stat={talismans}
                />
            </section>
  )
}

export default StatModals