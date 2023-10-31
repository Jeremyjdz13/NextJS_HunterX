"use client"
import { StatData } from "@/app/context/CharacterTypes"
import { useRef } from "react"
import StatArray from "../Stat/StatArray"


type StatModalProps = {
    groupTitle: string
    stat: StatData[]
    groupName: string
}
export default function StatModal({ groupTitle, stat, groupName  }: StatModalProps) {
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
            >
                {groupTitle}
            </button>
            <dialog ref={modalRef} >
                <button 
                    onClick={handleCloseModal}
                >
                    Close
                </button>
                <StatArray
                    groupTitle={groupTitle}
                    groupName={groupName}
                    statArray={stat}
            />
            </dialog>
        </div>
    )
}