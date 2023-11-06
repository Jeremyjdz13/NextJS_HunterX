'use client'
import React, { useEffect, useRef, useState } from 'react'
import { CharacterContextProps, CharacterData, StatData } from "@/app/context/CharacterTypes"
import { useCharacter } from '@/app/context/CharacterContext'

interface EditStatFormProps {
    id: string
    statKey: string
    character: CharacterData
}

type FormData = {
    name?: string
    rank?: number
    description: string
}

export default function EditStatForm({ id, character, statKey} : EditStatFormProps) {
    const { editCharacter } = useCharacter() as CharacterContextProps
    const nameRef = useRef<HTMLInputElement>(null)
    const natureRef = useRef<HTMLInputElement>(null)
    const aliasRef = useRef<HTMLInputElement>(null)
    const rankRef = useRef<HTMLInputElement>(null)

    const { 
        combat, 
        professional, 
        physical, 
        mental 
    } = character

    const isInventoryGroup = [
        "inventory", 
    ].includes(statKey);
    const isSkill = [
        "combat",
        "physical",
        "professional",
        "mental"
    ].includes(statKey);
    const isBasicStat = [
        "agility", 
        "endurance", 
        "reason", 
        "intuition", 
        "psyche",
        "strength",
        "experience",
        "karma",
        "fight",
        "lethal",
        "bashing",
        "protonium",
        "death"
    ].includes(statKey);
    const isBackgroundsFlawsGroup = [
        "backgrounds", 
        "flaws"
    ].includes(statKey);
    const isSpellbookGroup = [
        "spellbook"
    ].includes(statKey);
    const isPowersAndTalismansGroup = [
        "powers", 
        "talismans"
    ].includes(statKey);

    const isMeritsGroup = [
        "merits",  
    ].includes(statKey);

    const characterName = [ "name" ].includes(statKey)
    const characterNature = [ "nature" ].includes(statKey)
    const characterAlias = [ "alias" ].includes(statKey)

   function handleFormElement() {
        if (characterName) {
            return (
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        id={id}  
                        ref={nameRef}
                        type="text"
                        defaultValue={character.name}
                        
                    />
                </div>
            )
        }
        if (characterAlias) {
            return (
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        id={id}  
                        ref={aliasRef}
                        type="text"
                        defaultValue={character.alias}
                        
                    />
                </div>
            )
        }
        if (characterNature) {
            return (
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        id={id}  
                        ref={natureRef}
                        type="text"
                        defaultValue={character.nature}
                        
                    />
                </div>
            )
        }
        if (isBasicStat) {
            
             return (
                <div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='rank'
                        >Rank</label> 
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="number"
                            ref={rankRef}
                            defaultValue={character[statKey]?.rank}
                        />  
                    </div>
                </div>
             )   
                    
        }
        if (isSkill) {
           const skill = character[statKey].find((skill: any) => skill.id === id)

           console.log(skill, skill.name, "Skills")
            return (      
                <div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor="name"
                        >
                            Skill
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            id={id}  
                            ref={nameRef}
                            type="text"
                            defaultValue={skill.name}
                            
                        />
                    </div>
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor='rank'
                    >
                        Rank
                    </label> 
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        type="number"
                        ref={rankRef}
                        defaultValue={skill.rank}
                    />  
                    </div>
                </div>
              
            ) 
                   
       }
        
   }
   

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
       
        
        if (characterName && nameRef.current) {
           
            const newCharacter = {...character, name: nameRef.current.value}
            editCharacter(newCharacter)
        }
        if (characterAlias && aliasRef.current) {
           
            const newCharacter = {...character, alias: aliasRef.current.value}
            editCharacter(newCharacter)
        }
        if (characterNature && natureRef.current) {
           
            const newCharacter = {...character, nature: natureRef.current.value}
            editCharacter(newCharacter)
        }
        if (isBasicStat && rankRef.current) {
            const newCharacter = {...character, [statKey]: {
                id,
                name: character[statKey]?.name,
                rank: parseInt(rankRef.current!.value)
            } }
            editCharacter(newCharacter)
        }

        if (isSkill && rankRef.current && nameRef.current) {
           const updatedSkills = character[statKey].map((skill: any) => {
                if (skill.id === id) {
                    return {
                        ...skill, 
                        id,
                        name: nameRef.current!.value,
                        rank: parseInt(rankRef.current!.value) 
                    }
                }
                return skill
           })


          
           const newCharacter = {...character, [statKey]: updatedSkills} 

            editCharacter(newCharacter)
        }
        

   

        // if(isPowersAndTalismansGroup) {
        //     characterChange[statKey] = {
        //         id,
        //         name: nameRef.current!.value,
        //         rank: parseInt(rankRef.current!.value)
        //     }
        // }
       

        // console.log(characterChange, "check character changes")
        // editCharacter(characterChange)


    }

    return (
        
        <form key={id} onSubmit={handleSubmit}>
                <div>
                    {handleFormElement()}
                </div>
                <button type="submit">Save</button><button type="reset">cancel</button>
        </form>

    )
}
    