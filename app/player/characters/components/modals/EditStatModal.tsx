"use client"
import { useRef } from "react";
import Title from "../Stat/Title";
import EditStatForm from "../forms/EditStatForm";
import { Character, CharacterContextProps, StatData } from "@/app/context/CharacterTypes";
import { useCharacter } from "@/app/context/CharacterContext";
import useStatDiscovery from "../hooks/UseStatDiscovery";

type EditStatModalProps = {
    statGroupTitle: string
    isOpen: boolean
    onClose: () => void
    character: Character
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

    const { editCharacter } = useCharacter() as CharacterContextProps
    const isDelete = [
        "combat",
        "physical",
        "professional",
        "mental",
        "inventory",
        "merits",
        "backgrounds",
        "flaws",
        "powers",
        "stunts",
        "talismans",
        "spellbooks",
        "spells",
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

    const stat = useStatDiscovery(character, statKey)

    function handleDelete() {
        if(isDelete) {
            const updatedCharacter = {...character,
            [statKey]: (stat as StatData[]).filter((stat: StatData) => stat.id !== id)}

            editCharacter(updatedCharacter)
        }
       
    }

    return (
        <dialog 
            open={isOpen} 
            ref={modalRef}
            className="border border-black p-4 z-10 inset-0"
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