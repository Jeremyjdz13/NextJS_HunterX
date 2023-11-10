"use client"
import { CharacterData, StatData } from "@/app/context/CharacterTypes"
import { useRef, lazy, Suspense } from "react"
import StatArray from "../Stat/StatArray"

type Props = {
    statGroupTitle: string
    stat: StatData[]
    statKey: string
    statSubKey?: string
    character: CharacterData
}

export default function StatModal({ 
        statGroupTitle, 
        stat, 
        statKey,
        statSubKey,
        character  
    }: Props) {
    const modalRef = useRef(null)
    
    function handleOpenModal() {
        (modalRef.current! as HTMLDialogElement).showModal()
    }

    function handleCloseModal() {
        (modalRef.current! as HTMLDialogElement).close()
    }

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                {statGroupTitle}
            </button>
            <dialog 
                ref={modalRef}
                className="border border-black p-3 rounded min-h-3/4" 
            >
                <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleCloseModal}
                >
                    Close
                </button>
                
                <StatArray 
                    stat={stat} 
                    statSubKey={statSubKey} 
                    statGroupTitle={statGroupTitle} 
                    statKey={statKey} 
                    character={character}
                />
               
            </dialog>
        </div>
    )
}