'use client'
import React, { useRef } from 'react'
import { SpellData } from './SpellTypes'
import Components from './Components'
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
        casting,
        description,
        duration,
        isMastered,
        isPurchased,
        components
    } = spell
    const modalRef = useRef(null)
    
    function handleOpenModal() {
        (modalRef.current! as HTMLDialogElement).showModal()
    }

    function handleCloseModal() {
        (modalRef.current! as HTMLDialogElement).close()
    }

  return (
    <div className='border p-1'>
        <button
            onClick={handleOpenModal}
            className='btn' 
        >
            {name}
        </button>
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
            <div>
                <div className='border-b '>Components</div>
                <div 
                    className='p-1 grid grid-cols-[150px_50px_75px_150px]'
                >
                    <Name name='Name' />
                    <Name name='Rank' />
                    <Name name='Quantity' />
                    <Name name='Description' /> 
                </div>
                {components.map(component => {
                    return <Components
                                key={component.id}
                                component={component}
                            />
                })}
            </div>
        </dialog>
    </div>
  )
}

export default Spell


// {
//     Array.isArray(spellbook) && spellbook.map((spell) => (
//         <div 
//             key={spell.id}
//             className='grid grid-cols-[200px_100px_100px_100px]'
//         >
//             <div
//                 className='cursor-pointer m-1'
//                 onContextMenu={handleContextMenu}
//             >
//                 {spell.name}
//             </div>
//             <div className='text-center'>{spell.attempts}</div>
//             <div className='text-center'>{spell.casting}</div>
//             <div className='text-center'>{spell.duration}</div>
//             {spell.componentItem?.map((item: Component) => {
//                     return (
//                         <div key={item.id}>
//                                 <div
//                                 className='text-center grid grid-cols-[200px_100px_100px_100px]'
//                             >
//                                 <Label storedLabel='Name' />
//                                 <Label storedLabel='Rank' />
//                                 <Label storedLabel='Quantity' />
//                                 <Label storedLabel='Description' />
                                
//                             </div>
//                             <div className='text-center grid grid-cols-[200px_100px_100px_100px]'>
//                                 <div>{item.name}</div>
//                                 <div>{item.rank}</div>
//                                 <div>{item.quantity}</div>
//                                 <div>{item.description}</div>
//                             </div>
//                         </div>
//                     ) 
//                 })
//             }
//             <EditStatModal 
//                 statGroupTitle={spell.name!}
//                 statKey={statKey}
//                 isOpen={isEditOpen}
//                 onClose={handleCloseModal}
//                 id={spell.id!}
//                 character={character!}
                
//             />
//         </div>
//     ))
// }