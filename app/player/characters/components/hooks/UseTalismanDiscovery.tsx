"use client"
import { Character, Talisman } from '@/app/context/CharacterTypes';
import { useEffect } from 'react'

type Props = {
    character: Character
    editCharacter: (character: Character) => void
}

export default function useTalismanDiscovery({character, editCharacter}: Props) {

    useEffect(() => {
        const talismansFromInventory: any = character.inventory.filter(item => item.isTalisman === true);
    
        const newTalismans = talismansFromInventory.filter((talisman: Talisman) => {
            const isTalismanPresent = character.talismans.find(
                (item: Talisman) => item.id === talisman.id
            );
            
            return !isTalismanPresent; 
        });
    
        const addStuntIdsToNewTalismans = newTalismans.map((talisman: Talisman) => {
            
            return {
                ...talisman,
                stuntIds: []
            };

        })

        const updatedTalismans = [...character.talismans, ...addStuntIdsToNewTalismans];
    
        const newCharacter = {
            ...character,
            talismans: updatedTalismans
        };
    
        editCharacter(newCharacter);
    }, [character.inventory]);

  return 
}
