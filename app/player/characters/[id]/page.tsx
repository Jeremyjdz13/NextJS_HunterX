'use client'
import React, { useEffect, useState } from 'react'
import { useCharacter } from '@/app/context/CharacterContext'
import { CharacterContextProps, CharacterData } from '@/app/context/CharacterTypes'
import Title from '../components/Stat/Title'
import ClickableLabel from '../components/Stat/ClickableLabel'
import Initiative from '../components/initiative/Initiative'
import Health from '../components/counters/Health'
import Stat from '../components/Stat/Stat'
import StatModal from '../components/modals/StatModal'

type Props = {
  params: { id: string }
}

function Character({ params }: Props) {
  const characterId = params.id
  const { characters } = useCharacter() as CharacterContextProps
  const character: CharacterData | undefined = characters?.find(character => character.id === characterId)
  const name = character?.name
  const alias = character?.alias
  const nature = character?.nature
  const combat = character?.combat
  const physical = character?.physical
  const professional = character?.professional
  const mental = character?.mental
  const backgrounds = character?.backgrounds
  const merits = character?.merits
  const flaws = character?.flaws
  const powers = character?.powers
  const spellbook = character?.spellbook
  const bashing = character?.bashing
  const lethal = character?.lethal
  const inventory = character?.inventory
  const experience = character?.experience
  const karma = character?.karma
  const intuition = character?.intuition
  const strength = character?.strength
  const endurance = character?.endurance
  const agility = character?.agility
  const psyche = character?.psyche
  const reason = character?.reason
  const fight = character?.fight
  const talismans = character?.talismans

  return (
      <section key={characterId} >
            <section
              className=''
            >
                <div> 
                    <Title storedTitle='Name'/>
                    <ClickableLabel
                        id={characterId} 
                        name={name!}
                        groupName='characterName'
                    />
                    <Title storedTitle='Alias'/>
                    <ClickableLabel
                        id={characterId} 
                        name={alias!}
                        groupName='characterAlias'
                        />
        
                    <Title storedTitle='Nature'/>
                    <ClickableLabel
                        id={characterId} 
                        name={nature!}
                        groupName='characterNature'
                    />
                </div>
                
            </section>
            <section>
                <Initiative 
                    intuition={intuition}
                    mental={mental}
                />
                <div>
                    <Health
                        stat={bashing!}
                        groupName='bashingCounter'
                        groupTitle='Bashing'
                    />
                </div>
                <div>
                    <Health
                        stat={lethal!}
                        groupName='lethalCounter'
                        groupTitle='Lethal'
                    />
                </div>
                <div> 
                    <Title storedTitle='Fate Ledger'/>
                    <Stat 
                        groupTitle=''
                        groupName='experience'
                        stat={experience!}
                    />
                    <Stat 
                        groupTitle=''
                        groupName='karma'
                        stat={karma!}
                    />
                </div>
            </section>
            <section>
                <Stat 
                    groupTitle=''
                    groupName='fight'
                    stat={fight!}
                />
                <Stat 
                    groupTitle=''
                    groupName='strength'
                    stat={strength!}
                /> 
                <Stat 
                    groupTitle=''
                    groupName='agility'
                    stat={agility!}
                />
                <Stat 
                    groupTitle=''
                    groupName='endurance'
                    stat={endurance!}
                />

                <Stat 
                    groupTitle=''
                    groupName='reason'
                    stat={reason!}
                />
                <Stat 
                    groupTitle=''
                    groupName='intuition'
                    stat={intuition!}
                />
                <Stat 
                    groupTitle=''
                    groupName='psyche'
                    stat={psyche!}
                />
                
            </section>
            <section>
                <StatModal 
                    groupTitle={"Spell Book"} 
                    groupName={"spellbook"}
                    stat={spellbook}
                />
                <StatModal 
                    groupTitle={"Powers"} 
                    groupName={"powers"}
                    stat={powers}
                />
                 <StatModal 
                    groupTitle={"Backgrounds"} 
                    groupName={"backgrounds"}
                    stat={backgrounds}
                />
                <StatModal 
                    groupTitle={"Inventory"} 
                    groupName={"inventory"}
                    stat={inventory}
                />
                <StatModal 
                    groupTitle='Merits'
                    groupName='merits'
                    stat={merits}
                />
                <StatModal
                    groupTitle='Flaws'
                    groupName='flaws'
                    stat={flaws}
                />
                <StatModal
                    groupTitle='Talismans'
                    groupName='talismans'
                    stat={talismans}
                />
                
            </section>
            <section>
                <Stat
                    groupTitle='Combat'
                    groupName='combat'
                    stat={combat}
                />
                <Stat
                    groupTitle='Physical'
                    groupName='physical'
                    stat={physical}
                />
                <Stat
                    groupTitle='Professional'
                    groupName='professional'
                    stat={professional}
                />
                <Stat
                    groupTitle='Mental'
                    groupName='mental'
                    stat={mental}
                />   
            </section>      
        </section>
  )
}

export default Character