'use client'
import { Character, EditCharacter } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import Spell from './Spell'
import { SpellData } from './SpellTypes'
import { useCharacter } from '@/app/context/CharacterContext'
import { uuidv4 } from '@firebase/util'
import { SiCurseforge } from 'react-icons/si'
import { GiCrossedSwords } from 'react-icons/gi'
import useAddStat from '../hooks/UseAddStat'
import { spellTemplate } from '@/app/context/DefaultDataTemplates'

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
        const { editCharacter } = useCharacter() as EditCharacter

        const { addStat, setStatOptions } = useAddStat(character, editCharacter)
        const modalRef = useRef(null)
          
        function handleOpenModal() {
            (modalRef.current! as HTMLDialogElement).showModal()
        }
      
        function handleCloseModal() {
            (modalRef.current! as HTMLDialogElement).close()
        }

        function handleAddSpell() {
            setStatOptions({
                property: 'spellbook',
                defaultValues: spellTemplate
            })
            addStat()
        }
  return (
        <div className='p-2'>
            <div className='border-b border-black'>
                <div>Spell Book</div>
                <div onClick={handleOpenModal} className="cursor-pointer p-1 m-1">
                    <SiCurseforge />
                </div>
            </div>
            
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
            <dialog
            ref={modalRef}
            className="border border-black p-3 rounded min-h-1/4 backdrop:bg-black-60" 
            >
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={handleCloseModal}
            ><GiCrossedSwords /></button>
            <div>
                <p className='p-1 m-1'>Click add to add new Spell.</p>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleAddSpell}
                >Add</button>
            </div>
        </dialog>    
        </div>
    )
  
}

export default SpellBook