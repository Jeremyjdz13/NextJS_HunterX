"use client"
import { useState } from "react"
import { StatData, Character, CharacterContextProps } from "../../../../context/CharacterTypes"
import EditStatModal from "../modals/EditStatModal"
import DiceModal from "../modals/DiceModal"
import Rank from "./Rank"
import classnames from 'classnames'
import AddStuntOrSpell from "../modals/AddStuntOrSpell"
import { useCharacter } from "@/app/context/CharacterContext"

type ClickableLabelProps = {
    rank?: number | undefined
    name?: string | undefined
    id?: string | undefined
    statKey: string
}

export default function ClickableLabel({ name, id, statKey, rank } : ClickableLabelProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { character } = useCharacter() as CharacterContextProps

    const isPowersAndTalismans = [
        "powers",
        "talismans"
    ].includes(statKey)

    const isPower = [
        "powers",
    ].includes(statKey)
    const isTalismans = [
        "talismans",
    ].includes(statKey)

    const isStunts = [
        "stunts",
    ].includes(statKey)

    const isSpells = [
        "spells",
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
        "protonium",
        'stunts',
        "spells",
        "backgroundStory"
    ].includes(statKey)

    const isBackgroundStory = [ "backgroundStory" ].includes(statKey)

    function handleDiceClickableTitles() {
        const stat: StatData = character![(statKey as keyof Character)]
        if(isPowersAndTalismans) {
            const statArray: StatData | undefined = Array.isArray(stat) && stat?.find(item => item.id === id)
            if (statArray) {
                return <DiceModal 
                        key={statArray.id}
                        id={statArray.id}
                        name={statArray.name}
                        rank={statArray.rank}
                        character={character as Character}
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
    console.log("ClickableLabel component")
    return (
        <div>
            {
                isPowersAndTalismans ? handleDiceClickableTitles() : 
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
                                {
                                    isBackgroundStory ? (
                                    <div>{name}</div> 
                                    ) : (
                                        (isSpells || isStunts) ? 
                                            <AddStuntOrSpell 
                                                name={name!} 
                                                id={id!} 
                                                statKey={isStunts ? (isPower ? "powers" : (isTalismans ? "talismans": '')) : "spellbooks"}
                                            /> : 
                                            name
                                        )
                                }
                            </div>
                            {isTabStat ? null : <Rank rank={rank} />}
                        </div>
                    </div>
                )
            }
            <EditStatModal 
                title={name!}
                statKey={statKey}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                id={id!}                
            />
        </div>
    )
}