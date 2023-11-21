"use client"
import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useCharacter } from '@/app/context/CharacterContext'
import { CharacterContextProps, Character } from '@/app/context/CharacterTypes'


type Props = {
  params: { id: string }
}

const LazyBasicInformation = lazy(() => import ('../components/basicInformation/BasicInformation'))
const LazyCounters = lazy(() => import('../components/counters/Counters'))
const LazyCoreAbilities = lazy(() => import('../components/coreabilities/CoreAbilities'))
const LazyStatModals = lazy(() => import('../components/statmodals/StatModals'))
const LazySkills = lazy(() => import('../components/skills/Skills'))
const LazyMeritsFlawsBackgrounds = lazy(() => import('../components/meritsflawsbackgrounds/MeritsFlawsBackgrounds'))

export default function Character({ params }: Props) {
  const characterId = params.id
  const { characters } = useCharacter() as CharacterContextProps
  const [character, setCharacter] = useState<Character>()

  useEffect(() => {
      
    if (characterId && characters) {

      const selectedCharacter = characters.find(character => character.id === characterId)
      setCharacter(selectedCharacter)

    }
    
  },[characters, characterId, character])

  if (!character) return

  return (
      <section 
        key={characterId}
        className='' 
      >
            <Suspense fallback={<div>Loading...</div>}>
                <LazyBasicInformation character={character} />  
                <div className='flex flex-row'>
                  <LazyCoreAbilities character={character} />
                  <div className='flex flex-row'>
                    <div className='flex flex-row'>
                      <LazySkills character={character} />
                      <LazyCounters character={character} />
                    </div>
                    <LazyStatModals character={character} />
                  </div>
                </div>
              <LazyMeritsFlawsBackgrounds character={character}  />
            </Suspense>
      </section>
  )
}

