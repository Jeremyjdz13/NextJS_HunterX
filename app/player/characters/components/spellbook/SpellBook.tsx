'use client'
import { Character, StatData } from '@/app/context/CharacterTypes'
import React, { useRef, useState } from 'react'
import Label from '../Stat/Label'
import EditStatModal from '../modals/EditStatModal'
import { GiCrossMark } from "react-icons/gi";
import Spell from './Spell'
import { SpellData } from './SpellTypes'
import Name from '../Stat/Name'

type Props = {
    spellbook: SpellData[]
    statKey: string
    statSubKey: string
    character: Character
}


function SpellBook({ 
        spellbook,
        statKey,
        statSubKey,
        character
     }: Props) {
  
  return (
        <div>
            {
            spellbook && spellbook.map((spell: SpellData): React.JSX.Element =>  {
                    return (
                        <Spell 
                            key={spell.id}
                            spell={spell}
                        />
                    )
                })
            }    
        </div>
    )
  
}

export default SpellBook