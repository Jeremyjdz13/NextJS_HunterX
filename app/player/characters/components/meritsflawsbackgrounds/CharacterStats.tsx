'use client'
import { Character, EditCharacter } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import { useCharacter } from '@/app/context/CharacterContext'
import { GiAbdominalArmor, GiCrossedSwords } from 'react-icons/gi'
import { MdOutlineScience } from 'react-icons/md'
import { uuidv4 } from '@firebase/util'
import { SiCurseforge } from 'react-icons/si'
import { GiMaterialsScience } from "react-icons/gi";
import { AiOutlineDingtalk } from "react-icons/ai";
import Label from '../Stat/Label'
import ClickableLabel from '../Stat/ClickableLabel'
import classNames from 'classnames'
import Rank from '../Stat/Rank'


type Props = {
  character: Character
  statKey: keyof Character
  statType: string
}

type Stat = {
    id: string
    name: string
    rank: number
    quantity: number
    description: string
    isTalisman: boolean
    isArmor: boolean
    isComponent: boolean
    isProtoniumGenerator: boolean
    spellAssignmentIds: {id: string}[]
}

function CharacterStats({ character, statKey, statType }: Props) {
  const { editCharacter } = useCharacter() as EditCharacter

  const stats: Stat[] = character[statKey] 

  const isInventoryItem = [
    "inventory"
  ].includes(statKey)

  const isNameRank = [
    "combat",
    "physical",
    "professional",
    "mental"
  ].includes(statKey)
  
  console.log(stats, "Stat")

  const modalRef = useRef(null)
    
  function handleOpenModal() {
      (modalRef.current! as HTMLDialogElement).showModal()
  }

  function handleCloseModal() {
      (modalRef.current! as HTMLDialogElement).close()
  }
  function addStat() {
    const uniqueId = uuidv4()
    const updatedStats = character[statKey].some((stat: Stat) => stat.id === uniqueId)
        ? character[statKey]
        : [
        ...character[statKey],
            {
                id: uuidv4(),
                name: `new ${statType}`,
                rank: 1,
                ...(!isNameRank ? {description: "Write a description"}: {}),
                ...(isInventoryItem ? {
                    quantity: 1,
                    isArmor: false,
                    isProtoniumGenerator: false,
                    isComponent: false,   
                    spellAssignmentIds: []
                } : {})
            },
        ];

        const newCharacter = { ...character, [statKey]: updatedStats };
        editCharacter(newCharacter)
    }
  return (
      <div>
          <div onClick={handleOpenModal} className="cursor-pointer p-1 m-1">
            <SiCurseforge />
          </div>
          <div className={classNames({
            "grid grid-cols-[80%_20%]" : isNameRank,
            "grid grid-cols-[30%_20%_50%]": !isInventoryItem,
            "grid grid-cols-[40%_10%_10%_40%]": isInventoryItem
            })}>
              <Label storedLabel='Name' />
              <Label storedLabel="Rank" />
              {isInventoryItem && <Label storedLabel='Quantity' />}
              {!isNameRank && <Label storedLabel='Description' />}
          </div>
          <div>
              {
                  stats.map((stat) => (
                      <div 
                          key={stat.id}
                          className={
                            classNames({
                                "grid grid-cols-[80%_20%]" : isNameRank,
                                "grid grid-cols-[30%_20%_50%]": !isInventoryItem,
                                "grid grid-cols-[40%_10%_10%_40%]": isInventoryItem
                              })
                          }
                      >
                          <div className="flex flex-row">
                              <ClickableLabel 
                                  id={stat.id} 
                                  name={stat.name} 
                                  rank={stat.rank} 
                                  statKey={statKey} 
                                  character={character} 
                              />
                              <div className="flex flex-row p-3">
                                  {stat.isArmor && <GiAbdominalArmor />}
                                  {stat.isTalisman && <AiOutlineDingtalk />}
                                  {stat.isProtoniumGenerator && <GiMaterialsScience />}
                                  {stat.isComponent && <MdOutlineScience  />}
                              </div>
                          </div>
                          <Rank rank={stat.rank} />
                            {isInventoryItem && <Rank rank={stat.quantity} />}
                            {!isNameRank && <div>{stat.description}</div>}
                      </div>
                          
                  ))
              }
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
                <p className='p-1 m-1'>{`Click add to add new ${statType}.`}</p>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={addStat}
                >Add</button>
            </div>
        </dialog>
      </div>
  )
}

export default CharacterStats