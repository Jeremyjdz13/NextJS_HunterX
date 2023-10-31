'use client'
import { useAuth } from "./AuthContext"
import { 
          doc, 
          getDoc, 
          setDoc, 
          getFirestore, 
          collection, 
          getDocs 
        } from 'firebase/firestore'
import { 
        useState, 
        useEffect, 
        useContext,
        ReactNode,
    } from 'react'
import firebase_app from "../firebaseconfig"
import React from "react"

type UserList = {
    id: string
    displayName: string
    email: string
    editor: boolean
    gameMaster: boolean
    player: boolean
}

interface UserData {
    id: string
    gameMaster: boolean
    editor: boolean
    player: boolean
    displayName: string | null
    email: string | null
    emailVerified: boolean
} 

interface UserContextProps {
    user: UserData | undefined
    userList: UserList[]
    loading: boolean
}
  
  interface UserListData {
    [key: string]: {
        id: string;
        data: any;
    }[];
  }[]

const UserContext = React.createContext<UserContextProps>({
    user: undefined,
    userList: [],
    loading: true
})


export function useUserData() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUserData must be used within an UserProvider")
    }
    return context
}

export function UserProvider({ children }: { children: ReactNode }) {

    const { currentUser, loading: loadingUser } = useAuth()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<UserData | undefined>()
    const [userList, setUserList] = useState<UserList[]>([])
    const db = getFirestore(firebase_app)

    useEffect(() => {
        if (loadingUser) {
          console.log(loadingUser, 'Still initializing, do nothing');
          return; // still initializing, do nothing.
        }
        if (!currentUser) {
            // no user signed in!
            console.log('No user signed in!');
            setUser(undefined);
            setLoading(false);
            return;
          }
        // user is logged in
        const profileDoc = doc(db, 'users', currentUser.uid)

        getDoc(profileDoc)
        .then((docSnapshot) => {
          if (!docSnapshot.exists()) {
            // didn't find a profile for this user
            console.log(docSnapshot, "not found")
            setDoc(profileDoc, {
              id: currentUser.uid,
              gameMaster: false,
              editor: false,
              player: true,
              displayName: currentUser.displayName,
              email: currentUser.email,
              emailVerified: currentUser.emailVerified,
            }).catch((error) =>
              console.log('Failed to initialize default profile', error)
            );
          } else {
            // Check to see currentUser.profile match displayName in database if not update attribute.
            const data = docSnapshot.data() as {
              id: string;
              gameMaster: boolean;
              editor: boolean;
              player: boolean;
              displayName: string | null;
              email: string | null;
              emailVerified: boolean;
            };
            const displayNameCheck = data.displayName === currentUser.displayName;
            const editor = data.editor;
            const gameMaster = data.gameMaster;
            const player = data.player
  
            if (!displayNameCheck) {
              setDoc(profileDoc, {
                id: currentUser.uid,
                gameMaster: gameMaster,
                editor: editor,
                player: player,
                displayName: currentUser.displayName,
                email: currentUser.email,
                emailVerified: currentUser.emailVerified,
              }).catch((error) =>
                console.log('Failed to update profile', error)
              );
            } else {
              console.log('Setting Profile');
              setUser(data);
              setLoading(false);
            }
          }
        })
        .catch((error) => console.log('Error getting profile document', error));
  
      return () => {}; // no cleanup needed for Firestore

  }, [currentUser, loadingUser, db]);


  useEffect(() => {
    if(!currentUser) return;

    const getUsers = async () => {
        const users: UserList[] = [];
        const querySnapshot = await getDocs(collection(db, "users"));
          
        querySnapshot.forEach((doc) => {
            const user = {id: doc.id, ...doc.data()} as UserList;
            users.push(user)
        })
        setUserList(users)

    }
    getUsers()

  }, [currentUser, db]);
  
  
  const value: UserContextProps = {
    user,
    userList,
    loading,
  };

  return <UserContext.Provider value={value}>
          {!loading && children}
        </UserContext.Provider>;
}