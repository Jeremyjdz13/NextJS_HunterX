'use client'
import React, {useEffect, useState} from 'react'
import ClickableLabel from './ClickableLabel'
import Label from './Label'
import { CharacterData, StatData } from '@/app/context/CharacterTypes'
import ClickableTitle from './ClickableTitle'
// import { useEdit } from '../../../../contexts/EditContext'

export type StatListProps = {
    id: string
    stat: StatData
    subId?: string
    statKey?: string
    statSubKey?: string
    statGroupTitle: string
    character: CharacterData
}

export default function StatLists({
        id,
        stat, 
        statKey,
        subId,
        statSubKey, 
        statGroupTitle, 
        character 
    }: StatListProps) {
    const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(false)

    const isSpellComponents= [ 
        "spellComponents",
    ].includes(statGroupTitle);

    const isStunt = [
        "stunt"
    ].includes(statSubKey!);
    
    // useEffect(() => {
    //     console.log(isStuntActive, "UseEffect");
    // }, [isStuntActive]);
    function handleShowDescription() {
        setIsDescriptionActive(prev => !prev)
    }
    function handleStuntsElement() {
        return (
            <div 
                key={stat.id}
                className='border-t border-black p-1'
            >   
                <div className='inline-grid grid-cols-5 gap-5'>
                    <div className='p-1 text-center'>
                        <Label storedLabel="Name" />
                        <div 
                            className='flex flex-row p-1'
                            onClick={handleShowDescription}
                        >
                            <ClickableTitle 
                                id={id} 
                                statGroupTitle={statGroupTitle}
                                character={character}
                                stat={stat.name!}
                                statSubKey={statSubKey}
                                subId={subId}
                                statKey={statKey}
                                isStuntActive={true}
                            />
                            {stat.armor ? <sub>A</sub> : ""}
                            {stat.mastered ? <sub>M</sub> : ""}
                        </div>
                    </div>
                   <div className='p-1 text-center'>
                        <Label storedLabel="Attempts" />
                        <div>{stat.attempts}</div>
                   </div>
                   <div className='p-1 text-center'>
                        <Label storedLabel="Duration" />
                        <div>{stat.duration}</div>
                   </div>
                </div>
                <div className={`p-1 text-center display ${!isDescriptionActive && "hidden" }`}>
                    <Label storedLabel="Description" />
                    <div>{stat.description}</div>
                </div>
            </div>
        )
    }

    function handleSpellComponentsElement() {
        return (
            <div key={stat.id}>
                <div>
                    <Label storedLabel="Name" />
                    <Label storedLabel="Rank" />
                    <Label storedLabel="Description" />
                    <Label storedLabel="Armor" />
                    <Label storedLabel="Component" />
                </div>
                <div>
                    <ClickableLabel 
                        id={stat.id} 
                        name={stat.name!} 
                        statGroupTitle={statGroupTitle}
                        statSubKey={statSubKey}
                        character={character}
                    />
                    <div>{stat.rank}</div>
                    <div>{stat.description}</div>
                    <div>{stat.armor ? "Aye" : "Nay"}</div>
                    <div>{stat.component ? "Aye" : "Nay"}</div>
                </div>
            </div>
        )
    }
    function handleStatListElement(){
       
        if(isSpellComponents){
           return handleSpellComponentsElement()
        }

        if(isStunt) {
            return handleStuntsElement()
        }
    }
return (
        <div>
            {handleStatListElement()}
        </div>
    )
}