'use client'
import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { 
  collection, 
  deleteDoc, 
  doc, 
  getDocs, 
  getFirestore, 
  onSnapshot, 
  query, 
  setDoc, 
  updateDoc, 
  where 
} from 'firebase/firestore'
import { characterTemplate } from './DefaultDataTemplates'
import { CharacterContextProps, Character, } from './CharacterTypes'
import firebase_app from '../firebaseconfig'

const CharacterContext = React.createContext<CharacterContextProps | undefined>(undefined)



export function useCharacter(): CharacterContextProps | undefined {
    return useContext(CharacterContext)
}

export function CharacterProvider({ children }: { children: ReactNode}) {
    const { currentUser, loading: loadingUser } = useAuth()
    const [characters, setCharacters] = useState<Character[]>([])
    const [character, setCharacter] = useState<Character | undefined>(undefined)

    const [loading, setLoading] = useState(true)
    const db = getFirestore(firebase_app)
    
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
                const charactersData = querySnapshot.docs.map((doc) => doc.data() as Character);
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

    useEffect(() => {

        if(loadingUser){
            return; // still initializing, do nothing.
        }

        if(!currentUser){
            //no user signed in!
            setLoading(false)
            return;
        }
        const collectionRef = collection(db, 'users', currentUser.uid, 'characters')

        const q = query(
          collectionRef,
          //  where('owner', '==', currentUserId),
          where('title', '==', 'School1') // does not need index
          //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
          // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
          // limit(1)
        );
    
        setLoading(true);
        // const unsub = onSnapshot(q, (querySnapshot) => {
        const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
          const items: any = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setCharacters(items);
          setLoading(false);
        });
        return () => {
          unsubscribe();
        };
    
        // eslint-disable-next-line
      }, []);
    
      async function addCharacter() {
        const collectionRef = currentUser ? collection(db, 'users', currentUser.uid, 'characters') : null;
        console.log("Add Character")
        const newCharacter = characterTemplate
    
        if(collectionRef) {
          try {
            const characterRef = doc(collectionRef, newCharacter.id);
            await setDoc(characterRef, newCharacter);
          } catch (error) {
            console.error(error);
          }
        }
      }

      async function deleteCharacter(character: Character) {

        
        const collectionRef = collection(db, 'users', currentUser?.uid || '', 'characters');

        try {
          const characterRef = doc(collectionRef, character.id);
          await deleteDoc(characterRef);
        } catch (error) {
          console.error(error);
        }
      }
    // EDIT FUNCTION
    async function editCharacter(character: Character) {
    const collectionRef = collection(db, 'users', currentUser?.uid || '', 'characters')
    const updatedCharacter = character

    try {
      const characterRef = doc(collectionRef, character.id);
      updateDoc(characterRef, updatedCharacter);
    } catch (error) {
      console.error(error);
    }
  }

    function setSelectedCharacter(id: string) {
        const selectedCharacter = characters.find(character => character.id === id)
        setCharacter(selectedCharacter)
    }

    const characterContextValue: CharacterContextProps = {
        characters,
        character,
        loading,
        addCharacter,
        deleteCharacter,
        editCharacter,
        setSelectedCharacter
    }

    return (
        <CharacterContext.Provider value={characterContextValue}>
            {!loading && children}             
        </CharacterContext.Provider>
    )
}