import React from 'react'
import Tabs from '../tabs/Tabs'
import { Character, Power, Talisman } from '@/app/context/CharacterTypes'
import CharacterStats from '../Stat/CharacterStats'
import StuntDisplay from '../modals/StuntDisplay'

type Props = {
    character: Character
    statKey: string
    ability: Power[] | Talisman[]
}
export default function PowersTalismans({ character, statKey, ability } : Props) {

    const isPowers = [
         'powers',
    ].includes(statKey)

    const isTalismans = [
        "talismans"
    ].includes(statKey)

    if(isPowers) {
        const tabs = [
            {
                label: 'Powers',
                content: <CharacterStats 
                        character={character} 
                        statKey={'powers'} 
                        statType={'Power'} 
                    />
            },
            ...ability.map((power: any) => ({
                label: power.name,
                content: <StuntDisplay character={character} ability={power} />
            })),
        {label: "Power Stunts",
            content: <CharacterStats character={character} statKey={'stunts'} statType="Stunt" />
            }
        ]

        return <Tabs tabs={tabs}/>
   } 

   if(isTalismans) {
        const tabs = [
            {
                label: 'Talismans',
                content: <CharacterStats 
                        character={character} 
                        statKey={'talismans'} 
                        statType={'Talisman'} 
                    />
            },
            ...character.talismans.map((talisman: any) => ({
                label: talisman.name,
                content: <StuntDisplay character={character} ability={talisman} />
            })),
        {label: "Power Stunts",
            content: <CharacterStats character={character} statKey={'stunts'} statType="Stunt" />
            }
        ]

        return <Tabs tabs={tabs}/>
   }
  return 
}
