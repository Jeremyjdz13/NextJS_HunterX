import { useCharacter } from '@/app/context/CharacterContext';
import { Character } from '@/app/context/CharacterTypes';
import { powerTemplate, skillTemplate, talismanTemplate } from '@/app/context/DefaultDataTemplates';
import React from 'react'

type Props = {
    character: Character,
    statKey: string,
    statGroupTitle: string

}
function AddRemoveStat({character, statKey, statGroupTitle}: Props) {
    const { editCharacter } = useCharacter()

    function addSkill() {
        const updatedSkills = character[statKey].some((skill: any) => skill.id === skillTemplate.id)
        ? character[statKey]
        : [
            ...character[statKey],
            {
                id: skillTemplate.id,
                name: skillTemplate.name,
                rank: skillTemplate.rank,
            },
        ];
        console.log("Adding Skills")
        const newCharacter = { ...character, [statKey]: updatedSkills };
    
        editCharacter(newCharacter)
    }
    function addPower() {
        const updatedPower = character[statKey].some((power: any) => power.id === powerTemplate.id)
        ? character[statKey]
        : [
            ...character[statKey],
            {
                id: powerTemplate.id,
                name: powerTemplate.name,
                rank: powerTemplate.rank,
                description: powerTemplate.description,
                stunt: powerTemplate.stunt
            }
        ]
        const newCharacter = { ...character, [statKey]: updatedPower };
        editCharacter(newCharacter)
 
    }
    function addTalismans() {
        const updatedTalisman = character[statKey].some((power: any) => power.id === talismanTemplate.id)
        ? character[statKey]
        : [
            ...character[statKey],
            {
                id: talismanTemplate.id,
                name: talismanTemplate.name,
                rank: talismanTemplate.rank,
                description: talismanTemplate.description,
                stunt: talismanTemplate.stunt
            }
        ]
        const newCharacter = { ...character, [statKey]: updatedTalisman };
        editCharacter(newCharacter)
 
    }
  return (
    <div>
        <div>Add new trait: {statGroupTitle}</div>
            <button 
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-1"
                onClick={() => {
                    if (["combat", "physical", "professional", "mental"].includes(statKey)) {
                        addSkill();
                    } else if (["powers"].includes(statKey)) {
                        addPower();
                    } else if (["talismans"].includes(statKey)) {
                        addTalismans();
                    }
                }}
                >Add</button>
    </div>
  )
}

export default AddRemoveStat