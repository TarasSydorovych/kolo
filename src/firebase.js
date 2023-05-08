
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {getAuth, listUsers} from 'firebase/auth'
import { OAuthProvider ,signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyAaSw3f5I0b1BObvieAGFU6yDga7MQM8eo",
  authDomain: "kolo-289d5.firebaseapp.com",
  projectId: "kolo-289d5",
  storageBucket: "kolo-289d5.appspot.com",
  messagingSenderId: "671344949461",
  appId: "1:671344949461:web:c76d4fd23ef9d897fe8a5c",
  measurementId: "G-CF5733XZ4F"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const googleAuthProvider = new GoogleAuthProvider();  
export const auth = getAuth(app);
const analytics = getAnalytics(app);
 
