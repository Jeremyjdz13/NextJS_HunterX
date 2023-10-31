"use client"
import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useCharacter } from '@/app/context/CharacterContext'
import { CharacterContextProps, CharacterData } from '@/app/context/CharacterTypes'
import Title from '../components/Stat/Title'
import ClickableLabel from '../components/Stat/ClickableLabel'
import Initiative from '../components/initiative/Initiative'
import Health from '../components/counters/Health'
import Stat from '../components/Stat/Stat'
import StatModal from '../components/modals/StatModal'
import StatArray from '../components/Stat/StatArray'
import Rank from '../components/Stat/Rank'
import DiceModal from '../components/modals/DiceModal'

type Props = {
  params: { id: string }
}

const LazyBasicInformation = lazy(() => import ('../components/basicInformation/BasicInformation'))

export default function Character({ params }: Props) {
  const characterId = params.id
  const { characters } = useCharacter() as CharacterContextProps
  const [character, setCharacter] = useState<CharacterData>()

  useEffect(() => {
      
    if (characterId) {
      const selectedCharacter = characters.find(character => character.id === characterId)
      console.log(selectedCharacter, "From Page of Active Character")

      setCharacter(selectedCharacter) 
    }
    
  },[characters, characterId, character])

  if (!character) return
  
  return (
      <section 
        key={characterId}
        className='border border-sky-600 p-5' 
      >
            <Suspense fallback={<div>Loading...</div>}>
                <LazyBasicInformation character={character} />
            </Suspense>
            <section 
              className='flex flex-row'
            >
              <Initiative 
                  intuition={character?.intuition}
                  mental={character?.mental}
              />
              <Health
                  stat={character?.bashing}
                  groupName='bashingCounter'
                  groupTitle='Bashing'
              />
              <Health
                  stat={character?.lethal}
                  groupName='lethalCounter'
                  groupTitle='Lethal'
              />
              <div>
                <Title storedTitle='Fate Ledger'/>
                  <ClickableLabel
                      key={character?.experience.id} 
                      id={character?.experience.id} 
                      rank={character?.experience.rank}
                      name={character?.experience.name} 
                      groupName="experience" 
                  />
                  <ClickableLabel 
                    key={character?.karma.id}
                    id={character?.karma.id}
                    rank={character?.karma.rank}
                    name={character?.karma.name}
                    groupName="karma"
                  />
              </div>
            </section>
            <section
              className='flex flex-row'
            >
                <ClickableLabel 
                    key={character?.fight.id}
                    id={character?.fight.id}
                    name={character?.fight.name}
                    rank={character?.fight.rank}
                    groupName='fight'
                    character={character} 
                />
                <ClickableLabel
                    key={character?.strength.id}
                    name={character?.strength.name}
                    rank={character?.strength.rank}
                    character={character}
                    groupName='strength'
                /> 
                 <ClickableLabel
                    key={character?.agility.id}
                    name={character?.agility.name}
                    rank={character?.agility.rank}
                    groupName='agility'
                    character={character}
                />
                <ClickableLabel
                    key={character?.endurance.id}
                    name={character?.endurance.name}
                    rank={character?.endurance.rank}
                    groupName='endurance'
                    character={character}
                />

                <ClickableLabel
                    key={character?.reason.id}
                    name={character?.reason.name}
                    rank={character?.reason.rank}
                    groupName='reason'
                    character={character}
                />
                <ClickableLabel
                    key={character?.intuition.id}
                    name={character?.intuition.name}
                    rank={character?.intuition.rank}
                    groupName='intuition'
                    character={character}
                />
                <ClickableLabel
                    key={character?.psyche.id}
                    name={character?.psyche.name}
                    rank={character?.psyche.rank}
                    character={character}
                    groupName='psyche'
                />
                
            </section>
            <section
              className='flex flex-row'
            >
                <StatModal 
                    groupTitle={"Spell Book"} 
                    groupName={"spellbook"}
                    stat={character?.spellbook}
                />
                <StatModal 
                    groupTitle={"Powers"} 
                    groupName={"powers"}
                    stat={character?.powers}
                />
                 <StatModal 
                    groupTitle={"Backgrounds"} 
                    groupName={"backgrounds"}
                    stat={character?.backgrounds}
                />
                <StatModal 
                    groupTitle={"Inventory"} 
                    groupName={"inventory"}
                    stat={character?.inventory}
                />
                <StatModal 
                    groupTitle='Merits'
                    groupName='merits'
                    stat={character?.merits}
                />
                <StatModal
                    groupTitle='Flaws'
                    groupName='flaws'
                    stat={character?.flaws}
                />
                <StatModal
                    groupTitle='Talismans'
                    groupName='talismans'
                    stat={character?.talismans}
                />
                
            </section>
            <section
              className='flex flex-row'
            >
                <StatArray
                    groupTitle='Combat'
                    groupName='combat'
                    statArray={character?.combat}
                />
                <StatArray
                    groupTitle='Physical'
                    groupName='physical'
                    statArray={character?.physical}
                />
                <StatArray
                    groupTitle='Professional'
                    groupName='professional'
                    statArray={character?.professional}
                />
                <StatArray
                    groupTitle='Mental'
                    groupName='mental'
                    statArray={character?.mental}
                />   
            </section>        
      </section>
  )
}

