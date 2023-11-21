"use client"
import { Character, EditCharacter } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import Label from '../Stat/Label'
import ClickableLabel from '../Stat/ClickableLabel'
import { useCharacter } from '@/app/context/CharacterContext'
import { GiCrossedSwords } from 'react-icons/gi'
import { uuidv4 } from '@firebase/util'
import { SiCurseforge } from 'react-icons/si'

type Props = {
  character: Character
}

function Flaws({ character }: Props) {
  const { editCharacter } = useCharacter() as EditCharacter

  const {
    flaws
  } = character
  const modalRef = useRef(null)
    
  function handleOpenModal() {
      (modalRef.current! as HTMLDialogElement).showModal()
  }

  function handleCloseModal() {
      (modalRef.current! as HTMLDialogElement).close()
  }
  function addFlaw() {
    const uniqueId = uuidv4()
    const updatedFlaws = character["flaws"].some((flaw: any) => flaw.id === uniqueId)
    ? character["flaws"]
    : [
        ...character["flaws"],
        {
            id: uuidv4(),
            name: "New Flaw",
            rank: 1,
            description: "Write a description",
        },
    ];
    const newCharacter = { ...character, ["flaws"]: updatedFlaws };
    editCharacter(newCharacter)
}
  return (
      <div>
          <div onClick={handleOpenModal} className="cursor-pointer p-1 m-1">
            <SiCurseforge />
          </div>
          <div className="grid grid-cols-[30%_20%_50%]">
              <Label storedLabel='Name' />
              <Label storedLabel="Rank" />
              <Label storedLabel='Description' />
          </div>
          <div>
              {
                  flaws?.map((flaw) => (
                      <div 
                          key={flaw.id}
                          className="grid grid-cols-[30%_20%_50%]"
                      >
                          <div className="flex flex-row">
                              <ClickableLabel 
                                  id={flaw.id} 
                                  name={flaw.name} 
                                  rank={flaw.rank} 
                                  statKey={"flaws"} 
                                  character={character} 
                              />
                          </div>
                          <div>{flaw.rank}</div>
                          <div>{flaw.description}</div>
                      </div>
                          
                  ))
              }
          </div>
          <dialog
            ref={modalRef}
            className="border border-black p-3 rounded min-h-1/4 backdrop:bg-black-60" 
            >
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={handleCloseModal}
            ><GiCrossedSwords /></button>
            <div>
                <p className='p-1 m-1'>Click add to add new Flaw.</p>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={addFlaw}
                >Add</button>
            </div>
        </dialog>
      </div>
  )
}

export default Flaws