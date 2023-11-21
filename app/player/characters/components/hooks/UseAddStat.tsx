"use client"
import { Character } from '@/app/context/CharacterTypes';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CharacterType {
  [key: string]: any;
}

interface AddStatOptions {
  property: string;
  defaultValues: any;
}

function useAddStat(character: CharacterType, editCharacter: (newCharacter: Character | CharacterType) => void) {
  const [newStatOptions, setNewStatOptions] = useState<AddStatOptions | null>(null);

  const addStat = () => {
    if (!newStatOptions) return;

    const { property, defaultValues } = newStatOptions;
    const uniqueId = uuidv4();
    const updatedStat = character[property].some((stat: any) => stat.id === uniqueId)
      ? character[property]
      : [
          ...character[property],
          {
            id: uuidv4(),
            ...defaultValues,
          },
        ];

    const newCharacter = { ...character, [property]: updatedStat };
    editCharacter(newCharacter);
  };

  const setStatOptions = (options: AddStatOptions) => {
    setNewStatOptions(options);
  };

  return { addStat, setStatOptions };
}

export default useAddStat;
