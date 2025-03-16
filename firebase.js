// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1JbIyH-JdsI6UoNlooLYojzuR8k1sjrs",
  authDomain: "growtopia-lite.firebaseapp.com",
  databaseURL: "https://growtopia-lite-default-rtdb.firebaseio.com",
  projectId: "growtopia-lite",
  storageBucket: "growtopia-lite.firebasestorage.app",
  messagingSenderId: "626819031630",
  appId: "1:626819031630:web:fbacefa82542c47297991f",
  measurementId: "G-7383GLZBSV"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
