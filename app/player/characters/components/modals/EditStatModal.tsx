"use client"
import { useRef } from "react";
import Title from "../Stat/Title";
import EditStatForm from "../forms/EditStatForm";
import { CharacterData } from "@/app/context/CharacterTypes";

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


    return (
        <dialog 
            open={isOpen} 
            ref={modalRef}
            className="border border-black p-4 inset-0"
        >
            <button 
                onClick={onClose}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                close
            </button>
            <Title statGroupTitle={statGroupTitle} />
            <EditStatForm 
                statKey={statKey}
                statSubKey={statSubKey}
                character={character}
                isStuntActive={isStuntActive}
                subId={subId}
                id={id}
            />
        </dialog>
    )
}