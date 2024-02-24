
import { initializeApp, credential as _credential, firestore, auth } from "firebase-admin";
import serviceAccount from "./credentials.json";


initializeApp({
  credential: _credential.cert(serviceAccount),
  databaseURL: "https://sportapp-d031c-default-rtdb.europe-west1.firebasedatabase.app", // Replace with your Firebase project URL
});

// Reference to the Firestore collection
const usersCollection = firestore().collection('users');

// Function to register a user
const registerUser = async (email, password, username) => {
  try {
    // Create a new user in Firebase Authentication
    const userRecord = await auth().createUser({
      email: email,
      password: password,
      displayName: username,
    });

    // Add additional user information to Firestore
    await usersCollection.doc(userRecord.uid).set({
      email: userRecord.email,
      username: userRecord.displayName,
    });

    console.log('User registered successfully:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export default registerUser;
