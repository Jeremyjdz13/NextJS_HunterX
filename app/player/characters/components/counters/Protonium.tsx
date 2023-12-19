"use client"
import React from 'react'
import ClickableLabel from '../Stat/ClickableLabel';
import { Character } from '@/app/context/CharacterTypes';
import Title from '../Stat/Title';
import Rank from '../Stat/Rank';
import Label from '../Stat/Label';
import Name from '../Stat/Name';
import { GiMaterialsScience } from 'react-icons/gi';
import useCalculateProtoniumPool from '../hooks/UseCalculateProtoniumPool';

type Props  = {
    character: Character
}
function Protonium({character}: Props) {
    
    const { 
        inventory,
        protonium,
    } = character


  const result = useCalculateProtoniumPool(inventory, protonium)

  let totalPool = 0
    if (protonium.rank) {
        totalPool = result.totalPool = protonium.rank + result.generatorsTotalPool
    }

    function ProtoniumGeneratorList() {
        return (
            <div className='border-t'>
                <Title statGroupTitle='Protonium Generators' />
                {result.generators.map(generator => (
                    <div 
                        key={generator.id}
                        className='grid grid-cols-[80%_20%] p-1'
                    >
                       <div className='flex flex-row'>
                            <Name name={generator.name} />
                            <GiMaterialsScience />
                       </div>
                        <Rank rank={generator.rank} />
                    </div>
                ))}
            </div>
        );
    }

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
                <Name name={"Protonium Pool"} />
                <Rank rank={totalPool} />
            </div>
        </div>
  )
}

export default Protonium