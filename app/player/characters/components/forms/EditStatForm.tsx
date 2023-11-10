'use client'
import React, { useEffect, useRef, useState } from 'react'
import { CharacterContextProps, CharacterData, StatData } from "@/app/context/CharacterTypes"
import { useCharacter } from '@/app/context/CharacterContext'

interface EditStatFormProps {
    id: string
    subId?: string
    statKey: string
    statSubKey?: string
    isStuntActive?: boolean
    character: CharacterData
}


export default function EditStatForm({ 
        id, 
        character, 
        statKey, 
        statSubKey,
        isStuntActive,
        subId
    } : EditStatFormProps) {
    const { editCharacter } = useCharacter() as CharacterContextProps
    const nameRef = useRef<HTMLInputElement>(null)
    const natureRef = useRef<HTMLInputElement>(null)
    const aliasRef = useRef<HTMLInputElement>(null)
    const rankRef = useRef<HTMLInputElement>(null)
    const attemptsRef = useRef<HTMLInputElement>(null)
    const masteredRef = useRef<HTMLInputElement>(null)
    const armorRef = useRef<HTMLInputElement>(null)
    const protoniumGeneratorRef = useRef<HTMLInputElement>(null)
    const talismanRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

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

    const isStunt = [
        "stunt"
    ].includes(statSubKey)

    const characterName = [ "name" ].includes(statKey)
    const characterNature = [ "nature" ].includes(statKey)
    const characterAlias = [ "alias" ].includes(statKey)
 
    function handleStatMax(){
        if(statKey === 'experience'){

            return 1000
        }
        if(
            statKey === 'combat' || 
            statKey === 'physical' || 
            statKey === 'professional' || 
            statKey === 'mental' ||
            statKey === 'spellbook'
        ){
            return 5
        }


        return 10
    }

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
                            min={0}
                            max={handleStatMax()}
                        />  
                    </div>
                </div>
             )   
                    
        }
        if (isSkill) {
           const skill = character[statKey].find((skill: any) => skill.id === id)

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
                        min={0}
                        max={handleStatMax()}
                    />  
                    </div>
                </div>
              
            ) 
                   
       }
       if (isPowersAndTalismansGroup && !isStuntActive) {
        const power = character[statKey].find((power: any) => power.id === id)
            
            if (statKey === 'powers' || statKey === 'talismans') {
                return (      
                    <div>
                        <div>
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                                htmlFor="name"
                            >
                                {statKey === 'powers' ? "Power" : "Talisman"}
                            </label>
                            <input 
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                id={id}  
                                ref={nameRef}
                                type="text"
                                defaultValue={power.name}
                                
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
                            defaultValue={power.rank}
                            min={0}
                            max={handleStatMax()}
                        />  
                        </div>
                        <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='description'
                        >
                            Description
                        </label> 
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="text"
                            ref={descriptionRef}
                            defaultValue={power.description}
                        />  
                        </div>
                    </div>
                
                ) 
            }
                
        }
        if (isStunt) {
            const power = character[statKey].find((power: any) => power.id === id)
            const stunt = power.stunt.find((stunt: any) => stunt.id === subId)
            return (      
                <div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor="name"
                        >
                            {statKey === 'power' ? "Power" : "Talisman"}
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            id={id}  
                            ref={nameRef}
                            type="text"
                            defaultValue={stunt.name}
                            
                        />
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='rank'
                        >
                            Attempts
                        </label> 
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="number"
                            ref={attemptsRef}
                            defaultValue={stunt.attempts}
                            min={0}
                            max={handleStatMax()}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='description'
                        >
                            Description
                        </label> 
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="text"
                            ref={descriptionRef}
                            defaultValue={stunt.description}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='description'
                        >
                            Mastered
                        </label> 
                        <input
                            className="" 
                            type="checkbox"
                            ref={masteredRef}
                            defaultChecked={stunt.mastered}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='description'
                        >
                            Armor
                        </label> 
                        <input
                            className="" 
                            type="checkbox"
                            ref={armorRef}
                            defaultChecked={stunt.armor}

                        />  
                    </div>
                </div>
            
            ) 
                
                    
        }
        if (isMeritsGroup) {
            const merit = character[statKey].find((merit: any) => merit.id === id)
            
            return (      
                <div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor="name"
                        >
                            {statKey}
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            id={id}  
                            ref={nameRef}
                            type="text"
                            defaultValue={merit.name}
                            
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
                            defaultValue={merit.rank}
                            min={0}
                            max={handleStatMax()}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='description'
                        >
                            Description
                        </label> 
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="text"
                            ref={descriptionRef}
                            defaultValue={merit.description}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='description'
                        >
                            Protonium Generator
                        </label> 
                        <input
                            className="" 
                            type="checkbox"
                            ref={protoniumGeneratorRef}
                            defaultChecked={merit.mastered}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='talisman'
                        >
                            Talisman
                        </label> 
                        <input
                            className="" 
                            type="checkbox"
                            ref={talismanRef}
                            defaultChecked={merit.talisman}

                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='description'
                        >
                            Armor
                        </label> 
                        <input
                            className="" 
                            type="checkbox"
                            ref={armorRef}
                            defaultChecked={merit.armor}

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

        if (isPowersAndTalismansGroup && 
            rankRef.current && 
            nameRef.current &&
            descriptionRef.current
            ) {
            
            const updatedPowerTalisman = character[statKey].map((power: any) => {
                 if (power.id === id) {
                     return {
                         ...power, 
                         id,
                         name: nameRef.current!.value,
                         rank: parseInt(rankRef.current!.value),
                         description: descriptionRef.current?.value,
                         stunt: power.stunt
                     }
                 }
                 return power
            })
            const newCharacter = {...character, [statKey]: updatedPowerTalisman} 
            
             editCharacter(newCharacter)
         }

         if (isStunt && 
            nameRef.current && 
            attemptsRef.current &&
            descriptionRef.current && 
            armorRef.current
            ) {
            
            const updatedPowerTalisman = character[statKey].map((power: any) => {
                 if (power.id === id) {
                     return {
                        id,
                        name: power.name,
                        rank: power.rank,
                        description: power.description,
                        stunt: 
                        (power.stunt.map((stunt: any) => {
                            if (stunt.id === subId) {
                                return {
                                    ...stunt, 
                                    id: subId,
                                    name: nameRef.current!.value,
                                    attempts: parseInt(attemptsRef.current!.value),
                                    description: descriptionRef.current?.value,
                                    mastered: masteredRef.current?.checked,
                                    armor: armorRef.current?.checked,
                                    duration: 0
                                }
                            }
                            return stunt
                        }))
                     }
                 }
                 return power
            })
            const newCharacter = {...character, [statKey]: updatedPowerTalisman} 
            editCharacter(newCharacter)
         }
    
         if (isMeritsGroup && 
            nameRef.current &&
            rankRef.current &&
            protoniumGeneratorRef &&
            talismanRef &&
            armorRef &&
            descriptionRef
            ) {
                const updatedMerit = character[statKey].map((merit: any) => {
                    if (merit.id === id) {
                        return {
                           id,
                           name: nameRef.current?.value,
                           rank: parseInt(rankRef.current?.value, 10),
                           description: descriptionRef.current?.value,
                           talsiman: talismanRef.current?.checked,
                           protoniumGenerator: protoniumGeneratorRef.current?.checked,
                           armor: armorRef.current?.checked
                           
                        }
                    }
                    return merit
               })
               const newCharacter = {...character, [statKey]: updatedMerit} 
               editCharacter(newCharacter)
            }

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
    