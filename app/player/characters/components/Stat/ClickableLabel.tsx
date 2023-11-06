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
    statGroupTitle?: string
    statKey: string
    character: CharacterData | undefined
}

export default function ClickableLabel({ name, id, statKey, rank, statGroupTitle, character } : ClickableLabelProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const isPowersAndTalismans = [
        "powers",
        "talismans"
    ].includes(statKey)

    function handleDiceClickableTitles() {
        const stat: StatData | undefined = character?.[statKey]
        console.log(isPowersAndTalismans, "True or false")
        if(isPowersAndTalismans) {
            console.log(stat, "From Powers or Talismans")
            const statArray: StatData | undefined = Array.isArray(stat) && stat?.find(item => item.id === id)
            if (statArray) {
                return <DiceModal 
                        key={statArray.id}
                        id={statArray.id}
                        name={statArray.name}
                        rank={statArray.rank}
                        stat={statArray}
                        character={character}
                        statKey={statKey}
                    />
            }
        }        
    }

    function handleContextMenu(e: { preventDefault: () => void}){
        e.preventDefault()

        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }
    return (
        <div className="p-1">
            {
                (
                    statKey === 'powers' ||
                    statKey === 'talismans'
                ) ? handleDiceClickableTitles() : 
                (
                    <div className="flex flex-col">
                        <Title statGroupTitle={statGroupTitle!} />
                        <div className="flex flex-col text-center">
                            <div 
                                className="cursor-pointer"
                                onContextMenu={handleContextMenu}
                            >{name}</div>
                            <Rank rank={rank} />
                        </div>
                    </div>
                )
            }
            <EditStatModal 
                statGroupTitle={name!}
                statKey={statKey}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                id={id!}
                character={character!}
                
            />
        </div>
    )
}