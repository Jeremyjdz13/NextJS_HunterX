import React from 'react'
import ClickableLabel from './ClickableLabel'
import Label from './Label'
import { Character, CharacterData, StatData } from '@/app/context/CharacterTypes'
import { characterTemplate } from '@/app/context/DefaultDataTemplates'
// import { useEdit } from '../../../../contexts/EditContext'

export type StatListProps = {
    stat: StatData
    statGroupTitle: string
    character: CharacterData
}

export default function StatLists({ stat, statGroupTitle, character }: StatListProps) {

    const isSpellComponents= [ 
        "spellComponents",
    ].includes(statGroupTitle);

    const isStunt = [
        "stunt"
    ].includes(statGroupTitle);

    // const { handleSetSelectedStat, handleSetCharacterStatGroupName } = useEdit()

    function handleStuntsElement() {
        return (
            <div key={stat.id}>
                <div>
                    <Label storedLabel="Name" />
                    <Label storedLabel="Attempts" />
                    <Label storedLabel="Description" />
                    <Label storedLabel="Mastered" />
                    <Label storedLabel="Armor" />
                    <Label storedLabel="Duration" />
                </div>
                <div>
                    <ClickableLabel 
                        id={stat.id} 
                        name={stat.name!} 
                        statGroupTitle={statGroupTitle}
                        character={character}
                    />
                    <div>{stat.attempts}</div>
                    <div>{stat.description}</div>
                    <div>{stat.mastered ? "Aye": "Nay"}</div>
                    <div>{stat.armor ? "Aye" : "Nay"}</div>
                    <div>{stat.duration}</div>
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