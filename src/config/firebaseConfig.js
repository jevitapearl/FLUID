import { initializeApp } from 'firebase/app';
// Import the new auth functions
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import AsyncStorage
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your existing Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmI7y5GUsx4XdBOX6FLAwZmrZA7ZA8kfY",
  authDomain: "wellhub-app-ad0aa.firebaseapp.com",
  projectId: "wellhub-app-ad0aa",
  storageBucket: "wellhub-app-ad0aa.firebasestorage.app",
  messagingSenderId: "254851709077",
  appId: "4b90f8a9f42a01b12d439c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// NEW: Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore (no change needed here)
const db = getFirestore(app);

export { auth, db };

