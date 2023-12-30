import React from 'react'
import Title from '../Stat/Title'
import { Character, Power, Talisman } from '@/app/context/CharacterTypes'

type Props = {
    character: Character
    ability: Power[] | Talisman[] 
}
export default function StuntDisplay({character, ability}: Props) {

  
  return (
    <div>
        <Title statGroupTitle={"Power Stunts"} />
        <div>
            <div 
                className="flex flex-row justify-center text-center  border-b border-black/80"
            >
                <div className="flex-1" >Title</div>
                <div className="flex-1">Attempts</div>
                <div className="flex-1">Description</div>
            </div>
        {

            
            (ability as (Power & { stuntIds: string[] })[] | Talisman[]).length > 0 ? (character.stunts
                .filter(stunt => ability.stuntIds.includes(stunt.id))
                .map(filteredStunt => (
                <div 
                        key={filteredStunt.id}
                        className="flex flex-row justify-center text-center "
                    >
                        <div className="flex-1" >{filteredStunt.name}</div>
                        <div className="flex-1">
                            { filteredStunt.isMastered === true ? 
                            "Mastered": 
                                filteredStunt.rank
                            }
                        </div>
                        <div className="flex-1">{filteredStunt.description}</div>
                </div>
                ))): (
                <div>No assigned stunts.</div>
            )
        }
        </div>
    </div>
  )
}
