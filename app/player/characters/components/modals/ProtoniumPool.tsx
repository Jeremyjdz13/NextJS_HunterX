import { Character } from '@/app/context/CharacterTypes'
import React from 'react'
import { GiMaterialsScience } from 'react-icons/gi'
import useCalculateProtoniumPool from '../hooks/UseCalculateProtoniumPool'

type Props = {
    character: Character
   
}

function ProtoniumPool({ character } : Props) {

    const {
        protonium,
        inventory
    } = character
    
    const result = useCalculateProtoniumPool(inventory, protonium)

    function CheckboxComponent() {
       
        const handleCheckboxChange = (index: number) => {
            console.log(`Checkbox ${index} changed`);
        };
    
        const checkboxes = Array.from({ length: result.totalPool }, (_, index) => (
            <div key={index} className='p-1 flex flex-col'>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(index)}
                />
                <label>{`${index + 1}`}</label>
            </div>
        ));
    
        return <div className='flex'>{checkboxes}</div>;
    }
    
    
  return (
    <div>
        <div>
            {result.generators.map(item => {
                
                return (
                    <div key={item.id} className='flex flex-row'>
                        {item.name} {item.rank} <GiMaterialsScience />
                    </div>
                );
               
            })}
        </div>
        <div>
            {protonium.name} : {protonium.rank}
        </div>
        <div>
            Protonium Pool : {result.totalPool}
        </div>
        <div>
            {CheckboxComponent()}
        </div>
    </div>
  )
}

export default ProtoniumPool