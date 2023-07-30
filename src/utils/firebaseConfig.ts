import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBaMMaEJFfIFQPnwjsbZLdWtMUqLZFqQqE",
  authDomain: "pokemon-app-2023.firebaseapp.com",
  projectId: "pokemon-app-2023",
  storageBucket: "pokemon-app-2023.appspot.com",
  messagingSenderId: "378881429530",
  appId: "1:378881429530:web:e63a4a1643052a333f41a3",
  measurementId: "G-JBSYGEQE76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
