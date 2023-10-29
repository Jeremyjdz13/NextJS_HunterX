import React from 'react'
import ClickableLabel from './ClickableLabel'
import Label from './Label'
import { StatData } from '@/app/context/CharacterTypes'
// import { useEdit } from '../../../../contexts/EditContext'

export type StatListProps = {
    stat: StatData
    groupName: string
}

export default function StatLists({ stat, groupName }: StatListProps) {

    const isSpellComponents= [ 
        "spellComponents",
    ].includes(groupName);

    const isStunt = [
        "stunt"
    ].includes(groupName);

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
                    <ClickableLabel id={stat.id} name={stat.name!} groupName={groupName} />
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
                    <ClickableLabel id={stat.id} name={stat.name!} groupName={groupName} />
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