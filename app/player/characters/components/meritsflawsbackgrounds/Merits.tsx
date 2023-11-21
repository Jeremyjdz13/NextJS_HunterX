import { Character, EditCharacter } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import { useCharacter } from '@/app/context/CharacterContext'
import { GiAbdominalArmor, GiCrossedSwords } from 'react-icons/gi'
import { MdOutlineScience } from 'react-icons/md'
import { uuidv4 } from '@firebase/util'
import { SiCurseforge } from 'react-icons/si'
import { GiMaterialsScience } from "react-icons/gi";
import { AiOutlineDingtalk } from "react-icons/ai";
import Label from '../Stat/Label'
import ClickableLabel from '../Stat/ClickableLabel'


type Props = {
  character: Character
}


function Merits({ character }: Props) {
  const { editCharacter } = useCharacter() as EditCharacter

  const {
    merits
  } = character
  const modalRef = useRef(null)
    
  function handleOpenModal() {
      (modalRef.current! as HTMLDialogElement).showModal()
  }

  function handleCloseModal() {
      (modalRef.current! as HTMLDialogElement).close()
  }
  function addInventory() {
    const uniqueId = uuidv4()
    const updatedMerits = character["merits"].some((merti: any) => merti.id === uniqueId)
    ? character["merits"]
    : [
        ...character["merits"],
        {
            id: uuidv4(),
            name: "new merit",
            rank: 1,
            isArmor: false,
            isProtoniumGenerator: false,
            isComponent: false,
            description: "Write a description",
        },
    ];
    const newCharacter = { ...character, ["merits"]: updatedMerits };
    console.log(newCharacter, "mertis")
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
                  merits.map((merit) => (
                      <div 
                          key={merit.id}
                          className="grid grid-cols-[30%_20%_50%]"
                      >
                          <div className="flex flex-row">
                              <ClickableLabel 
                                  id={merit.id} 
                                  name={merit.name} 
                                  rank={merit.rank} 
                                  statKey={"merits"} 
                                  character={character} 
                              />
                              <div className="flex flex-row p-3">
                                  {merit.isArmor && <GiAbdominalArmor />}
                                  {merit.isTalisman && <AiOutlineDingtalk />}
                                  {merit.isProtoniumGenerator && <GiMaterialsScience />}
                              </div>
                          </div>
                          <div>{merit.rank}</div>
                          <div>{merit.description}</div>
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
                <p className='p-1 m-1'>Click add to add new Merit.</p>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={addInventory}
                >Add</button>
            </div>
        </dialog>
      </div>
  )
}

export default Merits