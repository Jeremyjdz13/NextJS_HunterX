"use client"
import { useState } from "react"
import { StatData, CharacterData } from "../../../../context/CharacterTypes"
import EditStatModal from "../modals/EditStatModal"
import DiceModal from "../modals/DiceModal"
import Rank from "./Rank"
import Title from "./Title"

type ClickableLabelProps = {
    rank?: number | undefined
    name?: string | undefined
    id?: string | undefined
    title?: string
    groupName: string
    character?: CharacterData | undefined
}

export default function ClickableLabel({ name, id, groupName, rank, title, character } : ClickableLabelProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const isCoreAbility = [
        "strength", 
        "fight", 
        "agility",
        "endurance",
        "reason",
        "intuition",
        "psyche",
    ].includes(groupName)

    const isPowersAndTalismans = [
        "powers",
        "talismans"
    ].includes(groupName)

    function handleDiceClickableTitles() {
        const stat: StatData | undefined = character?.[groupName]
        
        if(isPowersAndTalismans) {

            const statArray: StatData | undefined = Array.isArray(stat) && stat?.find(item => item.id === id)
            if (statArray) {
                return <DiceModal 
                        key={statArray.id}
                        id={statArray.id}
                        name={statArray.name}
                        rank={statArray.rank}
                        stat={statArray}
                        character={character}
                    />
            }
        }

        if(isCoreAbility) {
            if (stat) {
                return <DiceModal 
                        key={stat.id}
                        id={stat.id}
                        name={stat.name}
                        rank={stat.rank}
                        character={character}
                    />
            }
        }
        
    }

    function handleContextMenu(e: { preventDefault: () => void}){
        e.preventDefault()
        console.log("Right Click")

        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }
    return (
        <div className="p-1">
            {
                (
                    groupName === 'strength' ||
                    groupName === 'fight' ||
                    groupName === 'agility' ||
                    groupName === 'endurance' ||
                    groupName === 'reason' ||
                    groupName === 'intuition' ||
                    groupName === 'psyche' ||
                    groupName === 'powers' ||
                    groupName === 'talismans'
                ) ? handleDiceClickableTitles() : 
                (
                    <div className="flex flex-col">
                        <Title storedTitle={title} />
                        <div
                            onContextMenu={handleContextMenu}
                        >{name}</div>
                        <Rank rank={rank} />
                    </div>
                )
            }
            <EditStatModal 
                storedTitle={name}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}