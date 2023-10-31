'use client'
import React from 'react'
import { CharacterContextProps, CharacterData } from '@/app/context/CharacterTypes'
import Link from 'next/link'
import { useCharacter } from '@/app/context/CharacterContext'


type CharacterCardProps = {
    character: CharacterData
}

function CharacterCard({ character }: CharacterCardProps) {
  const { handleCharacterSelect } = useCharacter() as CharacterContextProps
  return (
   <div>
     <div>
        <div>Name: {character.name}</div>
        <div>Nature: {character.nature}</div>
        <div>XP: {character.experience.rank}</div>
    </div>
    <Link 
      href={`/player/characters/${character.id}`}
    >
        Full Character
    </Link>
   </div>
  )
}

export default CharacterCard