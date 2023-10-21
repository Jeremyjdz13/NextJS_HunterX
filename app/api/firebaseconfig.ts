import { FirebaseApp, initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

let app: FirebaseApp;
let db: ReturnType<typeof getDatabase>;
let auth: ReturnType<typeof getAuth>;

export function initFirebase(): FirebaseApp {
    if(!app){
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
      };
      console.log("Firebase Initialized")
      app = initializeApp(firebaseConfig);
      db = getDatabase(app)
      auth = getAuth(app)
    }

    return app;
      
}

export {db, auth, app}