"use client"
import { useCharacter } from '@/app/context/CharacterContext'
import { Character, CharacterContextProps, Power, StatData, Stunt, Talisman } from '@/app/context/CharacterTypes'
import React, { useRef, useState } from 'react'
import { SpellData } from '../spellbook/SpellTypes'
import AddStuntOrSpellCheckbox from './AddStuntOrSpellCheckbox'


type AddStuntOrSpellProps = {
    statKey: string
    name: string
    id: string
}

type Selection = Power[] | Talisman[] | SpellData[]
export default function AddStuntOrSpell({statKey, name, id}: AddStuntOrSpellProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const modalRef = useRef<HTMLDialogElement | null>(null)
    const { editCharacter, character } = useCharacter() as CharacterContextProps

    let stats: StatData[] | undefined = undefined
    
    if ( character && statKey) {
        stats = character[statKey as keyof Character] 
    }

    const { powers, talismans, spellbooks } : {powers: Power[], talismans: Talisman[], spellbooks: SpellData[]} = character!

    

    const onClose = () => {
        setIsModalOpen(false)
    }

    let newSelection: Selection = [];

    if (statKey === 'powers') {
        
        newSelection = [...powers];
          console.log(newSelection, "newSelection")
      } else if (statKey === 'spellbooks') {
          newSelection = [...spellbooks]
      } else if (statKey === 'talismans') {
            newSelection = [...talismans]
        }

    
      function handleAddStuntOrSpellToPowerOrSpellBook(
        statId: string, 
        spellOrStuntId: string, 
        isAdding: boolean | undefined) {

        const updatedCharacter = { ...character };


        const targetStat = updatedCharacter[statKey as keyof Character].find((stat: any) => stat.id === statId);

        if (targetStat) {
            if (statKey === 'powers') {
                if (isAdding) {
                    let isStuntAlreadyAdded = targetStat.stuntIds.includes(spellOrStuntId);

                    if(!isStuntAlreadyAdded){
                        console.log("adding")
                        targetStat.stuntIds.push(spellOrStuntId);
                    }
                } else {
                    console.log("removing")
                    targetStat.stuntIds = targetStat.stuntIds.filter((id: string) => id !== spellOrStuntId);
                }
            } else if (statKey === 'spellbooks') {
                if (isAdding) {
                    if(!targetStat.spellIds.includes(spellOrStuntId)){
                        targetStat.spellIds.push(spellOrStuntId);
                    }
                } else {
                    targetStat.spellIds = targetStat.spellIds.filter((id: string) => id !== spellOrStuntId);
                }
            } else if (statKey === 'talismans') {
                if (isAdding) {
                    if(!targetStat.stuntIds.includes(spellOrStuntId)){
                        targetStat.stuntIds.push(spellOrStuntId);
                    }
                } else {
                    targetStat.talismanIds = targetStat.talismanIds.filter((id: string) => id !== spellOrStuntId);
                }
            }
        }
        console.log(updatedCharacter, "Did this work?")
        editCharacter(updatedCharacter as Character);
    }

  return (
    <div>
        <div>
            <button onClick={() => setIsModalOpen(true)}>{name}</button>
        </div>
        <dialog 
            open={isModalOpen} 
            ref={modalRef}
            className="border border-black rounded-lg p-4 inset-0 w-1/2"
        >
            <div className='flex justify-center text-center m-3'>
                <h2>{`Assign ${name} to a ${statKey === 'powers' ? 'Power' : (statKey === "talismans" ? "Talisman" : 'Spell Book')}.`}</h2>
            </div>
            <form className='flex flex-col justify-center items-center mt-9'>
                {
                    stats?.map((stat: StatData) => {
                        
                        let isSelected: boolean = false

                        if(statKey === 'powers') {
                            isSelected = stat.stuntIds?.includes(id) ?? false;
                        } else if (statKey === 'spellbooks') {
                            isSelected = stat.spellIds?.includes(id) ?? false;
                        }

                        return (
                                <AddStuntOrSpellCheckbox
                                    key={stat.id}
                                    stat={stat}
                                    stuntSpellId={id}
                                    defaultValue={isSelected}
                                    onChange={handleAddStuntOrSpellToPowerOrSpellBook}
                                />
                            )
                        }
                    )
                }
                
            </form>
            <button 
                    type="reset"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-1"
                    onClick={onClose}
                >
                Close
            </button>
        </dialog>
    </div>
  )
}
