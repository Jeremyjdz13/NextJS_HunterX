"use client"
import { useState } from "react"
import { StatData, Character } from "../../../../context/CharacterTypes"
import EditStatModal from "../modals/EditStatModal"
import DiceModal from "../modals/DiceModal"
import Rank from "./Rank"
import classnames from 'classnames'
import Title from "./Title"
import AddStuntOrSpell from "../modals/AddStuntOrSpell"

type ClickableLabelProps = {
    rank?: number | undefined
    name?: string | undefined
    id?: string | undefined
    statGroupTitle?: string
    statKey: string
    character: Character
}

export default function ClickableLabel({ name, id, statKey, rank, character } : ClickableLabelProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

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
        const stat: StatData = character[(statKey as keyof Character)]
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
                                {isBackgroundStory ? <Title statGroupTitle={name}/> : (isSpells || isStunts ?<AddStuntOrSpell name={name} id={id} character={character} statKey={isStunts ? (isPower ? "powers" : (isTalismans ? "talismans": '')) : "spellbooks"}/> : name)}
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