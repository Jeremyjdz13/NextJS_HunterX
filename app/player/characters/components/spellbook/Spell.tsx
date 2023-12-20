'use client'
import React, { useRef } from 'react'
import { SpellData } from './SpellTypes'
import Name from '../Stat/Name'
import { ImCross } from "react-icons/im";

type Props = {
    spell: SpellData
}



function Spell({
    spell
}: Props) {

    const {
        name,
        id,
        attempts,
        casting,
        description,
        duration,
        isMastered,
        isPurchased,
    } = spell
    const modalRef = useRef(null)
    
    function handleOpenModal() {
        (modalRef.current! as HTMLDialogElement).showModal()
    }

    function handleCloseModal() {
        (modalRef.current! as HTMLDialogElement).close()
    }

  return (
    <div className='p-1'>
        <div >
            <div className='text-center grid grid-cols-[110px_75px_75px_75px_300px]'>
                <button
                    onClick={handleOpenModal}
                    className='btn' 
                >
                    {name}
                </button>
                <div>{attempts}</div>
                <div>{casting}</div>
                <div>{duration}</div>
                <div>{description}</div>
            </div>
        </div>
        <dialog
            ref={modalRef}
            className='border border-black rounded p-2'
        >
            <div className='flex flex-row justify-between border-b p-1'>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleCloseModal}
                >
                    <ImCross />
                </button>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >Edit</button>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >Delete</button>
            </div>
            <div className='grid grid-cols-[150px_100px_100px_100px]' >
                <div>
                    <Name name='Spell Name' />
                    {name}
                </div>
                <div>
                    <Name name='Casting Time' />
                    {casting}
                </div>
                <div>
                    <Name name='Duration' />
                    {duration}
                </div> 
                <div>
                    <Name name='Description' />
                    {description}
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default Spell
