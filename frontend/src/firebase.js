// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ07Bgn26I9q0k6GYSEOZY4uKWnBkOy3k",
  authDomain: "task62hd-d8a28.firebaseapp.com",
  projectId: "task62hd-d8a28",
  storageBucket: "task62hd-d8a28.appspot.com",
  messagingSenderId: "1089256256141",
  appId: "1:1089256256141:web:04a9354d9630f2b54e68c4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Storage

export { db, auth, storage }; // Export storage
