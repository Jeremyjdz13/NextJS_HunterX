import { Character, EditCharacter } from '@/app/context/CharacterTypes'
import React, { useRef } from 'react'
import Label from '../Stat/Label'
import ClickableLabel from '../Stat/ClickableLabel'
import { useCharacter } from '@/app/context/CharacterContext'
import { GiCrossedSwords } from 'react-icons/gi'
import { SiCurseforge } from 'react-icons/si'
import { newBackground } from '@/app/context/DefaultDataTemplates'
import useAddStat from '../hooks/UseAddStat'

type Props = {
  character: Character
}

function Backgrounds({ character }: Props) {
  const { editCharacter } = useCharacter() as EditCharacter
  const { addStat, setStatOptions } = useAddStat(character, editCharacter)
  const {
    backgrounds
  } = character
  const modalRef = useRef(null)
    
  function handleOpenModal() {
      (modalRef.current! as HTMLDialogElement).showModal()
  }

  function handleCloseModal() {
      (modalRef.current! as HTMLDialogElement).close()
  }
  function handleAddBackground() {

   setStatOptions({
    property: "backgrounds",
    defaultValues: newBackground
   })

   addStat()
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
                  backgrounds.map((background) => (
                      <div 
                          key={background.id}
                          className="grid grid-cols-[30%_20%_50%]"
                      >
                          <div className="flex flex-row">
                              <ClickableLabel 
                                  id={background.id} 
                                  name={background.name} 
                                  rank={background.rank} 
                                  statKey={"backgrounds"} 
                                  character={character} 
                              />
                          </div>
                          <div>{background.rank}</div>
                          <div>{background.description}</div>
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
                <p className='p-1 m-1'>Click add to add a new Background.</p>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleAddBackground}
                >Add</button>
            </div>
        </dialog>
      </div>
  )
}

export default Backgrounds