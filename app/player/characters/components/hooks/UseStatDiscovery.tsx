import { Character, StatData } from '@/app/context/CharacterTypes'
import { useState, useEffect } from 'react'

function useStatDiscovery(character: Character, statKey: string) {
    const [statValue, setStatValue] = useState<StatData | StatData[]>()

    useEffect(() => {

        function isValidStatKey(key: string): key is keyof Character {
            return key in character
        }

        if(isValidStatKey(statKey)) {
            const value = character[statKey]
            return setStatValue(value)
        }
        return undefined
        
    }, [character, statKey])


  return statValue
}

export default useStatDiscovery