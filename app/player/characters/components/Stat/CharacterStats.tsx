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
import useStatKeyCheck from '../hooks/UseStatKeyCheck'
import useStatDiscovery from '../hooks/UseStatDiscovery'


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

  const stats: Stat[] = character[statKey]  
  const modalRef = useRef(null)
  const keyCheck = useStatKeyCheck(statKey)

  let power = false

  if(keyCheck === 'isPower'){
     power = true
  }

  let talisman = false

  if(keyCheck === 'isTalisman'){
    talisman = true
  }

  let spellBook = false

  if(keyCheck === 'isSpellbook'){
    spellBook = true
  }

  let inventory = false

  if(keyCheck === 'isInventoryItem'){
    inventory = true
  }

  let nameRankDescription = false 

  if(keyCheck === 'isNameRankDescription'){
    nameRankDescription = true
  }

  let backgroundStory = false

  if(keyCheck === 'isBackgroundStory'){
    backgroundStory = true
  }

  let spell = false

  if(keyCheck === 'isSpell'){
    spell = true
  }

  let stunt = false

  if(keyCheck === 'isStunt'){
    stunt = true
  }

  let skill = false

  if(keyCheck === 'isSkill'){
    skill = true
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
                ...(spellBook ? {} : {rank: 1}),
                ...(spellBook ? {spellIds: [] } : {}),
                ...((
                  nameRankDescription || 
                  inventory || 
                  spell || 
                  stunt || 
                  power || 
                  spellBook
                  ) ? {description: "Write a description"} : {}),
                ...(inventory ? {
                    quantity: 1,
                    isArmor: false,
                    isProtoniumGenerator: false,
                    isComponent: false,
                    isTalisman: false,  
                } : {}),
                ...(stunt ? {
                    isMastered: false,
                    isArmor: false,
                    isComponent: false,
                    duration: 0,
                }: {}),
                ...(power ? {
                    stuntIds: []
                }: {}),
                ...(spell ? {
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

  return (
      <div>
          {(keyCheck === 'isTalisman' || backgroundStory) ? null : <div onClick={handleOpenModal} className="cursor-pointer p-1 m-1">
            <SiCurseforge />
          </div>}
          <div className={classNames({
            "grid grid-cols-[80%_20%]" : skill,
            "grid grid-cols-[30%_20%_50%]": spellBook || nameRankDescription || talisman,
            "grid grid-cols-[40%_10%_10%_40%]": inventory || stunt,
            "grid grid-cols-[30%_10%_20%_40%] text-center": power ,
            "grid grid-cols-[30%_10%_10%_10%_40%] text-left": spell
            })}>
                {backgroundStory ? null : 
                    <>
                        {spellBook ? <Label storedLabel='Title' /> : <Label storedLabel='Name' />}
                        {(spell || stunt)? <Label storedLabel='Attempts' /> : (spellBook ? <Label storedLabel='Spell Count'/> : <Label storedLabel="Rank" />) }
                        {inventory && <Label storedLabel='Quantity' />}
                        {spell && <Label storedLabel='Casting' />}
                        {(spell || stunt) && <Label storedLabel='Duration' /> } 
                        {power && <Label storedLabel='Total Stunts' />}  
                        {(
                          nameRankDescription || 
                          inventory || 
                          spell || 
                          stunt || 
                          power || 
                          spellBook ||
                          talisman
                          ) ? <Label storedLabel='Description' /> : null}
                    </>
                }
          </div>
          <div>
              {backgroundStory? 
                <div key={"backgroundStory"}
                >
                     <ClickableLabel 
                        id={stats.id} 
                        name={stats.title} 
                        rank={0} 
                        statKey={statKey} 
                        character={character}
                    />
                    <div className='p-3 prose'>
                        <ReactMarkdown>{stats.markdown}</ReactMarkdown>
                    </div>          
                </div>  : 
                
                  Array.isArray(stats) && stats?.map((stat) => (
                        <div 
                            key={stat.id}
                            className={
                              classNames({
                                  "grid grid-cols-[80%_20%]" : skill,
                                  "grid grid-cols-[30%_20%_50%]": spellBook || nameRankDescription || talisman,
                                  "grid grid-cols-[40%_10%_10%_40%]": inventory || stunt,
                                  "grid grid-cols-[30%_10%_20%_40%] text-center": power ,
                                  "grid grid-cols-[30%_10%_10%_10%_40%] text-left": spell
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
                                    {stat.isPurchased && <HiOutlineCurrencyDollar />}
                                </div>
                            </div>
                              {stat.isMastered ?
                               <div className='p-1'><FaGraduationCap /></div> : 
                               (spellBook ? <div className='p-1'>{stat.spellIds?.length}</div>: <Rank rank={stat.rank} />)
                              }
                              {spell ? <div className='p-1'>{stat.casting}</div> : null}
                              {inventory ? <Rank rank={stat.quantity}  /> : null}
                              {(spell || stunt) ? <Rank rank={stat.duration}/> : null}
                              {power ? handleStuntTotals(stat.stuntIds) : null}
                              {(
                                nameRankDescription || 
                                inventory || 
                                spell || 
                                stunt || 
                                power ||
                                spellBook ||
                                talisman
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