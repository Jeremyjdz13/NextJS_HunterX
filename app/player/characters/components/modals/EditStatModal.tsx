"use client"
import { useRef } from "react";
import Title from "../Stat/Title";
import EditStatForm from "../forms/EditStatForm";
import { CharacterData } from "@/app/context/CharacterTypes";
import { useCharacter } from "@/app/context/CharacterContext";

type EditStatModalProps = {
    statGroupTitle: string
    isOpen: boolean
    onClose: () => void
    character: CharacterData
    id: string
    statKey: string
    subId?: string
    isStuntActive?: boolean
    statSubKey?: string
}

export default function EditStatModal({ 
    statGroupTitle,
    isOpen,
    onClose,
    character,
    statKey,
    subId,
    statSubKey,
    isStuntActive,
    id
}: EditStatModalProps) {
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const { editCharacter } = useCharacter() 
    const isSingleNestedArray = [
        "combat",
        "physical",
        "professional",
        "mental",
        "inventory",
        "merits"
    ].includes(statKey)

    const isNotDelete = [
        "protonium",
        "protoniumPool",
        "lethal",
        "bashing",
        "experience",
        "karma",
        "strength",
        "fight",
        "agility",
        "endurance",
        "reason",
        "intuition",
        "psyche",
        "name",
        "alias",
        "nature"
    ].includes(statKey)

    function handleDelete() {
        if(isSingleNestedArray) {
            const updatedCharacter = {...character,
            [statKey]: character[statKey].filter((stat: any) => stat.id !== id)}
            

            editCharacter(updatedCharacter)
        }
       
    }

    return (
        <dialog 
            open={isOpen} 
            ref={modalRef}
            className="border border-black p-4 inset-0"
        >
            <div className="flex flex-row">
                {isNotDelete ? null : <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleDelete}
                >
                    Delete
                </button>}
            </div>
            <Title statGroupTitle={statGroupTitle} />
            <EditStatForm 
                statKey={statKey}
                statSubKey={statSubKey}
                character={character}
                isStuntActive={isStuntActive}
                statGroupTitle={statGroupTitle}
                subId={subId}
                id={id}
                onClose={onClose}
            />
        </dialog>
    )
}