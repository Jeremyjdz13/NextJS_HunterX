'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Character, CharacterContextProps, CharacterData, StatData } from "@/app/context/CharacterTypes"
import { useCharacter } from '@/app/context/CharacterContext'
import { skillTemplate, powerTemplate } from '@/app/context/DefaultDataTemplates'

interface EditStatFormProps {
    id: string
    subId?: string
    statKey: string
    statSubKey?: string
    statGroupTitle?: string
    isStuntActive?: boolean
    character: CharacterData
    onClose: () => void
}

type FormElementProps = {
    id: string
    name : string
    rank : number
    description: string
    quantity: number
    isArmor: boolean
    isComponent: boolean
    isProtoniumGenerator: boolean
    isMastered: boolean
    isPurchased: boolean
    isTalisman: boolean
    duration: number
    attempts: number
    spellAssignmentId: string
    statKey: string
}

type InputElement = {
    inputConfig: ConfigData
}

type ConfigData = {
    refType: any
    inputType: string
    isDefaultValue: boolean
    defaultValueData: string | number
    defaultCheckedData?: boolean
    isTextInput?: boolean
    labelName: string
}

export default function EditStatForm({ 
        id, 
        character, 
        statKey, 
        statSubKey,
        isStuntActive,
        statGroupTitle,
        subId,
        onClose
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
    const componentRef = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)
    const spellAssignmentIdRef = useRef<HTMLInputElement>(null)

    // const refs = {
    //     name: useRef<HTMLInputElement>(null),
    //     nature : useRef<HTMLInputElement>(null),
    //     alias : useRef<HTMLInputElement>(null),
    //     rank : useRef<HTMLInputElement>(null),
    //     attempts : useRef<HTMLInputElement>(null),
    //     isMastered : useRef<HTMLInputElement>(null),
    //     isArmor : useRef<HTMLInputElement>(null),
    //     isProtoniumGenerator : useRef<HTMLInputElement>(null),
    //     isTalisman : useRef<HTMLInputElement>(null),
    //     description : useRef<HTMLTextAreaElement>(null),
    //     isComponent : useRef<HTMLInputElement>(null),
    //     quantity : useRef<HTMLInputElement>(null),
    //     spellAssignmentId : useRef<HTMLInputElement>(null),
    // }


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

    const isInventory = [
        "inventory"
    ].includes(statKey)

    const isFlaws = [
        "flaws"
    ].includes(statKey)
    const isBackgrounds = [
        "backgrounds"
    ].includes(statKey)

    const isCharacterName = [ "name" ].includes(statKey)
    const isCharacterNature = [ "nature" ].includes(statKey)
    const isCharacterAlias = [ "alias" ].includes(statKey)
 
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

    // const InputElement = ({
    //    inputConfig
    // } : InputElement) => {
        
    //    return (
    //         <div>
    //             <label
    //                 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
    //             >{inputConfig.labelName}</label>
    //             {inputConfig.isDefaultValue ? (
    //                 <input
    //                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    //                     ref={inputConfig.refType}
    //                     type={inputConfig.inputType}
    //                     defaultValue={inputConfig.defaultValueData}
    //                      min={0}
    //                      max={handleStatMax()}
    //                     />
    //                 ) : (
    //                     <input
    //                         className="appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    //                         ref={inputConfig.refType}
    //                         type="checkbox"
    //                         defaultChecked={inputConfig.defaultCheckedData}
    //                     />
    //             )}
    //            {inputConfig.isTextInput ? (
    //                 <textarea
    //                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
    //                     ref={inputConfig.refType}
    //                     defaultValue={inputConfig.defaultValueData}
    //                 />  
    //             ) : null

    //            }
    //         </div>
    //    )
    // }


   function handleFormElement() {

        if (isCharacterName) {

            // const config = {
            //     refType: refs.name,
            //     inputType: "text",
            //     isDefaultValue: true,
            //     defaultValueData: character.name,
            //     labelName: 'Name'
            // }
            
            return (
                <>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor="name"
                    >
                        {statGroupTitle}
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        id={id}  
                        ref={nameRef}
                        type="text"
                        defaultValue={character.name}
                        
                    />
                </>
                // <InputElement inputConfig={config}/>
            )
        }
        if (isCharacterAlias) {
            return (
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor="alias"
                    >
                        Alias
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
        if (isCharacterNature) {
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
                            defaultChecked={merit.isProtoniumGenerator}
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
                            defaultChecked={merit.isTalisman}

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
                            defaultChecked={merit.isArmor}

                        />  
                    </div>
                </div>
            
            )     
                    
        }
        if (isInventory) {
            const inventory = character[statKey].find((item: any) => item.id === id)
            
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
                            defaultValue={inventory.name}
                            
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
                            defaultValue={inventory.rank}
                            min={0}
                            max={handleStatMax()}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='quantity'
                        >
                            Quantity
                        </label> 
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="number"
                            ref={quantityRef}
                            defaultValue={inventory.quantity}
                            min={0}
                            max={1000}
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
                            ref={descriptionRef}
                            defaultValue={inventory.description}
                        />  
                    </div>
                    <div>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                            htmlFor='talisman'
                        >
                            Spell Component
                        </label> 
                        <input
                            className="" 
                            type="checkbox"
                            ref={componentRef}
                            defaultChecked={inventory.isComponent}

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
                            defaultChecked={inventory.isArmor}

                        />
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
                                defaultChecked={inventory.isProtoniumGenerator}
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
                                defaultChecked={inventory.isTalisman}

                            />  
                        </div>
                        <input ref={spellAssignmentIdRef} defaultValue={inventory.spellAssignmentId} disabled />
                    </div>
                </div>
            
            )     
                    
        }
        if (isFlaws) {

            const flaw = character[statKey].find((flaw: any) => flaw.id === id)

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
                        defaultValue={flaw.name}
                        
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
                        defaultValue={flaw.rank}
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
                        ref={descriptionRef}
                        defaultValue={flaw.description}
                    />  
                </div>
            </div>
           )
        }
        if (isBackgrounds) {

            const background = character[statKey].find((stat: any) => stat.id === id)

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
                        defaultValue={background.name}
                        
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
                        defaultValue={background.rank}
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
                        ref={descriptionRef}
                        defaultValue={background.description}
                    />  
                </div>
            </div>
           )
        }
   }
   

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
       
       
        if (isCharacterName && nameRef.current) {
           
            const newCharacter = {...character, name: nameRef.current.value}
            editCharacter(newCharacter)
        }
        if (isCharacterAlias && aliasRef.current) {
           
            const newCharacter = {...character, alias: aliasRef.current.value}
            editCharacter(newCharacter)
        }
        if (isCharacterNature && natureRef.current) {
           
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
                           isTalisman: talismanRef.current?.checked,
                           isProtoniumGenerator: protoniumGeneratorRef.current?.checked,
                           isArmor: armorRef.current?.checked
                           
                        }
                    }
                    return merit
               })
               const newCharacter = {...character, [statKey]: updatedMerit} 
               editCharacter(newCharacter)
            }
        if (isInventory) {
            const updatedInventory = character[statKey].map((item: any) => {
                if (item.id === id) {
                    return {
                        id,
                        name: nameRef.current?.value,
                        rank: parseInt(rankRef.current?.value, 10),
                        description: descriptionRef.current?.value,
                        quantity: quantityRef.current?.value,
                        isComponent: componentRef.current?.checked,
                        spellAssignmentId: spellAssignmentIdRef.current?.value,
                        isProtoniumGenerator: protoniumGeneratorRef.current?.checked,
                        isArmor: armorRef.current?.checked,
                        isTalisman: talismanRef.current?.checked
                       
                    }
                }
                return item
           })
           const newCharacter = {...character, [statKey]: updatedInventory} 
           editCharacter(newCharacter)
        } 
        if (isFlaws && rankRef.current && nameRef && descriptionRef) {
            const updatedFlaws = character[statKey].map((flaw: any) => {
                if (flaw.id === id) {
                    return {
                        id,
                        name: nameRef.current?.value,
                        rank: parseInt(rankRef.current?.value, 10),
                        description: descriptionRef.current?.value,                       
                    }
                }
                return flaw
            })
            const newCharacter = {...character, [statKey]: updatedFlaws}
            editCharacter(newCharacter)
        }
        if (isBackgrounds && rankRef.current && nameRef && descriptionRef) {
            const updatedBackgrounds = character[statKey].map((stat: any) => {
                if (stat.id === id) {
                    return {
                        id,
                        name: nameRef.current?.value,
                        rank: parseInt(rankRef.current?.value, 10),
                        description: descriptionRef.current?.value,                       
                    }
                }
                return stat
            })
            const newCharacter = {...character, [statKey]: updatedBackgrounds}
            editCharacter(newCharacter)
        }   

    }

    return (
        
        <form 
            key={id} 
            onSubmit={handleSubmit}
        >
                <div>
                    {handleFormElement()}
                </div>
                <div className='flex flex-row'>
                    <button 
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-1"
                        type="submit"
                        onClick={onClose}
                    >Save</button>
                    <button 
                        type="reset"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-1"
                        onClick={onClose}
                    >Cancel</button>
                    
                </div>
        </form>

    )
}
    