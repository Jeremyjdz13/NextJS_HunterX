'use client'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { CharacterContextProps, Character, StatData } from "@/app/context/CharacterTypes"
import { useCharacter } from '@/app/context/CharacterContext'
import SimpleMde, { SimpleMDEReactProps }  from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import useStatDiscovery from '../hooks/UseStatDiscovery'
type EditStatFormProps = {
    id: string
    statKey: string
    onClose: () => void
}

type ConfigData = {
    markdown?: string | undefined
    inputRef: any
    inputType: string
    defaultValue?: string | number
    defaultChecked?: boolean
    isTextArea?: boolean
    isMarkdown?:boolean
    title: string
    htmlFor: string

}

export default function EditStatForm({ 
        id, 
        statKey, 
        onClose
    } : EditStatFormProps) {
    const { editCharacter, character } = useCharacter() as CharacterContextProps
    const [markdownValue, setMarkdownValue] = useState('')
    const nameRef = useRef<HTMLInputElement>(null)
    const rankRef = useRef<HTMLInputElement>(null)
    const isMasteredRef = useRef<HTMLInputElement>(null)
    const isArmorRef = useRef<HTMLInputElement>(null)
    const isProtoniumGeneratorRef = useRef<HTMLInputElement>(null)
    const isTalismanRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const isComponentRef = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)
    const castingRef = useRef<HTMLInputElement>(null)
    const durationRef = useRef<HTMLInputElement>(null)
    const isPurchasedRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)

    const statValue = useStatDiscovery(character, statKey)

    const isSkill = [
        "combat",
        "physical",
        "professional",
        "mental"
    ].includes(statKey);
    const isSingleStat = [
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
        "death",
        "backgroundStory"
    ].includes(statKey);
   
    const isBackgroundStory = [
        "backgroundStory"
    ].includes(statKey);
    const isStatArray = [
        "powers", 
        "talismans",
        "inventory",
        "combat",
        "mental",
        "physical",
        "professional",
        "stunts",
        "spells",
        "backgrounds",
        "spellbooks",
        "merits",
        "flaws"
    ].includes(statKey);
    const isSpell = [
        "spells"
    ].includes(statKey)
    const isStunt = [
        "stunts"
    ].includes(statKey)
    const isProtonium = [
        'protonium'
    ].includes(statKey)
    const isInventory = [
        "inventory"
    ].includes(statKey)
    const isPowersAndTalismans = [ "powers", "talismans" ].includes(statKey)
    const isNameNatureAlias = [ 
        "name",
        "alias",
        "nature"
    ].includes(statKey)

    const isTalismans = [
        "talismans"
    ].includes(statKey)

    const isSpellBook = [
        "spellbooks"
    ].includes(statKey)
     
    const onChange = useCallback((value: string) => {
       return setMarkdownValue(value);
      }, []);

    const MdeOptions = useMemo(() => {
        return {
            lineWrapping: true,
            toolbar: [
                'heading-1','heading-2', 'heading-3',
                '|',
                'bold', 'italic', 'strikethrough', 'code',
                '|',
                'unordered-list', 'ordered-list',
                '|',
                'quote', 'table', 'horizontal-rule',
                '|',
                'preview', 'side-by-side', 'fullscreen',
                '|',
                'guide'
            ]
        } as SimpleMDEReactProps  
    }, [])

    function handleStatMax(){
        if(
            statKey === 'experience' ||
            statKey === 'inventory'
        ){

            return 100000
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
    
     function InputField(config: ConfigData): React.JSX.Element{

        let inputElement = null;
        
        if (config.isTextArea) {
            inputElement = (
                <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    ref={config.inputRef}
                    defaultValue={config.defaultValue}
                />
            );
        } else if (config.isMarkdown) {
                       
            inputElement = <SimpleMde 
                value={config.markdown} 
                onChange={onChange}
                options={MdeOptions}
                />
            
        } else if (config.inputType === "checkbox") {
            inputElement = (
                <input
                    className=""
                    type={config.inputType}
                    ref={config.inputRef}
                    defaultChecked={config.defaultChecked}
                />
            );
        } else {
            const additionalInputProps = {
                type: config.inputType,
                min: 0,
                max: handleStatMax(),
            };

            inputElement = (
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    ref={config.inputRef}
                    defaultValue={config.defaultValue}
                    {...additionalInputProps}
                />
            );
        } 

        return (
            <div>
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                    htmlFor={config.htmlFor}
                >
                    {config.title}
                </label> 
                 {inputElement}   
            </div>
        )
    }
    
   function handleChangeStat() {
        if (isStatArray) {
            
                const updatedStat = (statValue as StatData[]).map((stat: any) => {
                    if (stat.id === id) {
                        return {
                            ...stat, 
                            id,
                            name: nameRef.current!.value,
                            ...(!isNameNatureAlias ? (isSpellBook ? {}: {rank: parseInt(rankRef.current!.value)}) : {}),
                            ...(!isSkill ? {description: descriptionRef.current?.value} : {}),
                            ...(isPowersAndTalismans? {stuntIds: stat?.stuntIds}: {}),
                            ...((isInventory || isTalismans)? {
                                ...(isTalismans ? {}: {quantity: quantityRef.current?.value}),
                                isArmor: isArmorRef.current?.checked,
                                isProtoniumGenerator: isProtoniumGeneratorRef.current?.checked,
                                isTalisman: isTalismanRef.current?.checked,
                                isComponent: isComponentRef.current?.checked,   
                            } : {}),
                            ...(isStunt ? {
                                isMastered: isMasteredRef.current?.checked,
                                isArmor: isArmorRef.current?.checked,
                                isComponent: isComponentRef.current?.checked,
                                duration: durationRef.current?.value,
                            }: {}),
                            ...(isSpellBook ? {spellIds: stat.spellIds} : {}),
                            ...(isSpell ? {
                                isMastered: isMasteredRef.current?.checked,
                                isPurchased: isPurchasedRef.current?.checked,
                                casting: castingRef.current?.value,
                                duration: durationRef.current?.value,
                                componentIds: stat.componentIds
                            }: {}),
                        }
                    }
                return stat
            })
            const newCharacter = {...character, [statKey]: updatedStat} 
            editCharacter(newCharacter)
        }
        if (isNameNatureAlias) {
            const updatedCharacter = {
                ...character,
                [statKey]: nameRef.current!.value     
            };
        
            editCharacter(updatedCharacter);
        }

        if (isSingleStat) {
            
            const newCharacter = {...character, [statKey]: {
                id,
                ...(isBackgroundStory ? {title: nameRef.current?.value}: {name: (statValue as StatData).name}),
                ...(isBackgroundStory ? {} : {rank: parseInt(rankRef.current!.value)}),
                ...(isBackgroundStory ? {markdown: markdownValue} : {})

            } }
            editCharacter(newCharacter);

        }
   } 

   function handleFormElement() {

        if(isStatArray) {
            const stat = character[statKey].find((stat: StatData) => stat.id === id)
            const nameConfig = {
                        title: "Name",
                        defaultValue: stat?.name,
                        inputRef: nameRef,
                        inputType: "text",
                        textArea: false,
                        htmlFor: "Name"
                    }
            const rankConfig = {
                title: "Rank",
                defaultValue: stat?.rank,
                inputRef: rankRef,
                inputType: "number",
                textArea: false,
                htmlFor: "Rank"
            }
            const castingConfig = {
                title: "Casting",
                defaultValue: stat?.casting,
                inputRef: castingRef,
                inputType: "number",
                textArea: false,
                htmlFor: "Casting"
            }
            const descriptionConfig = {
                title: "Description",
                defaultValue: stat?.description,
                inputRef: descriptionRef,
                inputType: "text",
                isTextArea: true,
                htmlFor: "Description"
            }
            const quantityConfig = {
                title: "Quantity",
                defaultValue: stat?.quantity,
                inputRef: quantityRef,
                inputType: "number",
                isTextArea: false,
                htmlFor: "Quantity"
            }
            const durationConfig = {
                title: "Duration",
                defaultValue: stat?.duration,
                inputRef: durationRef,
                inputType: "number",
                isTextArea: false,
                htmlFor: "Duration"
            }
            const componentConfig = {
                title: "Spell Component",
                defaultChecked: stat?.isComponent,
                inputRef: isComponentRef,
                inputType: "checkbox",
                isTextArea: false,
                htmlFor: "Spell Component"
            }
            const armorConfig = {
                title: "Armor",
                defaultChecked: stat?.isArmor,
                inputRef: isArmorRef,
                inputType: "checkbox",
                isTextArea: false,
                htmlFor: "Armor"
            }
            const protoniumGeneratorConfig = {
                title: "Protonium Generator",
                defaultChecked: stat?.isProtoniumGenerator,
                inputRef: isProtoniumGeneratorRef,
                inputType: "checkbox",
                isTextArea: false,
                htmlFor: "Protonium Generator"
            }
            const talismanConfig = {
                title: "Talisman",
                defaultChecked: stat?.isTalisman,
                inputRef: isTalismanRef,
                inputType: "checkbox",
                isTextArea: false,
                htmlFor: "Talisman"
            }
            const masteredConfig = {
                title: "Mastered",
                defaultChecked: stat?.isMastered,
                inputRef: isMasteredRef,
                inputType: "checkbox",
                isTextArea: false,
                htmlFor: "Mastered"
            }
            const purchasedConfig = {
                title: "Purchased",
                defaultChecked: stat?.isPurchased,
                inputRef: isPurchasedRef,
                inputType: "checkbox",
                isTextArea: false,
                htmlFor: "Talisman"
            }
           return (
            <div className='z-1000'>
                {InputField(nameConfig)}
                {isSpellBook ? null : <>{InputField(rankConfig)}</>}
                {!isSkill ? <>{InputField(descriptionConfig)}</>: null}    
                {(isInventory || isTalismans) ? 
                    <>
                    {!isTalismans ? <>{InputField(quantityConfig)}</> : null}
                    {InputField(componentConfig)}
                    {InputField(armorConfig)}
                    {InputField(protoniumGeneratorConfig)}    
                    {InputField(talismanConfig)}
                    </>
                    :
                    null
                }
                {isSpell ? 
                    <>
                        {InputField(castingConfig)}
                        {InputField(durationConfig)}    
                        {InputField(masteredConfig)}     
                        {InputField(purchasedConfig)}  
                    </> 
                    :
                    null
                }
                {
                    isStunt ? <>
                            {InputField(durationConfig)} 
                            {InputField(componentConfig)}
                            {InputField(armorConfig)}
                            {InputField(masteredConfig)}   
                        </> :
                        null
                }
                   
            </div>
           )
        }

        if (isNameNatureAlias) {
            const stat = character[statKey]  
            const title : string = statKey === "alias" ? "Alias" : statKey === "nature" ? "Nature" : "Name";
            const htmlFor : string = statKey === "alias" ? "Alias" : statKey === "nature" ? "Nature" : "Name";
        
            const nameConfig = {
                title,
                defaultValue: stat,
                inputRef: nameRef,
                inputType: "text",
                textArea: false,
                htmlFor: `${htmlFor}`
            };

            return (
                <div className='z-1000'>
                {InputField(nameConfig as ConfigData)} 
                </div>
            )
        }
        if (isSingleStat) {
            const stat = statValue as StatData
           
            const rankConfig = {
                title: "Rank",
                defaultValue: stat?.rank,
                inputRef: rankRef,
                inputType: "number",
                textArea: false,
                htmlFor: "Rank"
            }

            if (isBackgroundStory) {

                const titleConfig = {
                    title: "Title",
                    defaultValue: stat?.title,
                    inputRef: nameRef,
                    inputType: "text",
                    isTextArea: false,
                    htmlFor: "Title"
                }
                const markdownConfig = {
                    title: "Story",
                    markdown: stat?.markdown,
                    inputRef: markdownRef,
                    inputType: "text",
                    isTextArea: false,
                    isMarkdown: true,
                    htmlFor: "Story"
                }
                return (<div>
                    {InputField(titleConfig)}
                    {InputField(markdownConfig)}
                </div>)
            }

            return (
                <div>
                    {InputField(rankConfig)}
                </div>
            )
        }
       
        
   }
  
   

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
       
       handleChangeStat()
      
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
    