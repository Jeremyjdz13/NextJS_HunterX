'use client'
import { Character, StatData } from '@/app/context/CharacterTypes'
import React, { useState } from 'react'
import SkillCard from './SkillCard'
import { useCharacter } from '@/app/context/CharacterContext'
import { skillTemplate } from '@/app/context/DefaultDataTemplates'
import { SiCurseforge } from "react-icons/si";
import { GiCrossedSwords } from "react-icons/gi";
import AddRemoveStat from '../forms/AddRemoveStat'
import ClickableLabel from '../Stat/ClickableLabel'
import { uuidv4 } from '@firebase/util'


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

    const { editCharacter } = useCharacter()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    
    function handleOpenModal() {

        setIsDialogOpen(true)
    }

    function handleCloseModal() {
        setIsDialogOpen(false)
    }
    console.log("Did you reload")
    function addSkill() {
        console.log(skillTemplate.id, "template ID")
        const uniqueId = uuidv4()
        const updatedSkillTemplate = {...skillTemplate, id: uniqueId}
        const updatedSkills = character[statKey].some((skill: any) => skill.id === uniqueId)
        ? character[statKey]
        : [
            ...character[statKey],
            {
                id: updatedSkillTemplate.id,
                name: updatedSkillTemplate.name,
                rank: updatedSkillTemplate.rank,
            },
        ];
        const newCharacter = { ...character, [statKey]: updatedSkills };
        console.log(newCharacter, "Skill Change")
        editCharacter(newCharacter)
    }

  return (
    <div className="p-1">
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
            open={isDialogOpen}
            className="border border-black rounded p-2"
        >
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={handleCloseModal}
            ><GiCrossedSwords /></button>
            <div>
                <div>Are you sure you want to add a new: {statGroupTitle}</div>
                <button
                    onClick={addSkill}
                >Add</button>
            </div>
        </dialog>
    </div>
  )
}

export default Skill