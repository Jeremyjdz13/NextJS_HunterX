"use client"
import { useState } from "react"
import EditStatModal from "../modals/EditStatModal"


type ClickableTitleProps = {
    groupTitle: string
}

export default function ClickableTitle({ groupTitle } : ClickableTitleProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleContextMenu(e: { preventDefault: () => void}){
        e.preventDefault()
        console.log("Right Click")

        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }
    return (
        <div>
            {
                <div
                    onContextMenu={handleContextMenu}
                >
                    {groupTitle}
                </div>   
            }
            <EditStatModal 
                storedTitle={groupTitle}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}