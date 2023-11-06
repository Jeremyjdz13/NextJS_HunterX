"use client"
import { CharacterData, StatData } from "@/app/context/CharacterTypes"
import { useRef, lazy, Suspense } from "react"

type StatModalProps = {
    statGroupTitle: string
    stat: StatData[]
    statKey: string
    character: CharacterData
}
const LazyStatArray = lazy(() => import('../Stat/StatArray'))

export default function StatModal({ statGroupTitle, stat, statKey, character  }: StatModalProps) {
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
            <dialog ref={modalRef} >
                <button 
                    onClick={handleCloseModal}
                >
                    Close
                </button>
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyStatArray statArray={stat} statGroupTitle={statGroupTitle} statKey={statKey} character={character} />
                </Suspense>
            </dialog>
        </div>
    )
}