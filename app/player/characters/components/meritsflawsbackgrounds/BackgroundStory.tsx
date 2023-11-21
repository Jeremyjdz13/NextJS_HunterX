import { Character } from '@/app/context/CharacterTypes'
import React from 'react'

type Props = {
    character: Character
}
function BackgroundStory({character}: Props) {

    const { 
        backgroundStory
    } = character
  return (
    <div>
        <div>{backgroundStory.title}</div>
        <div>{backgroundStory.markdown}</div>
    </div>
  )
}

export default BackgroundStory