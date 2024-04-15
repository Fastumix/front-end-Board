import { initializeApp } from 'firebase/app';
import {initializeAuth,  getReactNativePersistence} from 'firebase/auth';
import { getDatabase, ref, push, set, remove} from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


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

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = initializeAuth(firebaseApp, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      });
const firebaseDB = getDatabase(firebaseApp);

export default firebaseAuth;