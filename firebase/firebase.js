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

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getDatabase(FIREBASE_APP);

const getGameResultsKey = (team1, team2, countSets) => {
  return `${team1}_${team2}_set${countSets}`;
};

const getMatchKey = (team1, team2) => {
  return `${team1}_${team2}`;
};

export const saveGameResults = (team1, team2, results1, results2, countSets, ended = false, Win, Win2, pause1, pause2, pauseCount, pauseCount2) => {
  const matchKey = getMatchKey(team1, team2);
  const gameResultsRef = ref(FIREBASE_DB, `matches/${matchKey}/gameResults/${getGameResultsKey(team1, team2, countSets)}`);
  
  set(gameResultsRef, {
    team1: team1,
    team2: team2,
    results1: results1,
    results2: results2,
    set: countSets,
    ended: results1 >= 25 || results2 >= 25,
    win_team1: Win,
    win_team2: Win2,
    pause_team1: pause1,
    pause_team2: pause2,
    pauseCount_team1: pauseCount,
    pauseCount_team2: pauseCount2
  });
};

export const deletePreviousGameResults = (team1, team2, countSetsToDelete) => {
  const matchKey = getMatchKey(team1, team2);
  const matchesRef = ref(FIREBASE_DB, `matches/${matchKey}/gameResults`);

  // Loop through the previous game results and delete them
  for (let i = 2; i < countSetsToDelete; i++) {
      const gameResultsRef = ref(matchesRef, getGameResultsKey(team1, team2, i));
      remove(gameResultsRef)
          .then(() => {
              console.log(`Previous game result ${i} deleted successfully.`);
          })
          .catch((error) => {
              console.error(`Error deleting previous game result ${i}:`, error);
          });
  }
};