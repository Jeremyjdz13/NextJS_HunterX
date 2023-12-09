'use client'
import React, { useEffect } from 'react'
import ClickableLabel from '../Stat/ClickableLabel';
import { Character, EditCharacter } from '@/app/context/CharacterTypes';
import { useCharacter } from '@/app/context/CharacterContext'
import Title from '../Stat/Title';
import Rank from '../Stat/Rank';
import Label from '../Stat/Label';
import Name from '../Stat/Name';
import { GiMaterialsScience } from 'react-icons/gi';

type Props  = {
    character: Character
}
function Protonium({character}: Props) {
    
    const { 
        inventory,
        protonium,
        protoniumPool
    } = character

const { editCharacter } = useCharacter() as EditCharacter

    const protoniumGenerators = inventory.filter(item => item.isProtoniumGenerator === true);
    const protoniumGeneratorTotal = protoniumGenerators.reduce((total, protoniumTotal) => total + protoniumTotal.rank, 0);
    const totalPool: number = protonium.rank + protoniumGeneratorTotal
    
    function ProtoniumGeneratorList() {
        return (
            <div className='border-t'>
                <Title statGroupTitle='Protonium Generators' />
                {protoniumGenerators.map(protoniumGenerator => (
                    <div 
                        key={protoniumGenerator.id}
                        className='grid grid-cols-[80%_20%] p-1'
                    >
                       <div className='flex flex-row'>
                            <Name name={protoniumGenerator.name} />
                            <GiMaterialsScience />
                       </div>
                        <Rank rank={protoniumGenerator.rank} />
                    </div>
                ))}
            </div>
        );
    }

// useEffect(() => {
        
//     if (protoniumPool.rank !== totalPool) {
//             const newCharacter = {...character, ['protoniumPool']: {
//                 id: character.protoniumPool.id,
//                 name: character.protoniumPool.name,
//                 rank: totalPool
//             }}

//             editCharacter(newCharacter)
//         }
//     }, [])
    
  return (
        <div className='flex flex-col m-1'>
            <div className='grid grid-cols-[80%_20%]'>
                <Label storedLabel='Name' />
                <Label storedLabel="Rank" />
            </div>
            <div className='grid grid-cols-[80%_20%]'>
                <ClickableLabel 
                    key={protonium.id}
                    id={protonium.id}
                    rank={protonium.rank}
                    name={protonium.name}
                    character={character}
                    statKey="protonium"
                />
                <Rank rank={protonium.rank} />
            </div>
            {ProtoniumGeneratorList()}
            <div className='border-t p-1 grid grid-cols-[80%_20%]'>
                <Name name={protoniumPool.name!} />
                <Rank rank={protoniumPool.rank} />
            </div>
        </div>
  )
}

export default Protonium