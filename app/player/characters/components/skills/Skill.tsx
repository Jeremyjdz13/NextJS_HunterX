'use client'
import { Character, EditCharacter, StatData } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import { useCharacter } from '@/app/context/CharacterContext'
import { skillTemplate } from '@/app/context/DefaultDataTemplates'
import { SiCurseforge } from "react-icons/si";
import { GiCrossedSwords } from "react-icons/gi";
import ClickableLabel from '../Stat/ClickableLabel'
import { uuidv4 } from '@firebase/util'
import useAddStat from '../hooks/UseAddStat'


type Props = {
    skill: StatData[]
    character: Character
    statKey: string
    statGroupTitle: string
}

type Skill = {
    id: string
    name: string
    rank: number
}

function Skill({ skill, character, statGroupTitle, statKey} : Props) {

    const { editCharacter } = useCharacter() as EditCharacter
    const { addStat, setStatOptions } = useAddStat(character, editCharacter)

    const modalRef = useRef(null)
    
    function handleOpenModal() {
        (modalRef.current! as HTMLDialogElement).showModal()
    }

    function handleCloseModal() {
        (modalRef.current! as HTMLDialogElement).close()
    }
    function handleAddSkill() {
        console.log("button click")
       setStatOptions({
        property: statKey,
        defaultValues: skillTemplate
       })

       addStat()
    }

  return (
    <div className="p-3">
        <div onClick={handleOpenModal} className=" cursor-pointer">
            <SiCurseforge />
        </div>
        {
            
            skill.map((skill) => (
                
                    <ClickableLabel
                        key={skill.id}
                        id={skill.id}
                        name={skill.name}
                        rank={skill.rank}
                        statKey={statKey}
                        character={character}
                    />
                
            ))
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
                <p className='p-1 m-1'>Are you sure you want to add a new {statGroupTitle} skill</p>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleAddSkill}
                >Add</button>
            </div>
        </dialog>
    </div>
  )
}

export default Skill