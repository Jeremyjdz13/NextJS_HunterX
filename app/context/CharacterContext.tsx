'use client'
import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { v4 as uuidv4 } from 'uuid'
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { characterTemplate } from './DefaultDataTemplates'
import { CharacterContextProps, CharacterData, StatData } from './CharacterTypes'
import firebase_app from '../firebaseconfig'
const CharacterContext = React.createContext<CharacterContextProps | undefined>(undefined)



export function useCharacter(): CharacterContextProps | undefined {
    return useContext(CharacterContext)
}

export function CharacterProvider({ children }: { children: ReactNode}) {
    const { currentUser, loading: loadingUser } = useAuth()
    const [characters, setCharacters] = useState<CharacterData[]>([])
    // const [selectedCharacterId, setSelectedCharacterId] = useState<string | undefined>()
    const [loading, setLoading] = useState(true)
    const db = getFirestore(firebase_app)
    // const selectedCharacter = characters?.find(character => character.id === selectedCharacterId)

   
    useEffect(() => {
        if(loadingUser){
            return; // still initializing, do nothing.
        }

        if(!currentUser){
            //no user signed in!
            setCharacters([]);
            setLoading(false)
            return;
        }
        // user is logged in.

        const charactersRef = collection(db, 'users', currentUser.uid, 'characters')
        // const createCharacters = collection(db, 'user', currentUser.uid)

        getDocs(charactersRef)
            .then((querySnapshot) => {
                const charactersData = querySnapshot.docs.map((doc) => doc.data() as CharacterData);
                console.log(charactersData, "charactersData")
                if(charactersData.length === 0){
                
                console.log(charactersData, "not found")
                setDoc(doc(charactersRef, characterTemplate.id), characterTemplate).then(() => {
                    console.log("Document successfully written!");
                    setCharacters([characterTemplate] as any);
                    console.log("Adding a character")
                })
                    .catch((error) => 
                        console.log('Failed to initialize default characters', error)
                    )
                } else {
                    setCharacters(charactersData)
                    console.log("Adding a character")
                }
                setLoading(false);        
            })
            .catch((error) => {
                console.error('Error retrieving characters:', error);
                setLoading(false);
            })

        
    }, [currentUser, loadingUser, db]);

    function handleCharacterSelect(id:string){
        // setSelectedCharacterId(id)
        // setSelectedCharacterIdEdit(undefined)
    }

    function handleSelectedStat(stat: StatData): void {
        // setShowModal(true)
        // setSelectedStat(stat)
        console.log(stat,"This was clicked")
    }

    const characterContextValue: CharacterContextProps = {
        characters,
        loading,
        // selectedCharacter,
        handleCharacterSelect,
        // handleSelectedStat
    }

    return (
        <CharacterContext.Provider value={characterContextValue}>
            {children}             
        </CharacterContext.Provider>
    )
}