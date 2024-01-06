"use client"
import { useState } from "react"
import EditStatModal from "../modals/EditStatModal"
import { Character } from "@/app/context/CharacterTypes"


type ClickableTitleProps = {
    title: string
    statKey?: string
    stat: string
    id: string
}

export default function ClickableTitle({ 
        title, 
        statKey,
        stat,
        id,
    } : ClickableTitleProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    function handleContextMenu(e: { preventDefault: () => void}){
        e.preventDefault()
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    console.log("clickableTitle")
    return (
        <div>
            {
                <div className="p-1">
                    <div>{title}</div>
                    <div
                        className="cursor-pointer"
                        onContextMenu={e => handleContextMenu(e)}
                    >
                        {stat}
                    </div>   
                </div>
            }
            <EditStatModal 
                title={title}
                isOpen={isModalOpen}
                statKey={statKey!}
                id={id}
                onClose={handleCloseModal}
            />
        </div>
    )
}