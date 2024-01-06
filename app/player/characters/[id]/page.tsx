"use client"
import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useCharacter } from '@/app/context/CharacterContext'
import type { CharacterContextProps, Character } from '@/app/context/CharacterTypes'


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
  const { character, setSelectedCharacter } = useCharacter() as CharacterContextProps

  useEffect(() => {
      
    if (characterId) {

      setSelectedCharacter(characterId)

    }
    
  },[characterId, setSelectedCharacter])

//  if (characterId !== character?.id) return

  return (
      <section key={characterId}>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyBasicInformation character={character} />  
                <div className='flex flex-row'>
                  <LazyCoreAbilities character={character} />
                  {/* <div className='flex flex-row'>
                    <div className='flex flex-row'>
                      <LazySkills character={character} />
                      <LazyCounters character={character} />
                    </div>
                    <LazyStatModals character={character} />
                  </div> */}
                </div>
              {/* <LazyMeritsFlawsBackgrounds character={character}  /> */}
            </Suspense>
      </section>
  )
}

