import { StatData } from "@/app/context/CharacterTypes"
import { useRef } from "react"
import Stat from "../Stat/Stat"


type StatModalProps = {
    groupTitle: string
    stat: StatData
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
                <Stat
                    groupTitle={groupTitle}
                    groupName={groupName}
                    stat={stat}
            />
            </dialog>
        </div>
    )
}