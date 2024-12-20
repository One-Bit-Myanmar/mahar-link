// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZv_BxlJp8QNlFGKmBR7O255QIhBifcM8",
  authDomain: "maha-link.firebaseapp.com",
  projectId: "maha-link",
  storageBucket: "maha-link.appspot.com",
  messagingSenderId: "652608183604",
  appId: "1:652608183604:web:9d6cd25b581ef6d8ced961",
  measurementId: "G-B7NPKPMY7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Export auth and db
export { auth, db };
