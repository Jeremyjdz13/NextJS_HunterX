'use client'
import { Character } from '@/app/context/CharacterTypes'
import Link from 'next/link'
import React from 'react'

type CharacterCardProps = {
    character: Character
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
   <div>
     <div>
        <div>Name: {character.name}</div>
        <div>Nature: {character.nature}</div>
        <div>XP: {character.experience.rank}</div>
    </div>
    <Link href={`/player/characters/${character.id}`}>
        Full Character
    </Link>
   </div>
  )
}

export default CharacterCard