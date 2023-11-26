"use client"
import { useState } from "react"
import { StatData, CharacterData, Character } from "../../../../context/CharacterTypes"
import EditStatModal from "../modals/EditStatModal"
import DiceModal from "../modals/DiceModal"
import Rank from "./Rank"
import classnames from 'classnames'


type ClickableLabelProps = {
    rank?: number | undefined
    name?: string | undefined
    id?: string | undefined
    statGroupTitle?: string
    statKey: string
    character: Character
}

export default function ClickableLabel({ name, id, statKey, rank, statGroupTitle, character } : ClickableLabelProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const isPowersAndTalismans = [
        "powers",
        "talismans"
    ].includes(statKey)

    const isColumnStat = [
        "strength",
        "fight",
        "agility",
        "endurance",
        "reason",
        "intuition",
        "psyche",
        "experience",
        "karma"

    ].includes(statKey)

    const isTabStat = [
        "inventory",
        "merits",
        "flaws",
        "backgrounds",
        "combat",
        "physical",
        "professional",
        "mental",
        "protonium"
    ].includes(statKey)

    function handleDiceClickableTitles() {
        const stat: StatData | undefined = character?.[statKey]
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
        <div>
            {
                (
                    statKey === 'powers' ||
                    statKey === 'talismans'
                ) ? handleDiceClickableTitles() : 
                (
                    <div className="flex flex-col">
                        <div className={classnames(
                            {
                                "flex flex-row": !isColumnStat,
                                "flex flex-col": isColumnStat
                            }
                        )}>
                            <div 
                                className={classnames(
                                    {
                                        "cursor-pointer p-1 w-full": !isColumnStat,
                                        "cursor-pointer": isColumnStat
                                    }
                                )}
                                onContextMenu={handleContextMenu}
                            >
                                {name}
                            </div>
                            {isTabStat ? null : <Rank rank={rank} />}
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