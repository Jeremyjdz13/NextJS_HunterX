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
import Label from './Label'
import ClickableLabel from './ClickableLabel'
import classNames from 'classnames'
import Rank from './Rank'
import { FaGraduationCap } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import ReactMarkdown from 'react-markdown'

type Props = {
  character: Character
  statKey: keyof Character
  statType: string
}

type Stat = {
    markdown?: string
    title?: string 
    casting?: number
    isPurchased?: boolean
    spellIds?: []
    stuntIds?: []
    duration?: number 
    isMastered?: boolean
    id: string
    name?: string
    rank?: number
    quantity?: number
    description?: string
    isTalisman?: boolean
    isArmor?: boolean
    isComponent?: boolean
    isProtoniumGenerator?: boolean
    spellAssignmentIds?: {id: string}[]
}

function CharacterStats({ character, statKey, statType }: Props) {
  const { editCharacter } = useCharacter() as EditCharacter

  const stats: Stat[] | Stat = character[statKey]  
  const modalRef = useRef(null)
  const isPower = ["powers"].includes(statKey)
  const isTalisman = ["talismans"].includes(statKey)
  const isSpellBook = ["spellbooks"].includes(statKey)
  const isInventory = ["inventory"].includes(statKey)
  const isNameRankDescription = ["merits", "flaws", "backgrounds"].includes(statKey)
  const isBackgroundStory = ["backgroundStory"].includes(statKey)
  const isSpell = ["spells"].includes(statKey)
  const isStunt = ["stunts"].includes(statKey)
  const isSkill = ["combat", "physical", "professional", "mental"].includes(statKey)

  let id = ''
  let title = ''
  let markdown = ''

  if (isBackgroundStory) {
    const stat = character[statKey] as Stat
    id = stat.id
    title = stat.title as string
    markdown = stat.markdown as string
  }
  function handleOpenModal() {
      (modalRef.current! as HTMLDialogElement).showModal()
  }

  function handleCloseModal() {
      (modalRef.current! as HTMLDialogElement).close()
  }
  function addStat() {
    const uniqueId = uuidv4()
    const newStats = character[statKey].some((stat: Stat) => stat.id === uniqueId)
        ? character[statKey]
        : [
        ...character[statKey],
            {
                id: uuidv4(),
                name: `new ${statType}`,
                ...(isSkill ? {} : {rank: 1}),
                ...(isSpellBook ? {spellIds: [] } : {}),
                ...((
                  isNameRankDescription || 
                  isInventory || 
                  isSpell || 
                  isStunt || 
                  isPower || 
                  isSpellBook
                  ) ? {description: "Write a description"} : {}),
                ...(isInventory ? {
                    quantity: 1,
                    isArmor: false,
                    isProtoniumGenerator: false,
                    isComponent: false,
                    isTalisman: false,  
                } : {}),
                ...(isStunt ? {
                    isMastered: false,
                    isArmor: false,
                    isComponent: false,
                    duration: 0,
                }: {}),
                ...(isPower ? {
                    stuntIds: []
                }: {}),
                ...(isSpell ? {
                    isMastered: false,
                    isPurchased: false,
                    componentIds: [],
                    casting: 0,
                    duration: 0
                }: {})
            },
        ];

        const newCharacter = { ...character, [statKey]: newStats };
        editCharacter(newCharacter)
    }

    function handleStuntTotals(ids: any){

        const stuntTotal = ids?.length

        return <div>
                    {stuntTotal}
                </div>

    }
    console.log("CharacterStats component")
  return (
      <div>
          {(isTalisman || isBackgroundStory) ? null : <div onClick={handleOpenModal} className="cursor-pointer p-1 m-1">
            <SiCurseforge />
          </div>}
          <div className={classNames({
            "grid grid-cols-[80%_20%]" : isSkill,
            "grid grid-cols-[30%_20%_50%]": isBackgroundStory || isNameRankDescription || isTalisman,
            "grid grid-cols-[40%_10%_10%_40%]": isInventory || isStunt,
            "grid grid-cols-[30%_10%_20%_40%] text-center": isPower ,
            "grid grid-cols-[30%_10%_10%_10%_40%] text-left": isSpell
            })}>
                {isBackgroundStory ? null : 
                    <>
                        {isSpellBook ? <Label storedLabel='Title' /> : <Label storedLabel='Name' />}
                        {(isSpell || isStunt)? <Label storedLabel='Attempts' /> : (isSpellBook ? <Label storedLabel='Spell Count'/> : <Label storedLabel="Rank" />) }
                        {isInventory && <Label storedLabel='Quantity' />}
                        {isSpell && <Label storedLabel='Casting' />}
                        {(isSpell || isStunt) && <Label storedLabel='Duration' /> } 
                        {isPower && <Label storedLabel='Total Stunts' />}  
                        {(
                          isNameRankDescription || 
                          isInventory || 
                          isSpell || 
                          isStunt || 
                          isPower || 
                          isSpellBook ||
                          isTalisman
                          ) ? <Label storedLabel='Description' /> : null}
                    </>
                }
          </div>
          <div>
              {isBackgroundStory? 
                    <div key={"backgroundStory"}
                    >  
                        <ClickableLabel 
                            id={id} 
                            name={title} 
                            rank={0} 
                            statKey={statKey}
                            />
                        <div className='p-3 prose'>
                            <ReactMarkdown>{markdown}</ReactMarkdown>
                        </div>    
                    </div>  : 
                
                  Array.isArray(stats) && stats?.map((stat) => (
                        <div 
                            key={stat.id}
                            className={
                              classNames({
                                  "grid grid-cols-[80%_20%]" : isSkill,
                                  "grid grid-cols-[30%_20%_50%]": isSpellBook || isNameRankDescription || isTalisman,
                                  "grid grid-cols-[40%_10%_10%_40%]": isInventory || isStunt,
                                  "grid grid-cols-[30%_10%_20%_40%] text-center": isPower ,
                                  "grid grid-cols-[30%_10%_10%_10%_40%] text-left": isSpell
                                })
                            }
                        >
                            <div className="flex flex-row">
                                <ClickableLabel 
                                    id={stat.id} 
                                    name={stat.name} 
                                    rank={stat.rank} 
                                    statKey={statKey} 
                                />
                                <div className="flex flex-row p-3">
                                    {stat.isArmor && <GiAbdominalArmor />}
                                    {stat.isTalisman && <AiOutlineDingtalk />}
                                    {stat.isProtoniumGenerator && <GiMaterialsScience />}
                                    {stat.isComponent && <MdOutlineScience  />}
                                    {stat.isPurchased && <HiOutlineCurrencyDollar />}
                                </div>
                            </div>
                              {stat.isMastered ?
                               <div className='p-1'><FaGraduationCap /></div> : 
                               (isSpellBook ? <div className='p-1'>{stat.spellIds?.length}</div>: <Rank rank={stat.rank} />)
                              }
                              {isSpell ? <div className='p-1'>{stat.casting}</div> : null}
                              {isInventory ? <Rank rank={stat.quantity}  /> : null}
                              {(isSpell || isStunt) ? <Rank rank={stat.duration}/> : null}
                              {isPower ? handleStuntTotals(stat.stuntIds) : null}
                              {(
                                isNameRankDescription || 
                                isInventory || 
                                isSpell || 
                                isStunt || 
                                isPower ||
                                isSpellBook ||
                                isTalisman
                                ) ? <div>{stat.description}</div> : null}
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