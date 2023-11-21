import { Character, EditCharacter } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import Label from '../Stat/Label'
import ClickableLabel from '../Stat/ClickableLabel'
import { useCharacter } from '@/app/context/CharacterContext'
import { GiAbdominalArmor, GiCrossedSwords, GiMaterialsScience } from 'react-icons/gi'
import { MdOutlineScience } from 'react-icons/md'
import { uuidv4 } from '@firebase/util'
import { SiCurseforge } from 'react-icons/si'
import { AiOutlineDingtalk } from 'react-icons/ai'

type Props = {
  character: Character
}

function Inventory({ character }: Props) {
  const { editCharacter } = useCharacter() as EditCharacter

  const {
    inventory
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
    const updatedInventory = character["inventory"].some((item: any) => item.id === uniqueId)
    ? character["inventory"]
    : [
        ...character["inventory"],
        {
            id: uuidv4(),
            name: "Inventory Item",
            rank: 1,
            isArmor: false,
            quantity: 1,
            isComponent: false,
            description: "Write a description",
            spellAssignmentId: ''
        },
    ];
    const newCharacter = { ...character, ["inventory"]: updatedInventory };
    console.log(newCharacter, "Inventory")
    editCharacter(newCharacter)
}
  return (
      <div>
          <div onClick={handleOpenModal} className="cursor-pointer p-1 m-1">
            <SiCurseforge />
          </div>
          <div className="grid grid-cols-[30%_10%_10%_50%]">
              <Label storedLabel='Name' />
              <Label storedLabel="Rank" />
              <Label storedLabel="Quantity" />
              <Label storedLabel='Description' />
          </div>
          <div>
              {
                  inventory.map((item) => (
                      <div 
                          key={item.id}
                          className="grid grid-cols-[30%_10%_10%_50%]"
                      >
                          <div className="flex flex-row">
                              <ClickableLabel 
                                  id={item.id} 
                                  name={item.name} 
                                  rank={item.rank} 
                                  statKey={"inventory"} 
                                  character={character} 
                              />
                               <div className="flex flex-row p-3">
                                  {item.isArmor && <GiAbdominalArmor />}
                                  {item.isComponent && <MdOutlineScience  />}
                                  {item.isTalisman && <AiOutlineDingtalk />}
                                  {item.isProtoniumGenerator && <GiMaterialsScience />}
                              </div>
                          </div>
                          <div>{item.rank}</div>
                          <div>{item.quantity}</div>
                          <div>{item.description}</div>
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
                <p className='p-1 m-1'>Click add to add new Inventory item.</p>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={addInventory}
                >Add</button>
            </div>
        </dialog>
      </div>
  )
}

export default Inventory