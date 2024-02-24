import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA4LYw5E6QzF3W7PFy58wgVXvmshKGhNg4",
  authDomain: "sportapp-d031c.firebaseapp.com",
  databaseURL: "https://sportapp-d031c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sportapp-d031c",
  storageBucket: "sportapp-d031c.appspot.com",
  messagingSenderId: "811513059992",
  appId: "1:811513059992:web:86698d9ba53d650332ceed",
  measurementId: "G-B81K4FWBEQ"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
