import { Character, StatData } from "@/app/context/CharacterTypes";
import EditGroupStatForm from "../forms/AddRemoveStat";
import { useRef, useState } from "react";
import { useCharacter } from "@/app/context/CharacterContext";
import { powerTemplate, skillTemplate } from "@/app/context/DefaultDataTemplates";
import AddRemoveStat from "../forms/AddRemoveStat";
import { SiCurseforge } from "react-icons/si";

type Prop = {
    statGroupTitle: string;
    statKey: string;
    character: Character
}
export default function Title({ 
    statGroupTitle,
    statKey,
    character 
}: Prop){
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const isSkill = [
        "combat",
        "physical",
        "professional",
        "mental"
    ].includes(statKey)

    function handleOpenModal() {

        setIsDialogOpen(true)
    }

    function handleCloseModal() {
        setIsDialogOpen(false)
    }

    return (
        <div 
            className="p-1 text-center" 
        >
            {isSkill ? 
                <div onClick={handleOpenModal} className=" cursor-pointer">
                    <SiCurseforge />
                </div> : 
                <div>
                   {statGroupTitle}
                </div>
                }
            {isDialogOpen && (
                <dialog
                    open={true}
                    className="border border-black rounded p-2"
                >
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={handleCloseModal}
                    >Close</button>
                    <div>
                        <AddRemoveStat
                            statKey={statKey}
                            character={character}
                            statGroupTitle={statGroupTitle}
                        />
                    </div>
                </dialog>
            )}
        </div>
    )
}

