'use client'
import { Character, EditCharacter } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import Spell from './Spell'
import { SpellData } from './SpellTypes'
import { useCharacter } from '@/app/context/CharacterContext'
import { SiCurseforge } from 'react-icons/si'
import { GiAbdominalArmor, GiCrossedSwords, GiMaterialsScience } from 'react-icons/gi'
import useAddStat from '../hooks/UseAddStat'
import { newInventoryItem } from '@/app/context/DefaultDataTemplates'
import Tabs from '../tabs/Tabs'
import Spellbook from './Spellbook'
import { MdOutlineScience } from 'react-icons/md'
import { AiOutlineDingtalk } from 'react-icons/ai'
import CharacterStats from '../Stat/CharacterStats'

type Props = {
    spellbook: SpellData[]
    statKey: string
    character: Character
}

function Spellbooks({ 
        character
     }: Props) {
        const { editCharacter } = useCharacter() as EditCharacter
        const { addStat, setStatOptions } = useAddStat(character, editCharacter)
        const modalRef = useRef(null)
        const { inventory } = character

        const spellComponents = inventory.filter(item => item.isComponent === true)
        console.log(spellComponents.length, "Spell comp")
        const tabs = [
            {
                label: "Book Library",
                content: <CharacterStats 
                        character={character} 
                        statKey={'spellbooks'} 
                        statType='Spell Book' 
                    />
            },
            {
              label: "Spell Library",
              content: <CharacterStats
                    character={character}
                    statKey={"spells"}
                    statType='Spell'
                    />
            },
            {
                label: "Component Library",
                content: (
                    <div>
                         <div className='text-center grid grid-cols-[200px_75px_75px_325px]'>
                            <div className='border'>
                                Item Name
                            </div>
                            <div className='border'>Quantity</div>
                            <div className='border'>Rank</div>
                            <div className='border'>Description</div>
                        </div>
                        {spellComponents && spellComponents.length > 0 ? (
                            spellComponents.map(item => {
                                return (
                                    <div key={item.id} className='text-center grid grid-cols-[200px_75px_75px_325px]'>
                                        <div className='text-left flex flex-row p-1'>
                                            {item.name}
                                            {item.isArmor && <GiAbdominalArmor />}
                                            {item.isComponent && <MdOutlineScience  />}
                                            {item.isTalisman && <AiOutlineDingtalk />}
                                            {item.isProtoniumGenerator && <GiMaterialsScience />}
                                        </div>
                                        <div>{item.quantity}</div>
                                        <div>{item.rank}</div>
                                        <div>{item.description}</div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>No spells found</p>
                        )}
                    </div>
                )
            }
          ];
        
        function handleOpenModal() {
            (modalRef.current! as HTMLDialogElement).showModal()
        }
      
        function handleCloseModal() {
            (modalRef.current! as HTMLDialogElement).close()
        }

        function handleAddSpell() {
            setStatOptions({
                property: 'spells',
                defaultValues: spellTemplate
            })
            addStat()
        }


  return (
        <div className='p-2'>
            <div>
                <Tabs tabs={tabs} />
            </div>
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

export default Spellbooks
