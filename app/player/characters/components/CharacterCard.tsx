'use client'
import React from 'react'
import { Character, CharacterContextProps, CharacterData } from '@/app/context/CharacterTypes'
import Link from 'next/link'
import { useCharacter } from '@/app/context/CharacterContext'


type CharacterCardProps = {
    character: Character
}

function CharacterCard({ character }: CharacterCardProps) {
  const { deleteCharacter, setSelectedCharacter } = useCharacter() as CharacterContextProps
  return (
   <div>
     <div>
        <div>Name: {character.name}</div>
        <div>Nature: {character.nature}</div>
        <div>XP: {character.experience.rank}</div>
    </div>
    <Link 
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      href={`/player/characters/${character.id}`}
      onClick={() => setSelectedCharacter(character.id)}
    >
        Full Character
    </Link>
    <button 
        onClick={() => deleteCharacter(character)} 
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
        Delete Character
    </button>
   </div>
  )
}

export default CharacterCard