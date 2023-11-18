'use client'
import React, { useEffect } from 'react'
import ClickableLabel from '../Stat/ClickableLabel';
import { Character } from '@/app/context/CharacterTypes';
import { useCharacter } from '@/app/context/CharacterContext'
import Title from '../Stat/Title';
import Rank from '../Stat/Rank';

type Props  = {
    character: Character
}
function Protonium({character}: Props) {
    
    const { 
        merits,
        protonium,
        protoniumPool
    } = character
    const { editCharacter } = useCharacter()

    const protoniumGenerators = merits.filter(merit => merit.protoniumGenerator === true);
    
    function ProtoniumGeneratorList() {
        return (
            <div className='p-1'>
                {protoniumGenerators.map(protoniumGenerator => (
                    <div 
                        key={protoniumGenerator.id}
                        className='flex flex-row p-1'
                    >
                        <div>{protoniumGenerator.name}</div>
                        <div>{protoniumGenerator.rank}</div>
                    </div>
                ))}
            </div>
        );
    }

    useEffect(() => {
        const protoniumGeneratorTotal = protoniumGenerators.reduce((total, protoniumTotal) => total + protoniumTotal.rank, 0);
        const totalPool: number = protonium.rank + protoniumGeneratorTotal

        const newCharacter = {...character, ['protoniumPool']: {
            id: character.protoniumPool.id,
            name: character.protoniumPool.name,
            rank: totalPool
        }}

        editCharacter(newCharacter)

    }, [protoniumPool])

  return (
    <div className='flex flex-col border m-1'>
        <ClickableLabel 
            key={protonium.id}
            id={protonium.id}
            rank={protonium.rank}
            name={protonium.name}
            character={character}
            statKey="protonium"
        />
        {ProtoniumGeneratorList()}
        <div className='p-1 flex flex-row'>
            <Title statGroupTitle={protoniumPool.name!} />
            <Rank rank={protoniumPool.rank} />
        </div>
    </div>
  )
}

export default Protonium