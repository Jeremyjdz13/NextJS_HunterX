import { Character } from '@/app/context/CharacterTypes'
import React from 'react'
import Title from '../Stat/Title'

type Props = {
    character: Character
   
}

type Generators = {
    item: Generator[]
}

type Generator = {
    id: string
    name: string
    rank: number
    description: string
    quantity: number
    isArmor: boolean
    isProtoniumGenerator: boolean
    isTalisman: boolean
    isComponent: boolean
}
function ProtoniumPool({ character } : Props) {

    const {
        protonium,
        protoniumPool,
        inventory
    } = character

    const totalPool: number | undefined = protoniumPool?.rank
    const generators = inventory.filter(item => item.isProtoniumGenerator === true)
    
    function CheckboxComponent() {
       
        const handleCheckboxChange = (index) => {
            // Handle checkbox change based on index
            console.log(`Checkbox ${index} changed`);
        };
    
        // Generate an array of checkbox elements
        const checkboxes = Array.from({ length: totalPool }, (_, index) => (
            <div key={index} className='p-1 flex flex-col'>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(index)}
                />
                <label>{`${index + 1}`}</label>
            </div>
        ));
    
        // Render the generated checkboxes
        return <div className='flex'>{checkboxes}</div>;
    }
    
    
  return (
    <div>
        <div>
            {generators.map(item => {
                
                return (
                    <div key={item.id}>
                        {item.name} {item.rank}
                    </div>
                );
               
            })}
        </div>
        <div>
            {protonium.name} : {protonium.rank}
        </div>
        <div>
            {protoniumPool.name} : {protoniumPool.rank}
        </div>
        <div>
            {CheckboxComponent()}
        </div>
    </div>
  )
}

export default ProtoniumPool