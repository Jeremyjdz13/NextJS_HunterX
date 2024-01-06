"use client"
import { useState } from "react"
import EditStatModal from "../modals/EditStatModal"
import { Character } from "@/app/context/CharacterTypes"


type ClickableTitleProps = {
    statGroupTitle: string
    character: Character
    statSubKey?: string
    statKey?: string
    subId?:string
    isStuntActive?:boolean
    stat: string
    id: string
}

export default function ClickableTitle({ 
        statGroupTitle, 
        statSubKey, 
        character,
        statKey,
        isStuntActive,
        // onClick,
        stat,
        subId, 
        id 
    } : ClickableTitleProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    function handleContextMenu(e: { preventDefault: () => void}){
        e.preventDefault()
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    let statNameAliasNatureKey = ''
    if (statGroupTitle === "Name") statNameAliasNatureKey = "name"

    if (statGroupTitle === "Alias") statNameAliasNatureKey = "alias"

    if (statGroupTitle === "Nature") statNameAliasNatureKey = "nature"
    return (
        <div>
            {
                <div className="p-1">
                    <div>{statSubKey === "stunt" ? null : statGroupTitle}</div>
                    <div
                        className="cursor-pointer"
                        onContextMenu={e => handleContextMenu(e)}
                    >
                        {stat}
                    </div>   
                </div>
            }
            <EditStatModal 
                statGroupTitle={statGroupTitle}
                isOpen={isModalOpen}
                statKey={statKey}
                statSubKey={statSubKey}
                id={id}
                subId={subId}
                character={character}
                isStuntActive={isStuntActive}
                onClose={handleCloseModal}
            />
        </div>
    )
}