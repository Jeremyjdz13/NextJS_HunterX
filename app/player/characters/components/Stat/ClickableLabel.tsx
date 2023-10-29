import { useEffect, useState } from "react"
import { StatData } from "../../../../context/CharacterTypes"
import { useCharacter } from "../../../../context/CharacterContext"
import EditStatModal from "../modals/EditStatModal"
import DiceModal from "../modals/DiceModal"

type ClickableLabelProps = {
    stat?: StatData
    name: string
    id: string
    groupName: string
}

export default function ClickableLabel({ name, id, groupName } : ClickableLabelProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { selectedCharacter }: any = useCharacter()

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
        const stat: StatData | undefined = selectedCharacter?.[groupName]
        
        if(isPowersAndTalismans) {

            const statArray: StatData | undefined = Array.isArray(stat) && stat?.find(item => item.id === id)
            if (statArray) {
                return <DiceModal 
                        key={statArray.id}
                        stat={statArray}
                    />
            }
        }

        if(isCoreAbility) {
            if (stat) {
                return <DiceModal 
                        key={stat.id}
                        stat={stat}
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
        <div>
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
                    <div
                        id={id}
                        onContextMenu={handleContextMenu}
                    >
                        {name}
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