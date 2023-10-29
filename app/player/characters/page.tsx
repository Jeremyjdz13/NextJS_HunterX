'use client'
import React from 'react'
import { useCharacter } from '../../context/CharacterContext'
// import CharacterCard from './components/CharacterCard'
// import CharacterCardEdit from '../../ProfileContainer/CharacterEdit/CharacterCardEdit'
import CharacterCard from './components/CharacterCard'
import { CharacterContextProps } from '../../context/CharacterTypes'

export default function Characters(){
     
    const { 
        // handleCharacterAdd,  
        characters, 
        loading 
    } =  useCharacter() as CharacterContextProps

    console.log(characters, "Character")

    return (
      
        <div>
            <div> 
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
                    // onClick={handleCharacterAdd} 
                    className="add_button-main" 
                >
                    Add Character
                </button>
            </div>
        </div>
    )
}
