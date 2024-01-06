"use client"
import { Character, CharacterContextProps, Talisman } from "@/app/context/CharacterTypes"
import { useRef, useEffect } from "react"
import SpellBooks from "../spellbook/Spellbooks"
import CharacterStats from "../Stat/CharacterStats"
import Title from "../Stat/Title"
import Tabs from "../tabs/Tabs"
import { useCharacter } from '@/app/context/CharacterContext'
import { FaGraduationCap } from "react-icons/fa6"
import useTalismanDiscovery from "../hooks/UseTalismanDiscovery"
import StuntDisplay from "./StuntDisplay"
import PowersTalismans from "../powers_talismans/powers-talismans"

type Props = {
    statGroupTitle: string
    statKey: keyof Character
    character: Character
}




export default function StatModal({ 
        statGroupTitle, 
        statKey,
        character  
    }: Props) {
    
    const { editCharacter } = useCharacter() as CharacterContextProps

    useTalismanDiscovery({character, editCharacter})
    
    const modalRef = useRef(null)
    const isPowers = [
        'powers',
    ].includes(statKey)

    const isSpellbook = [
        'spellbooks'
    ].includes(statKey)

    const isTalisman = [
        "talismans"
    ].includes(statKey)

    function handleOpenModal() {
        (modalRef.current! as HTMLDialogElement).showModal()
    }

    function handleCloseModal() {
        (modalRef.current! as HTMLDialogElement).close()
    }

    
    
    function handleStatGroupModal() {
        if (isSpellbook) {
            return <SpellBooks character={character} statKey="spellbooks" />
        }

       if (isPowers) {
           return <PowersTalismans statKey="powers" character={character} ability={character.powers} />
       }

       if (isTalisman) {
            return <PowersTalismans statKey="talismans" character={character} />
        }
    
    }
    console.log("StatModal component")
    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="w-24 my-1  bg-transparent hover:bg-black text-blue-700 font-semibold hover:text-white py-4 px-4 border border-black hover:border-transparent rounded"
            >
                {statGroupTitle}
            </button>
            <dialog 
                ref={modalRef}
                className="border border-black p-3 rounded min-h-3/4 w-3/4 min-w-3/4 backdrop:bg-black-60" 
            >
                <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleCloseModal}
                >
                    Close
                </button>
                <Title statGroupTitle={statGroupTitle} />
                {handleStatGroupModal()}
            </dialog>
        </div>
    )
}