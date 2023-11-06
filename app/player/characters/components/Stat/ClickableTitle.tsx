"use client"
import { useState } from "react"
import EditStatModal from "../modals/EditStatModal"
import { CharacterData } from "@/app/context/CharacterTypes"


type ClickableTitleProps = {
    statGroupTitle: string
    character: CharacterData
    stat: string
    id: string
}

export default function ClickableTitle({ statGroupTitle, character, stat, id } : ClickableTitleProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleContextMenu(e: { preventDefault: () => void}){
        e.preventDefault()
        console.log("Right Click")

        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    let statKey = ''
    if (statGroupTitle === "Name") statKey = "name"

    if (statGroupTitle === "Alias") statKey = "alias"

    if (statGroupTitle === "Nature") statKey = "nature"

    return (
        <div>
            {
                <div className="p-1">
                    <div>{statGroupTitle}</div>
                    <div
                        onContextMenu={handleContextMenu}
                    >
                        {stat}
                    </div>   
                </div>
            }
            <EditStatModal 
                statGroupTitle={statGroupTitle}
                isOpen={isModalOpen}
                statKey={statKey}
                id={id}
                character={character}
                onClose={handleCloseModal}
            />
        </div>
    )
}