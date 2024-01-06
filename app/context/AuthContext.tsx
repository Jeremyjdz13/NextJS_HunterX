"use client"
import React, { useContext, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth"
import firebase_app from '../firebaseconfig';
import * as Auth from 'firebase/auth'


interface AuthContextValue {
  currentUser: Auth.User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<Auth.UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<Auth.UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateDisplayName: (newDisplayName: string) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<Auth.User | null>(null);
  const [loading, setLoading] = useState(true);
    const auth = getAuth(firebase_app)

  async function signUp(email: string, password: string, displayName: string) {
    const userCredential = await Auth.createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    
    if(user) {
      await Auth.updateProfile(user, {
        displayName,
      });
    }

    return userCredential;
  }

  function signIn(email: string, password: string) {
    console.log("Signed In!!")
    console.log(Auth, "Auth")
    return Auth.signInWithEmailAndPassword(auth, email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return Auth.sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email: string) {
    if(currentUser){
       return Auth.updateEmail(currentUser, email);
    }
   throw new Error('User is not authenticated.')
  }

  function updatePassword(password: string) {
    if(currentUser){
     return Auth.updatePassword(currentUser, password); 
    }
    throw new Error('User is not authenticated.')
  }

  async function updateDisplayName(newDisplayName: string) {
    if(currentUser){
      await Auth.updateProfile(currentUser, {
        displayName: newDisplayName,
      });
    }
   
    await auth.currentUser?.reload();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

   
  console.log("AuthProvider Rendered")

  const value: AuthContextValue = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDisplayName,
  }

  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  );
}
