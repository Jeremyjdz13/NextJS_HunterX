'use client'
import React, { useEffect } from 'react'
import ClickableLabel from '../Stat/ClickableLabel';
import { Character, CharacterContextProps, CharacterData } from '@/app/context/CharacterTypes';
import { useCharacter } from '@/app/context/CharacterContext'
import Title from '../Stat/Title';
import Rank from '../Stat/Rank';

type Props  = {
    character: CharacterData
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
                    <div key={protoniumGenerator.id}>
                        <h2>{protoniumGenerator.name}</h2>
                        <p>{protoniumGenerator.rank}</p>
                    </div>
                ))}
            </div>
        );
    }

    useEffect(() => {
        const protoniumGeneratorTotal = protoniumGenerators.reduce((total, protoniumTotal) => total + protoniumTotal.rank, 0);
        const totalPool = protonium?.rank + protoniumGeneratorTotal

        const newCharacter = {...character, ['protoniumPool']: {
            id: character.protoniumPool.id,
            name: character.protoniumPool.name,
            rank: totalPool
        }}

        editCharacter(newCharacter)

    }, [protoniumPool])

  return (
    <div className='border-l border-black p-1 flex flex-row'>
        <ClickableLabel 
            key={protonium.id}
            id={protonium.id}
            rank={protonium.rank}
            name={protonium.name}
            character={character}
            statKey="protonium"
        />
        {ProtoniumGeneratorList()}
        <div className='p-1'>
            <Title statGroupTitle={protoniumPool.name!} />
            <Rank rank={protoniumPool.rank} />
        </div>
    </div>
  )
}

export default Protonium