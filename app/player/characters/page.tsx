'use client'
import React from 'react'
import { useCharacter } from '../../context/CharacterContext'
// import CharacterCard from './components/CharacterCard'
// import CharacterCardEdit from '../../ProfileContainer/CharacterEdit/CharacterCardEdit'
import CharacterCard from './components/CharacterCard'
import { CharacterContextProps } from '../../context/CharacterTypes'

export default function Characters(){
     
    const { 
        addCharacter,  
        characters, 
        loading 
    } =  useCharacter() as CharacterContextProps


    return (
      
        <div>
            <div className='flex flex-row'> 
                {
                (!loading && characters) ? 
                    characters?.map(character => {
                        return (
                            <CharacterCard 
                              key={character.id}  
                              character={character}
                            />   
                            
                            
                        )
                    }) : 
                    null
                } 
                
            </div>
            <div>
                <button 
                    onClick={addCharacter} 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
 
                >
                    Add Character
                </button>
                
            </div>
        </div>
    )
}
