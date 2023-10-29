import { useRef } from "react";
import Title from "../Stat/Title";
import EditStatForm from "../forms/EditStatForm";

type EditStatModalProps = {
    storedTitle: string
    isOpen: boolean
    onClose: () => void
}

export default function EditStatModal({ 
    storedTitle,
    isOpen,
    onClose
}: EditStatModalProps) {

    const modalRef = useRef<HTMLDialogElement | null>(null)

    return (
        <dialog open={isOpen} ref={modalRef}>
            <button onClick={onClose}>close</button>
            <Title storedTitle={storedTitle} />
            <EditStatForm />
        </dialog>
    )
}